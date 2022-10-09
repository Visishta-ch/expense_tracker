import React, { useRef, useState } from 'react';
import styles from './SignUp.module.css';
import image from '../images/bg1.jpg';

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();

  var strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'
  );

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredMail = emailInputRef.current.value;
    const pswd = passwordInputRef.current.value;
    const confirmPswd = confirmPasswordRef.current.value;

    /* vadilation for password*/
    if (pswd !== confirmPswd) {
      setError('Confirm password should be same as password');
      console.log('Confirm password changed');
      // alert('Confirm password changed')
    }
    if (pswd.length <= 6) {
      setError('password should be at least 6 characters');
    } else if (!strongRegex.test(pswd)) {
      setError('password should have special characters');
    }

    console.log(enteredMail, pswd);
    setIsLoading(true);
    if (isLogin) {
    } else if (pswd === confirmPswd) {
      console.log('sending request');
      fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDS8nnD8MqJp08t46JCFNAEM-mnC_hRgHM',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredMail,
            password: pswd,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          // ...
        } else {
          return res.json().then((data) => {
            // show an error modal
            let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
            // console.log(data);
          });
        }
      });
    }
    // } else {
    //   alert('Confirm password should match with entered password');
    // }
  };
  return (
    <section className={styles.body}>
      {/* <img src={image} alt='' className={styles.backgroundImage}/> */}
      <div className={styles.title}>
        Expense Tracker
        <caption className={styles.caption}>
          
          ~ Live for today, hope for tomorrow.
        </caption>
      </div>
      <div className={styles.signup}>
        <h1 className={styles.heading}>Sign Up</h1>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={submitHandler}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              id="email"
              required
              ref={emailInputRef}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              id="password"
              autoComplete="on"
              required
              ref={passwordInputRef}
            />
            <br />
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              autoComplete="on"
              required
              ref={confirmPasswordRef}
            />
            <span>{error}</span>
            <button className={styles.signupbtn}>SignUp</button>
          </form>
        </div>
        <div style={{ textAlign: 'center' }}>
        { !isLoading && <button className={styles.loginbtn} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : ' Had Account ? Login '}
          </button>}
        {isLoading && <p> Sending Request</p>}
        </div>
      </div>
      {/* <div></div> */}
    </section>
  );
};

export default SignUp;
