export const collection = (state = {}, action) => {
  switch (action.type) {

    case 'RECEIVE_COLLECTION':
      return new Collection(action.payload)
  }
}
