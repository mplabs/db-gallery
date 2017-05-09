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

  getStyle(entry) {
    if (entry.layout) {
      const { top, left, width, height } = entry.layout
      return `top:${top}px;left:${left}px;width:${width}px;height:${height}px`
    }
  }

  render({path, collection}) {
    let { entries } = collection || []
    return (
      <div className="collection">
        <h2>Collection { path }</h2>
        <ul>
          { entries && entries.map(entry => (
            <li className={typeof entry.imageUrl !== 'undefined' ? 'loaded' : ''}>
              <img
                style={this.getStyle(entry)}
                src={entry.imageUrl}
                title={entry.name} alt={entry.name} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
