class Collection {

  constructor({ id, name, path_lower }) {
    this.data = { id, name, path_lower, entries: [] }
  }

  add(entries) {

    if (!entries) {
      return;
    }

    entries = [].concat(entries)

    entries.forEach(entry => {
      const index = this.data.entries.findIndex(e => e.id === entry.id)
      if (index > -1) {
        this.data.entries = [
          ...entries.slice(0, index),
          entry,
          ...entries.slice(index + 1, this.data.entries.length)
        ]
      } else {
        this.data.entries = [...entries, entry]
      }
    })
  }

  ammend(metadata) {
    this.data = Object.assign({}, this.data, metadata)
  }
}

/**
  .tag(pin): "folder"
  name(pin): "test-collection"
  path_lower(pin): "/tmp/iswi-photos/test-collection"
  path_display(pin): "/tmp/iswi-photos/test-collection"
  id(pin): "id:SsEKy7_fZ4gAAAAAABoBkw"
*/

export const collections = (state = [], action) => {
  switch (action.type) {

    case 'RECEIVE_COLLECTIONS': {
      return action.payload.map(
        collection => new Collection(collection)
      )
    }

    case 'RECEIVE_COLLECTION': {
      return {
        entries: action.payload
      }
    }

    case 'RECEIVE_COLLECTION_METADATA': {
      const metadata = action.payload
      const index = state.findIndex(c => c.id === metadata.id)
      if (index > -1) {
        state[index].ammend(metadata)
      }
    }
    
    case 'RECEIVE_THUMBNAIL':
      const entry = action.payload
      let { entries } = state
      entries = entries.map(e => {
        if (e.id === entry.id) {
          return Object.assign({}, e, entry)
        } else {
          return e
        }
      })
      return Object.assign({}, state, { entries })

    case 'LAYOUTED':
      return Object.assign({}, state, {
        entries: action.payload
      })

    default:
      return state
  }
}
