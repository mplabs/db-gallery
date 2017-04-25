import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { bindActions } from '../util'
import actions from '../store/actions'


@connect(store => store, bindActions(actions))
export default class CollectionNavigation extends Component {
  render({ collections }) {
    return (
      <div id="collections" class="medium-3 large-2 medium-pdivl-9 large-pull-10 columns">
        <ul className="vertical menu collections-nav">
          { collections.map(collection => 
            <li>
              <a href={`/collection/${collection.path_lower}`}>{ collection.name }</a>
            </li>
          )}
        </ul>
      </div>
    )
  }
}