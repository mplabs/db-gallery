import DropboxSource from '../../datasources/DropboxSource'
import actions from '../actions'

let dropboxSource = null

export const dropboxEffects = (store, action) => {
  const state = store.getState()
  switch (action.type) {

    case 'INIT': {
      const { accessToken, clientId, basePath } = action.payload
      dropboxSource = new DropboxSource({ accessToken, clientId, basePath })
      break
    }

    case 'CREATE_COLLECTION': {
      const name = action.payload

      dropboxSource.createFolder(name)
        .then(entry => store.dispatch(action.receiveCollection(entry)))
      break
    }

    case 'FETCH_COLLECTIONS': {
      const path = action.payload
      dropboxSource.cd(path)

      dropboxSource.listFolders()
        .then(entries => store.dispatch(actions.receiveCollections(entries)))
      break
    }

    case 'FETCH_COLLECTION': {
      const path = action.payload
      dropboxSource.cd(path)
      
      dropboxSource.listFiles()
        .then(entries => entries.filter(e => e.name.match(/\.jpg$/)))
        .then(entries => store.dispatch(actions.receiveCollection(entries)))
      break
    }
    
    case 'RECEIVE_COLLECTION': {
      const entries = action.payload
      Promise.all(entries.map(entry =>
        store.dispatch(actions.fetchThumbnail(entry))
      ))
      break
    }
    
    case 'FETCH_THUMBNAIL': {
      const entry = action.payload
      dropboxSource.fetchThumbnail(entry)
        .then(thumbnail => store.dispatch(actions.receiveThumbnail(thumbnail)))
      break
    }

    case 'ADD_FILES': {
      const files = action.payload
      dropboxSource.filesUpload(files)
        .then(() => store.dispatch(actions.filesUploadComplete()))
        .catch(error => store.dispatch(action.filesUploadFailed()))
      break
    }

    default:
      // Do nothing
      break
  }
}

export default dropboxEffects
