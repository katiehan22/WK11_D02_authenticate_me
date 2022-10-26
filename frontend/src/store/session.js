import csrfFetch from './csrf.js'

const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';

export const addCurrentUser = (user) => {
  return ({
    type: ADD_USER,
    payload: user
  });
};

export const removeCurrentUser = (userId) => {
  return ({
    type: REMOVE_USER,
    userId
  });
};

export const login = (user) => async (dispatch) => {
  // debugger
  const { credential, password } = user;
  let res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    })
  });
  let data = await res.json();
  dispatch(addCurrentUser(data));
  return res;
}

const initialState = { user: null}

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, user: action.payload }
    case REMOVE_USER:
      let newState = { ...state };
      delete newState[action.userId];
      return newState;
    default:
      return state;
  }
}

export default sessionReducer;