export const fetchCollections = (path) => ({
  type: 'FETCH_COLLECTIONS',
  payload: path
})

export const receiveCollections = (entries) => ({
  type: 'RECEIVE_COLLECTIONS',
  payload: entries
})

export const fetchCollection = (path) => ({
  type: 'FETCH_COLLECTION',
  payload: path
})

export const receiveCollection = (entries) => ({
  type: 'RECEIVE_COLLECTION',
  payload: entries
})

export const receiveCollectionMetadata = (metadata) => ({
  type: 'RECEIVE_COLLECTION_METADATA',
  payload: metadata
})

export const fetchThumbnail = (entry) => ({
  type: 'FETCH_THUMBNAIL',
  payload: entry
})

export const receiveThumbnail = (thumbnail) => ({
  type: 'RECEIVE_THUMBNAIL',
  payload: thumbnail
})

export const addFiles = (files) => ({
  type: 'ADD_FILES',
  payload: files
})

export const filesUploadComplete = () => ({
  type: 'FILES_UPLOAD_COMPLETE'
})

export const filesUploadFailed = (error) => ({
  type: 'FILES_UPLOAD_FAILED',
  payload: error
})

export const uploadProgress = ({id, progress}) => ({
  type: 'UPLOAD_PROGRESS',
  payload: { id, progress }
})
