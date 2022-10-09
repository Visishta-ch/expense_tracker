import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Signup from './Layouts/SignUp'
import Login from './Layouts/Login'
import Home from './Components/pages/Home'
import CompleteProfile from './Components/pages/CompleteProfile'
import './App.css';

function App() {
  return (
    <>
    {/* <Signup /> */}
     <Switch>
      <Route path="/" exact>
        <Signup />
      </Route>
      
      <Route path='/Login'>
        <Login/>
      </Route>
      <Route path='/Home'>
        <Home/>
      </Route>
      <Route path='/CompleteProfile'>
          <CompleteProfile/>
      </Route>
     </Switch>
    </>
  );
}

export default App;
