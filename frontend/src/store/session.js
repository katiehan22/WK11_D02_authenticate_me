import {csrfFetch} from './csrf.js'

const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';

export const addCurrentUser = (user) => {
  return ({
    type: ADD_USER,
    user
  });
};

export const removeCurrentUser = (userId) => {
  return ({
    type: REMOVE_USER,
    userId
  });
};

export const login = (user) => async dispatch => {
  let res = await csrfFetch('/api/session', {
    method: 'POST',
    body: {
      credential: user.credential,
      password: user.password
    }
  });

  let data = await res.json();
  dispatch(addCurrentUser(data));
}

const sessionReducer = () => {

}

export default sessionReducer;