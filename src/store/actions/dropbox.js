export const fetchCollection = (path) => ({
  type: 'FETCH_COLLECTION',
  payload: path
})

export const receiveCollection = (entries) => ({
  type: 'RECEIVE_COLLECTION',
  payload: entries
})
