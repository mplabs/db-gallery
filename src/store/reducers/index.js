import { combineReducers } from 'redux'

import * as collections from './collections'

export default combineReducers(
  Object.assign({}, collections)
)