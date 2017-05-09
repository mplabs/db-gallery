import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { bindActions } from '../util'
import { get } from 'lodash'
import actions from '../store/actions'
import store from '../store'

@connect(store => store, bindActions(actions))
export default class FileUpload extends Component {

  handleChange(evt) {
    const files = get(evt, 'target.files', [])
    for (let i = 0; i < files.length; i++) {
      let file = files.item(i)
      store.dispatch(actions.addFile(file))
    }
  }

  render() {
    return (
      <div class="file-upload">
        <input
          type="file"
          onChange={this.handleChange.bind(this)}
          accept="image/*"
          multiple />
      </div>
    )
  }
}
