import { combineReducers } from 'redux'

import * as application from './application'
import * as collection from './collection'

export default combineReducers(
  Object.assign({}, application, collection)
)
