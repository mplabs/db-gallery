import { combineReducers } from 'redux'

import * as application from './application'
import * as collections from './collections'

export default combineReducers(
  Object.assign({}, application, collections)
)
