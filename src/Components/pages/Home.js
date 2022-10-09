import React from 'react';
import styles from './Home.module.css';
import {useHistory} from 'react-router-dom'
const Home = () => {
    const history = useHistory();
    const showFormHandler = (e) => {
        e.preventDefault();
        history.replace('/CompleteProfile')
    }
  return (
    <>
      <header style={{ padding: '20px', margin: '20px',display:' flex', justifyContent: 'space-between' }}>
        <h1 style={{ color: 'gray', fontFamily: 'ui-rounded', fontStyle:'italic' }}>
         Welcome to  Expense Tracker !!!
        </h1>
        <p className={styles.text}>Your Profile is Incomplete <button style={{padding:'3px',border: 'none', background:'none'}} onClick={showFormHandler}> Complete your Profile</button></p>
        
      </header>
      
          <hr></hr>
    </>
  );
};

export default Home;
