import { h, render } from 'preact'
import { Provider } from 'preact-redux'
import store from './store'
import actions from './store/actions'
import App from './components/App'

// Remove cloak
document.body.classList.remove('invisible')

// Initialize the app
store.dispatch(actions.init({
  accessToken: 'V1kon74BjHQAAAAAAALj6Dr22ph-qzaNcjX_9hRy-5NT30tLA-jwfxEUKBB1gTE_',
  basePath: '/Pictures/Cloud Sync'
}))

render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.body
)