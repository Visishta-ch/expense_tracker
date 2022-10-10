import React,{useContext} from 'react';
import styles from './Home.module.css';
import {useHistory} from 'react-router-dom'
import AuthContext from '../../Store/AuthContext'
import DailyExpenses from '../../Expenses/DailyExpenses'
const Home = () => {
    const authCtx = useContext(AuthContext)
    let eMail = authCtx.mail;
    const history = useHistory();
    const showFormHandler = (e) => {
        e.preventDefault();
        history.replace('/CompleteProfile')
    }
    const logoutHandler=()=>{
      localStorage.removeItem('userMail')
      authCtx.logout();
      history.replace('/Login')
    }
  return (
    <>
      <header style={{ padding: '20px', margin: '20px',display:' flex', justifyContent: 'space-between' }}>
        <h1 style={{ color: 'gray', fontFamily: 'ui-rounded', fontStyle:'italic' }}>
         Welcome to  Expense Tracker !!!
        </h1>
        <p className={styles.text}>Your Profile is Incomplete <button style={{padding:'3px',border: 'none', background:'none', color:'red'}} onClick={showFormHandler}> Complete your Profile</button></p>
        {authCtx.login && <span style={{color:'pink'}}>{eMail}</span>}
        <button className={styles.logoutbtn} onClick={logoutHandler}>LOGOUT</button>
      </header>
      
          <hr></hr>

          <div>
            <DailyExpenses/>
          </div>
    </>
  );
};

export default Home;
