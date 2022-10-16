import React,{useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom'
import AuthContext from '../../Store/AuthContext'
import styles from './Nav.module.css'

const Nav = () => {
    const history = useHistory();
    const authCtx = useContext(AuthContext);
    const logoutHandler=()=>{
        localStorage.removeItem('userMail')
        localStorage.removeItem('isLoggedIn')
        authCtx.logout();
        history.replace('/Login')
      }
      
  return (
    
    <>
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

              background: 'none',
            }}
            onClick={logoutHandler}
            className={styles.logoutbtn}
          >
            LOGOUT
          </button>
          
        </div>
        
      </nav>
    </>
  )
}

export default Nav