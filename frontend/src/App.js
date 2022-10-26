import {Switch, Route} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import React from 'react';
import SignUpFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignUpFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
