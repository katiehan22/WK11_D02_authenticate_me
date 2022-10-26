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

export const storeCurrentUser = (user) => {
  if (user){
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    sessionStorage.removeItem("currentUser");
  }
}

export const storeCSRFToken = (res) => {
  const token = res.headers.get('X-CSRF-Token');
  if (token) sessionStorage.setItem('X-CSRF-Token', token);
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
  storeCurrentUser(data.user);
  dispatch(addCurrentUser(data.user));
  return res;
}

export const restoreSession = () => async (dispatch) => {
  const res = await csrfFetch('/api/session');
  storeCSRFToken(res);
  const data = await res.json();
  storeCurrentUser(data.user);
  dispatch(addCurrentUser(data.user));
  return res;
}

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const res = await csrfFetch ('/api/users', {
    method: "POST",
    body: JSON.stringify({
      username,
      email, 
      password
    })
  });

  const data = await res.json();
  storeCurrentUser(data.user);
  dispatch(addCurrentUser(data.user));
  return res;
}

const initialState = { user: JSON.parse(sessionStorage.getItem("currentUser")) };
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