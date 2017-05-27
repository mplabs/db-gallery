export const fetchCollection = (path) => ({
  type: 'FETCH_COLLECTION',
  payload: path
})

export const receiveCollection = (entries) => ({
  type: 'RECEIVE_COLLECTION',
  payload: entries
})

export const fetchThumbnail = (entry) => ({
  type: 'FETCH_THUMBNAIL',
  payload: entry
})

export const receiveThumbnail = (thumbnail) => ({
  type: 'RECEIVE_THUMBNAIL',
  payload: thumbnail
})
