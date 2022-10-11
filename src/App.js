import React,{useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Switch, Route } from 'react-router-dom';
import Signup from './Layouts/SignUp'
import Login from './Layouts/Login'
import Home from './Components/pages/Home'
import CompleteProfile from './Components/pages/CompleteProfile'
import GetFPLink from './Layouts/GetFPLink'
import Header from './Layouts/Header'
import AuthContext from './Store/AuthContext'
import DailyExpenses from './Expenses/DailyExpenses'
import './App.css';

function App() {
  const authCtx = useContext(AuthContext);
  const userLoggedIn = authCtx.isLoggedIn;
  console.log(userLoggedIn);
  // const storedToken = localStorage.getItem('tokenID')
  // if(storedToken){
  //   authCtx.login(storedToken);
  // }
  // useEffect(() => {
  //     // const loggedUser = localStorage.getItem('userMail');
  //     authCtx.login(storedToken);
  // },[])
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

      <Route path='/Header'><Header /></Route>

      <Route path='/Home'>
        <Home/>
      </Route>
      {/* <Route path='/Home'><Home/></Route> */}
      <Route path='/CompleteProfile'>
          <CompleteProfile/>
      </Route>
      <Route path='/GetFPLink'>
        <GetFPLink/>
      </Route>
      <Route path='/DailyExpenses'>
        <DailyExpenses/>
      </Route>
     </Switch>
    </>
  );
}

export default App;
