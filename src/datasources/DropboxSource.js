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
  didInvalidate = false
  entries = []

  get needToFetch() {
    return ( !this.isFetching || this.didInvalidate )
  }

  constructor({accessToken, clientId = null, basePath = ''}) {
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
    return this.dbx.filesListFolder({ path: this.pwd })
      .then(response => {
        this.entries = response.entries
        this.isFetching = false
        this.didInvalidate = false
        return response.entries
      })
  }

  listFolders({order = 'ASC'}) {
    return this.fetch()
      .then(filterByTag('.tag', 'folder'))
      .then(sortBy('name', order))
  }

  listFiles({order = 'ASC', filter}) {
    if ('function' !== typeof filter) {
      filter = entry => entry
    }
    return this.fetch()
      .then(filterBy('.tag', 'file'))
      .then(entries => entries.filter(filter))
      .then(sortBy(order))
  }
}

export default DropboxSource
