import DropboxSource from '../../datasources/DropboxSource'
import actions from '../actions'

let dropboxSource = null

export const dropboxEffects = (store, action) => {
  const state = store.getState()
  switch (action.type) {

    case 'INIT':
      const { accessToken, basePath } = action.payload
      dropboxSource = new DropboxSource({ accessToken, basePath })
      store.dispatch(actions.fetchCollections())
      break

    case 'FETCH_COLLECTIONS':
      dropboxSource.fetchCollectionsIfNeeded()
        .then(collections =>
          store.dispatch(actions.receiveCollections(collections))
        )
      break
    
    case 'FETCH_COLLECTION':
      const path = action.payload
      dropboxSource.fetchCollectionIfNeeded(path)
        .then(collections => {
          console.log(collections)
          return collections
        })
        .then(collections =>
          store.dispatch(actions.receiveCollections(collections))
        )
      break
  }
}

export default dropboxEffects
