import { applyMiddleware, compose, createStore } from 'redux'

import actions from './actions'
import effects from './effects'
import reducers from './reducers'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducers, composeEnhancer(
  applyMiddleware(effects)
))

export default store