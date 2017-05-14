import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { bindActions } from '../util'
import { get } from 'lodash'
import actions from '../store/actions'
import store from '../store'

@connect(store => store, bindActions(actions))
export default class FileUpload extends Component {

  files = []

  handleChange(evt) {
    const fileList = get(evt, 'target.files', [])
    let files = []
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList.item(i))
    }
    store.dispatch(actions.addFiles(files))
  }

  dragEnter(evt) {
    evt.stopPropagation()
    evt.preventDefault()

    this.setState({ isDragging: true })
  }

  dragOver(evt) {
    evt.stopPropagation()
    evt.preventDefault()
  }

  dragLeave(evt) {
    evt.stopPropagation()
    evt.preventDefault()

    this.setState({ isDragging: false })
  }

  drop(evt) {
    evt.stopPropagation()
    evt.preventDefault()
    
    this.setState({ isDragging: false })

    const fileList = get(evt, 'dataTransfer.files', [])
    let files = []
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList.item(i))
    }
    store.dispatch(actions.addFiles(files))
  }

  render({ isDragging }) {
    return (
      <div class="file-upload">
        <form
          action="javascript:void(0)"
          className={this.state.isDragging ? 'dragging': ''}
          onDragEnter={this.dragEnter.bind(this)}
          onDragOver={this.dragOver.bind(this)}
          onDragLeave={this.dragLeave.bind(this)}
          onDrop={this.drop.bind(this)}>
          <label htmlFor="file">{!this.state.isDragging
            ? 'Click here or drag files to start upload'
            : 'Drop files to start upload'
          }</label>
          <input
            id="file"
            type="file"
            onChange={this.handleChange.bind(this)}
            accept="image/*"
            multiple />
        </form>
        <ul>
          {this.files && this.files.map(file => (
            <li>
              <img src={file} alt=""/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
