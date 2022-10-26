import {Switch, Route} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import React from 'react';
import SignUpFormPage from './components/SignupFormPage';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignUpFormPage />
      </Route>
    </Switch>
  );
}

export default App;
