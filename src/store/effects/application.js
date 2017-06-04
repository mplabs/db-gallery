import actions from '../actions'

export const applicationEffects = (store, action) => {
  const state = store.getState()

  switch(action.type) {

    case 'INIT': {
      const { pageTitle } = action.payload
      store.dispatch(actions.setPageTitle(pageTitle))
      break
    }

    default:
      // Do nothing
      break

  }
}

export default applicationEffects
