import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

const SignUpFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          let data;
          try {
            data = await res.clone().json();
          } catch {
            data = await res.text();
          }

          if (data?.errors){
            setErrors(data.errors);
          } else if (data) {
            setErrors([data]);
          } else {
            setErrors([res.statusText]);
          }
        });
    }
    return setErrors(['Passwords do not match']);
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        Email
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value) } required/>
        <br />
        Username
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <br />
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        Confirm Password
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <br />
        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
}

export default SignUpFormPage;