import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route,} from 'react-router-dom';
import Signup from './Layouts/SignUp';
import Login from './Layouts/Login';

import CompleteProfile from './Components/pages/CompleteProfile';
import GetFPLink from './Layouts/GetFPLink';
import Header from './Layouts/Header';

import DailyExpenses from './Expenses/DailyExpenses';
import './App.css';

function App() {
  const token = localStorage.getItem('tokenID');
  console.log(token);
  const mail = localStorage.getItem('userMail');
  console.log(mail);

  return (
    <>
  
      <Switch>
        {!mail && (
          <Route path="/" exact>
            <Signup />
          </Route>
        )}

        {mail && (
          <Route path="/" exact>
            <Header />
          </Route>
        )}

        <Route path="/Login">
          <Login />
        </Route>

        <Route path="/Header">
          <Header />
        </Route>

        <Route path="/Home">
          <Header />
        </Route>

        <Route path="/CompleteProfile" >
          <CompleteProfile />
        </Route>

        <Route path="/GetFPLink">
          <GetFPLink />
        </Route> 
           
        <Route path="/DailyExpenses" >
           <DailyExpenses />
        </Route>
        

        
      </Switch>
    </>
  );
}

export default App;
