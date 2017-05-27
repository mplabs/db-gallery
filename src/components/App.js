import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { bindActions } from '../util'
import actions from '../store/actions'

import Router from 'preact-router'
import CollectionNavigation from './CollectionNavigation'
import Home from './Home'
import Collection from './Collection'
import FileUpload from './FileUpload'

@connect(store => store, bindActions(actions))
export default class App extends Component {

  componentDidMount() {
    
  }

  render({ collections }) {
    return (
      <div id="app" class="row">
        {/*<CollectionNavigation />
        <Router>
          <Home path="/" />
          <Collection path="/collection/:path" />
        </Router>*/}
        {/*<Collection path="/pictures/cloud sync/amsterdam" />*/}
        <FileUpload />
      </div>
    )
  }
}