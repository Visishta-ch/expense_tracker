import React, { useEffect } from 'react';
// import AuthContext from '../Store/AuthContext';
import { useDispatch } from 'react-redux';
import { authActions } from '../Store/auth-slice';
import { NavLink, useHistory } from 'react-router-dom';

import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const userMailId = localStorage.getItem('userMail');
  useEffect(() => {
    if (!userMailId) {
      history.push('/Login');
    }
  }, []);
  // const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    localStorage.removeItem('userMail');
    localStorage.removeItem('isLoggedIn');
    // authCtx.logout();
    dispatch(authActions.logout());
    history.replace('/');
  };
  return (
    <section>
      {/* <div></div> */}
      <nav>
        <div className={styles.navbar}>
          <NavLink
            to="/Header"
            style={{
              padding: '10px',
              margin: '10px',
              textDecoration: 'none',
              color: 'white',
            }}
          >
            HOME
          </NavLink>
          <NavLink
            to="/DailyExpenses"
            style={{
              padding: '10px',
              margin: '10px',
              textDecoration: 'none',
              color: 'white',
            }}
          >
            DAILY EXPENSES
          </NavLink>

          <NavLink
            to="/CompleteProfile"
            style={{
              padding: '10px',
              margin: '10px',
              textDecoration: 'none',
              color: 'white',
            }}
            className="nav-about"
          >
            PROFILE
          </NavLink>
          {/* <Route path="/Header/CompleteProfile">
          <NavLink
            to="/CompleteProfile"
            style={{
              padding: '10px',
              margin: '10px',
              textDecoration: 'none',
              color: 'white',
            }}
            className="nav-about"
          >
            PROFILE
          </NavLink>
          </Route> */}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <button
            to="/Login"
            style={{
              textDecoration: 'none',
              color: 'white',
              position: 'relative',
              margin: '8px',
              border: 'none',
              top: '-18px',
              background: 'none',
            }}
            onClick={logoutHandler}
            className={styles.logoutbtn}
          >
            LOGOUT
          </button>
        </div>
      </nav>

      <section className={styles.body}>
        <div className={styles.title}>
          Welcome to Expense Tracker !!!
          <caption className={styles.caption}>
            ~ Live for today, hope for tomorrow.
          </caption>
        </div>
        <div>
          <div className={styles.login}>
            {userMailId && (
              <>
                <span
                  style={{
                    padding: '10px',
                    margin: '10px',
                    textDecoration: 'none',
                    background: 'none',
                    color: 'white',
                    fontFamily: 'Cursive',
                    fontSize: '25px',
                  }}
                >
                  {userMailId}
                </span>
              </>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Header;
