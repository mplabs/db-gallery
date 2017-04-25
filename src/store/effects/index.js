import dropboxEffects from './dropbox'
import keybardEffects from './keyboard'

export default store => {
  keybardEffects(store)

  return next => action => {
    next(action)
    dropboxEffects(store, action)
  }
}