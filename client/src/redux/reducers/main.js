const LOADING_START = 'LOADING_START';
const LOADING_STOP = 'LOADING_STOP';
const SHOW_MESSAGE = 'SHOW_MESSAGE';
const HIDE_MESSAGE = 'HIDE_MESSAGE';

const initialState = {
  isLoading: false,
  popup: {
    showMessage: false,
    messageText: '',
    type: 'danger'
  }
};

const main = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return {...state, isLoading: true};

    case LOADING_STOP:
      return {...state, isLoading: false};

    case SHOW_MESSAGE:
      const {type, message} = action.payload;

      return {
        ...state,
        popup: {
          showMessage: true,
          messageText: message,
          type: type || state.popup.type
        }
      };

    case HIDE_MESSAGE:
      return {
        ...state,
        popup: {
          ...state.popup,
          showMessage: false
        }
      };

    default:
      return state;
  }
}

export const startLoading = () =>
  ({type: LOADING_START})

export const stopLoading = () =>
  ({type: LOADING_STOP})

export const showMessage = (message, type) =>
  ({type: SHOW_MESSAGE, payload: {message, type}})

export const hideMessage = () =>
  ({type: HIDE_MESSAGE})

export default main;