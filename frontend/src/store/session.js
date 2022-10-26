import csrfFetch from './csrf.js'

const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';

export const addCurrentUser = (user) => {
  return ({
    type: ADD_USER,
    payload: user
  });
};

export const removeCurrentUser = () => {
  return ({
    type: REMOVE_USER,
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
      return { ...state, user: null}
    default:
      return state;
  }
}

export default sessionReducer;