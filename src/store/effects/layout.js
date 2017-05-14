import _layout from 'justified-layout'
import { get } from 'lodash'
import actions from '../actions'

let layoutConfig

const justifiedLayout = (aspects) => _layout(aspects, layoutConfig)

export const layoutEffects = (store, action) => {
  const state = store.getState()
  switch (action.type) {

    case 'INIT':
      const { layout } = action.payload || {}
      layoutConfig = layout
      break
    
    case 'CHANGE_SCREEN_WIDTH':
      layoutConfig.containerWidth = action.payload
      break
    
    case 'RECEIVE_COLLECTION':
      const collection = action.payload
      store.dispatch(actions.getLayout(collection))
      break;

    case 'GET_LAYOUT':
      const entries = action.payload
      const aspects = entries.map(entry => get(entry, 'media_info.metadata.dimensions'))
      setTimeout(() => {
        store.dispatch(actions.layouted(entries, justifiedLayout(aspects)))
      })
      break;
  }
}

export default layoutEffects
