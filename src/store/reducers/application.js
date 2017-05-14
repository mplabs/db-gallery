export const application = (state = {}, action) => {
  switch (action.type) {

    case 'INIT': {
      const { basePath } = action.payload
      return {
        basePath
      }
    }

    default:
      return state
  }
}