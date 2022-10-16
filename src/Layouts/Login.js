import React, { useState, useRef, useContext, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {authActions} from '../Store/auth-slice'
import AuthContext  from '../Store/AuthContext';
import {Link,useHistory} from 'react-router-dom'
import styles from './Login.module.css';

const Login = () => {

    const authCtx = useContext(AuthContext);
    const history = useHistory()
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const storedToken = localStorage.getItem('tokenID')
  useEffect(() => {
      // const loggedUser = localStorage.getItem('userMail');
     // authCtx.login(storedToken);
     dispatch(authActions.login(storedToken))
  },[])

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const forgetPasswordHandler = () => {
      history.replace('/GetFPLink')
  }

  const submitLoginHandler = (e) => {
    e.preventDefault();
    const userMail = emailInputRef.current.value;
    authCtx.userMail(userMail);
    localStorage.setItem('userMail', userMail);
    const password = passwordInputRef.current.value;
    console.log('login detail', userMail, password);

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDS8nnD8MqJp08t46JCFNAEM-mnC_hRgHM',{
        method: 'POST',
        body: JSON.stringify({
          email: userMail,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
    }).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
          

        } else {
          return res.json().then((data) => {
            // show an error modal
            let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            // alert(errorMessage);
            // console.log(data);
            throw new Error(errorMessage);
          });
        }
      }).then(data => {
        console.log('login is successful', data.idToken);
        // authCtx.login(data.idToken)
        // authCtx.login(data.idToken)
        dispatch(authActions.login(data.idToken))
        history.push('/Header')

      }).catch(err => {
          alert(err.message);
      });

  }

  return (
    <section className={styles.body}>
      <div className={styles.title}>
        Expense Tracker
        <caption className={styles.caption}>
          ~ Live for today, hope for tomorrow.
        </caption>
      </div>
      <div>
        <div className={styles.login}>
          <h1 className={styles.heading}>Login</h1>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={submitLoginHandler}>
                <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                id="email"
                required
                ref={emailInputRef}
              />
              <br />
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                autoComplete="on"
                required
                ref={passwordInputRef}
              />
              <br />

              <span>{error}</span>
              <button to='/Home' className={styles.loginbtn}>Submit</button>
                <button className={styles.forget} onClick={forgetPasswordHandler}>Forget password</button>
              <div style={{ textAlign: 'center' }}>
        { !isLoading && <Link to='/' className={styles.signupbtn} onClick={switchAuthModeHandler}>
            {!isLogin ? 'Create new account' : ' Had Account ? Login '}
          </Link>}
        {isLoading && <p> Sending Request</p>}
        </div>
            </form>
        
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
