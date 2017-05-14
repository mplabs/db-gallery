import dropbox from 'dropbox'
import { sortBy as _sortBy } from 'lodash'
import { join } from 'path'

const filterBy = (key, value) => entries =>
  entries.filter(entry => entry[key] === value)

const sortBy = (key, dir = 'ASC') => entries => {
  const ordered = _sortBy(entries, key)

  if (dir !== 'ASC') {
    ordered.reverse()
  }
  return ordered
}

export class DropboxSource {

  isFetching = false
  isPushing = false
  didInvalidate = false
  entries = []

  get needToFetch() {
    return ( !this.isFetching || this.didInvalidate )
  }

  constructor({ accessToken, clientId = null, basePath = '' }) {
    if (!accessToken || 'string' !== typeof accessToken) {
      throw new Error('Expected `accessToken` to be string.')
    }

    this.dbx = new dropbox({ accessToken, clientId })
    this.cd(basePath)
  }

  cd(newPath) {
    this.pwd = (newPath.match(/^\/|^$/))
      ? newPath : join(this.pwd, newPath)
    this.didInvalidate = true
    this.entries = []
  }

  fetch(force = false) {
    if (force) {
      this.didInvalidate = true
    }

    if (!this.needToFetch) {
      return Promise.resolve(this.entries)
    }

    this.isFetching = true
    return this.dbx.filesListFolder({
        path: this.pwd,
        include_media_info: true
      })
      .then(response => {
        this.entries = response.entries
        this.isFetching = false
        this.didInvalidate = false
        return response.entries
      })
  }

  filesUpload(files) {
    this.isPushing = true
    return Promise.all(files.map(file => this.dbx.filesUploadSessionStart({
      contents: file,
      close: true
    }))).then(results => {
      const entries = results.map((result, idx) => ({
        cursor: { session_id: result.session_id, offset: files[idx].size },
        commit: { path: join(this.pwd, files[idx].name) }
      }))
      return this.dbx.filesUploadSessionFinishBatch({ entries })
    }).then(entries => {
      this.didInvalidate = true;
    })
  }

  push(file) {
    this.isPushing = true

    return this.dbx.filesUpload({
      contents: file,
      path: join(this.pwd, file.name),
      autorename: true,
      client_modified: file.modified
    }).then(entry => {
        this.entries = [...this.entries, entry]
        this.isPushing = false
        return this.entries
      })
  }

  fetchThumbnail(entry) {
    if (entry.thumbnail) {
      return Promise.resolve(entry.thumbnail)
    }

    return this.dbx.filesGetThumbnail({
        path: entry.path_lower,
        format: { ".tag": "jpeg" },
        size: { ".tag": "w640h480" }
      })
      .then(response => {
        const urlCreator = window.URL || window.webkitURL
        return Object.assign(response, {
          imageUrl: urlCreator.createObjectURL(response.fileBlob)
        })
      })
  }

  listFolders() {
    return this.fetch()
      .then(filterBy('.tag', 'folder'))
  }

  listFiles() {
    return this.fetch()
      .then(filterBy('.tag', 'file'))
      .then(sortBy('name', 'ASC'))
  }

  readCustomMetadata() {
    return this.dbx.filesDownload({
      path: join(this.pwd, '.metadata.yml')
    }).then(results => {
      console.log(results)
      return results
    }).catch(error => {
      console.error(error)
      return
    })
  }
}

export default DropboxSource
