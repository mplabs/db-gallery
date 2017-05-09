import dropbox from 'dropbox'
import { sortBy as _sortBy } from 'lodash'
import { join } from 'path'

class Collection {

  constructor(collection) {
    this.id = collection.id
    this.name = collection.name
    this.path_lower = collection.path_lower.replace(/.*\/([^/]+)$/, '$1')
    this.path_display = collection.path_display.replace(/.*\/([^/]+)$/, '$1')
    this.entries = collection.entries || []
  }

  needToFetch() {
    return (this.entries !== null)
  }
}

const filterBy = (key, value) => entries =>
  entries.filter(entry => entry[key] === value)

const sortBy = (key, dir = 'ASC') => entries => {
  let ordered = _sortBy(entries, key)

  if (dir !== 'ASC') {
    ordered.reverse()
  }
  return ordered
}

export class DropboxSource {

  constructor(config = { accessToken: null, basePath: '' }) {
    let { accessToken, basePath } = config
    if (!accessToken || 'string' !== typeof accessToken) {
      throw new Error('Expected `accessToken` to be string.')
    }

    this.accessToken = accessToken
    this.basePath = basePath

    this.state = {
      collections: [],
      isFetching: false,
      didInvalidate: false
    }

    this.dbx = new dropbox({ accessToken })
  }

  findById(id) {
    return this.state.collections.find(c => c.id === id)
  }

  findByPath(path) {
    return this.state.collections.find(c => c.path_lower === path)
  }

  needToFetchCollections() {
    return (
      !this.state.isFetching ||
      this.state.didInvalidate ||
      (this.state.collection.length <= 0)
    )
  }

  fetchCollections() {
    return this.dbx.filesListFolder({ path: this.basePath })
      .then(response => response.entries)
      .then(filterBy('.tag', 'folder'))
      .then(sortBy('name', 'ASC'))
  }

  fetchCollectionsIfNeeded() {
    if (this.needToFetchCollections()) {
      return this.fetchCollections()
        .then(collections => {
          this.state.collections = collections.map(collection => new Collection(collection))
          return this.state.collections
        })
    }

    return Promise.resolve(this.state.collections)
  }

  needToFetchCollection(path) {
    const index = this.state.collections.findIndex(c => c.path_lower === path)

    return (index === -1 || !this.state.collections[index].entries)
  }

  fetchCollection(path) {
    return this.dbx.filesListFolder({ path: join(this.basePath, path) })
      .then(response => response.entries)
      .then(filterBy('.tag', 'file'))
      .then(sortBy('name', 'ASC'))
  }

  fetchCollectionIfNeeded(path) {
    if (this.needToFetchCollection(path)) {
      return this.fetchCollection(path)
        .then(collection => {
          const index = this.state.collections
            .findIndex(c => c.id === collection.id)

          if (index > -1) {
            this.state.collections = [
              this.state.collections.slice(0, index),
              new Collection(collection),
              this.state.collections.slice(index + 1)
            ]
          } else {
            this.state.collections = [
              ...this.state.collections,
              new Collection(collection)
            ]
          }

          return collection
        })
    }

    return Promise.resolve(this.findByPath(path))
  }
}

export default DropboxSource