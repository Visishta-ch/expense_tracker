import React,{ useRef, useContext} from 'react';
import AuthContext from '../../Store/AuthContext'
import styles from './Cp.module.css'
const CompleteProfile = () => {
    const authCtx = useContext(AuthContext);
    const token= authCtx.token;
    console.log(token);
    const userNameref= useRef();
    const userPicref = useRef();

    const updatedetailsHandler = (e) => {
            e.preventDefault();
            const userName = userNameref.current.value;
            const userPic = userPicref.current.value;

            if(userName !== '' || userPic !== ''){
                fetch( 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDS8nnD8MqJp08t46JCFNAEM-mnC_hRgHM',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        idToken:token,
                        displayName:userName,
                        photoUrl:userPic,
                        // deleteAttribute:DISPLAY_NAME,
                        returnSecureToken: true
            
                    }),
                    headers:{
                        'Content-Type': 'application/json',
                    }
                }).then((res) => {
                    
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
                    console.log('updated data',data);
                    // authCtx.login(data.idToken)
        
            
                  }).catch(err => {
                      alert(err.message);
                  });
            }
    }
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
        <p className={styles.text}>
          Your Profile is Incomplete{' '}
          <button
            style={{ padding: '3px', border: 'none', background: 'none' }}
        
          >
            {' '}
            Complete your Profile
          </button>
        </p>
      </header>

      <hr></hr>

      <div className={styles.container}>
          <div className={styles.title}><h2>Contact Information</h2>
            <button className={styles.cancelbtn}> Cancel</button>
          </div>
        <div className={styles.formDiv} >  
        <form className={styles.form} onSubmit={updatedetailsHandler}>
          <label>Full Name</label>
          <input type='text' placeholder='Full Name' ref={userNameref}/>
          <label>Profile Photo URL </label>
          <input type='text' placeholder= 'Profile Photo URL' ref={userPicref}/>
          <br/>
          <button className={styles.updatebtn}>Update</button>
       </form>
       </div>
      </div>
    </>
  );
};

export default CompleteProfile;
