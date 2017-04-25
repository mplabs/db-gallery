export const fetchCollections = () => ({
  type: 'FETCH_COLLECTIONS'
})

export const receiveCollections = collections => ({
  type: 'RECEIVE_COLLECTIONS',
  payload: collections
})

export const fetchCollection = (path) => ({
  type: 'FETCH_COLLECTION',
  payload: path
})
