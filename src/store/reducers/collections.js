import { get } from 'lodash'

export const collections = (state = [], action) => {
  switch (action.type) {
    
    case 'INIT':
      return get(action.payload, 'collections', [])

    case 'RECEIVE_COLLECTIONS':
      return [...action.payload]

    default:
      return state
  }
}