import React,{ useRef} from 'react';
import styles from './GetFPLink.module.css';
import {Link} from 'react-router-dom'
const GetFPLink = () => {

    const emailInputRef = useRef();

    const verifyMailHandler = (e) => {
        e.preventDefault();
        console.log('Verifying')
        const email= emailInputRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDS8nnD8MqJp08t46JCFNAEM-mnC_hRgHM',
        {
            method: 'POST',
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:email,
            }),
            headers: {
                'Content-Type':'application/json'
            }
        }).then(res=>{
            if(res.ok){
                return res.json();
            }else {
                return res.json().then((data) => {
                    let errorMessage = 'Authentication failed Email is not registered';
                    if(data && data.error && data.error.message){
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                })
            }
        }).then(data=>{
            console.log('Password reset link sent');
            console.log(data);
        }).catch(error=>{alert(error.message)})

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
            <div></div>

          <div className={styles.container}>
            <div></div>
            <form className={styles.form} onSubmit={verifyMailHandler}>
            <p>Enter the email with which you have registered</p>
            

              <input
                type="text"
                name="email"
                placeholder="Email"
                id="email"
                required
                ref={emailInputRef}
              />
             

        
              
                <button className={styles.loginbtn} >SEND LINK</button>
        
                <Link to='/Login' className={styles.forget}> Have Account ? Login</Link>

        
            </form>
            <div></div>
          </div>
     
</div>
</div>
    </section>
  );
};

export default GetFPLink;
