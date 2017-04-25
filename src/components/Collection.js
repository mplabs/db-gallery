import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { bindActions } from '../util'
import actions from '../store/actions'
import store from '../store'

@connect(store => store, bindActions(actions))
export default class Collection extends Component {
  
  componentDidMount() {
    store.dispatch(actions.fetchCollection(this.props.path))
  }

  render({path}) {
    return (
      <h2>Collection { path }</h2>
    )
  }
}
