import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { bindActions } from '../util'
import store from '../store'
import actions from '../store/actions'
import moment from 'moment'

const format = (date, format) => moment(date).format(format)

@connect(state => state, bindActions(actions))
export default class ListView extends Component {
  
  componentDidMount() {
    const { basePath } = this.props.application
    store.dispatch(actions.fetchCollections(basePath))
  }

  render({ collections }) {
    return (
      <div class="list-viewlist-group">
        {collections && collections.map(collection => (
          <button type="button" className="list-group-item">
            { collection.name }
          </button>
        ))}
      </div>
    )
  }
}
