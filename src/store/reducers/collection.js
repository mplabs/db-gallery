export const collection = (state = {}, action) => {
  switch (action.type) {

    case 'RECEIVE_COLLECTION':
      return {
        entries: action.payload
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
      return Object.assign({}, state, {
        entries
      })

    case 'LAYOUTED':
      return Object.assign({}, state, {
        entries: action.payload
      })

    default:
      return state
  }
}
