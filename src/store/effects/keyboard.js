import actions from '../actions'

const gotoGridView = store => () => {
  const state = store.getState()

  store.dispatch(actions.updateView('grid'))
}

export default keyhandler => store => {
  keyhandler('g', gotoGridView(store))
}