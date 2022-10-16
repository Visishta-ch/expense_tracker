import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store/auth-slice';
import styles from './Home.module.css';
import { useHistory, Link } from 'react-router-dom';
import AuthContext from '../../Store/AuthContext';

const Home = () => {
  const dispatch = useDispatch();
  const isLog = useSelector((state) => state.auth.isLoggedIn);
  console.log('login from slice', isLog);
  const isLoginIn = localStorage.getItem('isLoggedIn');
  console.log('isLoginIn from authSlice', isLoginIn);

  const userMail = localStorage.getItem('userMail');
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem('userMail');
    localStorage.removeItem('isLoggedIn');
    // authCtx.logout();
    dispatch(authActions.logout());
    history.replace('/Login');
  };
  return (
    <>
      <header
        style={{
          padding: '20px',
          margin: '20px',
          display: ' flex',
          justifyContent: 'space-between',
        }}
      >
        <h1
          style={{
            color: 'gray',
            fontFamily: 'ui-rounded',
            fontStyle: 'italic',
          }}
        >
          Welcome to Expense Tracker !!!
        </h1>
        {/* <p className={styles.text}>
          Your Profile is Incomplete{' '}
          <Link
            to="/CompleteProfile"
            style={{
              padding: '3px',
              border: 'none',
              background: 'none',
              color: 'red',
            }}
          >
            {' '}
            Complete your Profile
          </Link>
        </p> */}
        {authCtx.login && <span style={{ color: 'black' }}>{userMail}</span>}
        {/* {!isLoginIn && <span style={{color:'black'}}>{userMail}</span>} */}
        <button className={styles.logoutbtn} onClick={logoutHandler}>
          LOGOUT
        </button>
      </header>

      <hr></hr>

      <div></div>
    </>
  );
};

export default Home;
