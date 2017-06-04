import applicationEffects from './application'
import dropboxEffects from './dropbox'
import keyboardEffects from './keyboard'
import layoutEffects from './layout'

export default store => {
  keyboardEffects(store)

  return next => action => {
    next(action)
    applicationEffects(store, action)
    dropboxEffects(store, action)
    layoutEffects(store, action)
  }
}