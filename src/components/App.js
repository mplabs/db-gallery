import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { bindActions } from '../util'
import actions from '../store/actions'

import Router from 'preact-router'
import CollectionNavigation from './CollectionNavigation'
import ListView from './ListView'
import Collection from './Collection'
import FileUpload from './FileUpload'
import Modal from './Modal'

@connect(store => store, bindActions(actions))
export default class App extends Component {

  componentDidMount() {
    
  }

  render({ collections }) {
    return (
      <div id="app" class="container-fluid">
        <div className="page-header">
          <h1>ISWI 2017 Photographers Dropoff</h1>
        </div>
        <Modal />
        <Router>
          <ListView path="/" />
          <Collection path="/collection/:path" />
        </Router>
        {/*<FileUpload />*/}
      </div>
    )
  }
}