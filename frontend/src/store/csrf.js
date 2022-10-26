// export const restoreCSRF = async () => {
//   const res = await csrfFetch('/api/session');
//   storeCSRFToken(res);
//   // let data = await res.json();
//   // sessionStorage.setItem('currentUser', JSON.stringify(data.user));
//   return res;
// };

// Moved to src > store > session.js
// export const storeCSRFToken = (res) => {
//   const token = res.headers.get('X-CSRF-Token');
//   if(token) sessionStorage.setItem('X-CSRF-Token', token);
// };

const csrfFetch = async (url, options = {}) => {
  // debugger
  options.method ||= 'GET';
  options.headers ||= {};

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    options.headers['X-CSRF-Token'] = sessionStorage.getItem("X-CSRF-Token");
  };

  const res = await fetch(url, options);
  // debugger
  if (res.ok) {
    return res;
  } else {
    throw res;
  };
};

export default csrfFetch;