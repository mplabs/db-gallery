import { combineReducers } from 'redux'

import * as collection from './collection'

export default combineReducers(
  Object.assign({}, collection)
)