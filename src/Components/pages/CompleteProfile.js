import React,{ useRef,useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { authActions } from '../../Store/auth-slice';
import {useHistory,} from 'react-router-dom'
// import AuthContext from '../../Store/AuthContext'
import styles from './Cp.module.css'
import user from '../../images/user1.png';
import url from '../../images/url.jpg'

const CompleteProfile = () => {
  const userToken = useSelector(state => state.auth.token) 
  // const isLoggedIn = useSelector(state => state.auth.IsLoggedIn)
  // console.log(isLoggedIn)
  console.log('usertoken',userToken)
  const dispatch = useDispatch();
  const history= useHistory();
  // const authCtx = useContext(AuthContext);
   const [verified, setVerified]= useState(false); 
   const [mail,setMail] = useState('')
   const [imgUrl, setImgUrl ] = useState('')
  const userMail = localStorage.getItem('userMail')
  const [loggedInUser, setLoggedInUser] = useState('')
  const [updateProfile, setUpdateProfile] = useState(true)
  const [completeProfile, setCompleteProfile] = useState(true)
  const [userPhoto, setUserPhoto] = useState('')

   const Token = localStorage.getItem('tokenID')


  const userMailId = localStorage.getItem('userMail');
  useEffect(() => {
      if(!userMailId) {
        history.push('/Login')
      }
    
  },[])
  useEffect(()=>{

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDS8nnD8MqJp08t46JCFNAEM-mnC_hRgHM',{
      method: 'POST',
      body: JSON.stringify({
          idToken:Token,
          

      }),
      headers:{
          'Content-Type': 'application/json',
      }
    }).then(response =>{
      if(response.status === 200){
        console.log('ok')
        return response.json();
      }else{
        return response.json().then((data) => {
          // cann show an error modal
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
      // console.log('fetched data',data.users[0].displayName);
      
      let userName = data.users[0].displayName;
      let userProfilePic = data.users[0].photoUrl;
      setLoggedInUser(userName)
      setUserPhoto(userProfilePic)
      setUpdateProfile(false)
      setCompleteProfile(false);

    }).catch(err => {
        alert(err.message);
    });
 
       


    
  },[])
  
       
    // const token= authCtx.token;
    // console.log(token);
    const userNameref= useRef();
    const userPicref = useRef();

    const editHandler = (item)=> {
      setUpdateProfile(true);
      
      
    }



    const updatedetailsHandler = (e) => {
            e.preventDefault();

            const userName = userNameref.current.value;
            const userPic = userPicref.current.value;

            if(userName !== '' || userPic !== ''){
            
                fetch( 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDS8nnD8MqJp08t46JCFNAEM-mnC_hRgHM',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        idToken:Token,
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
                        // cann show an error modal
                        let errorMessage = 'Authentication failed!';
                        if (data && data.error && data.error.message) {
                          errorMessage = data.error.message;
                        }
                        // alert(errorMessage);
                        console.log(data);
                        throw new Error(errorMessage);
                      });
                    }
                  }).then(data => {
                    console.log('updated data',data);
                    // authCtx.login(data.idToken)
                     
       
            fetch( 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDS8nnD8MqJp08t46JCFNAEM-mnC_hRgHM',
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken:Token,
                    
        
                }),
                headers:{
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                
                if (res.ok) {
                  return res.json();
                  
        
                } else {
                  return res.json().then((data) => {
                    // cann show an error modal
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
                console.log('fetched data',data.users[0].displayName);
                // authCtx.login(data.idToken)
                let userName = data.users[0].displayName;
                let userProfilePic = data.users[0].photoUrl;
                setLoggedInUser(userName)
                setUserPhoto(userProfilePic)
                setUpdateProfile(false)
                setCompleteProfile(false);
        
              }).catch(err => {
                  alert(err.message);
              });
            
                  }).catch(err => {
                      alert(err.message);
                  });
                  }        
      }

      const verifyEmailHandler = () => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDS8nnD8MqJp08t46JCFNAEM-mnC_hRgHM',{

          method: 'POST',
          body: JSON.stringify({
            requestType:"VERIFY_EMAIL",
            idToken:Token
          })
        }).then(response =>{
          if(response.ok){
            return response.json();
          }
          else{
            return response.json().then((data) => {
              // cann show an error modal
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
          console.log('user  Verfied Mail', data)
          setVerified(true);
          
        }).catch(error => {
          console.log(error.message)
        }).catch(error => {
          console.log(error.message)
        })
      }

      const logoutHandler=()=>{
        localStorage.removeItem('userMail')
        localStorage.removeItem('isLoggedIn')
        // authCtx.logout();
        dispatch(authActions.logout());
        history.replace('/Login')
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
       {completeProfile && <p className={styles.text}>
          Your Profile is Incomplete{' '}
          <button
            style={{ padding: '3px', border: 'none', background: 'none',color:'red' }}
        
          >
            {' '}
            Complete your Profile
          </button>
        </p>}
        {!completeProfile && <>
    
        
        <button onClick={()=> editHandler()} style={{ padding: '3px', border: 'none', background: '#cfcfcf', borderRadius:'10px',height:'28px', width:'145px' }}>Edit Details</button>
        </>
        }
        {Token && <caption style={{color:'Purple'}}>{userMail}</caption>}
        <button className={styles.logoutbtn} onClick={logoutHandler}>LOGOUT</button>
 
      </header>

      <hr></hr>

     {updateProfile && <div className={styles.container}>
          <div className={styles.title}><h2>Contact Information</h2>
            <button className={styles.cancelbtn}> Cancel</button>
          </div>
        <div className={styles.formDiv} >  
        <form className={styles.form} onSubmit={updatedetailsHandler}>
        <div style={{ display:'flex', flexDirection: 'row' }}>
        <img src={user} alt=''  style={{width:'25px', height:'25px'}}/>
          <label>Full Name</label>       
          <input type='text'  placeholder='Full Name' name='fullName'  ref={userNameref} value={mail} onChange={(e)=> {setMail(e.target.value)}}/>
        </div>
        <div style={{ display:'flex', flexDirection: 'row' }}>
          <img src={url} alt='' style={{width:'25px', height:'25px'}}/>
          <label>Profile Photo URL </label>
          <input type='text' placeholder= 'Profile Photo URL' ref={userPicref} value={imgUrl} onChange={(e)=> {setImgUrl(e.target.value)}}/>
          </div>
          <br/>
          <button className={styles.updatebtn}>Update</button>
       </form>
       
       </div>
       
      </div>}

      {!updateProfile && <div  style={{ display:'grid', gridTemplateRows:'repeat(2,1fr)' }}>
          <div style = {{ display:'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div className={styles.userdetail}> <span style={{color:'navy'}}>User :</span> {loggedInUser}</div>
          <img src={userPhoto} alt='' style={{width:'100px', height:'80px'}}/>
        </div>
        <div>
         {verified && <button onClick={verifyEmailHandler} className={styles.emailbtn}>Verify Email</button>}
        </div>
        {!verified && <button className={styles.verified}>Your account has been verified</button>}
      </div>}
    </>
  );
};

export default CompleteProfile;
