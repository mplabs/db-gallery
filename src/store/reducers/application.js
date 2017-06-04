export const application = (state = {}, action) => {
  switch (action.type) {

    case 'INIT': {
      const { basePath } = action.payload
      return { basePath }
    }

    case 'SET_PAGE_TITLE': {
      const nextTitle = action.payload || ''
      if (nextTitle !== document.title) {
        document.title = nextTitle
      }
    }

    default:
      return state
  }
}