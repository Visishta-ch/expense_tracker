import React, {  useState,useEffect, useContext } from 'react';
import AuthContext from '../Store/AuthContext';
import styles from './DailyExpenses.module.css';
import Nav from '../Components/pages/Nav'
import axios from 'axios';
import Expense from '../Components/Modal/Expense'


const DailyExpenses = () => {

  const [modal, setModal] = useState(false);
  let mail = localStorage.getItem('userMail')
  let usermail;
  if (mail != null) {
    const regex = /[`@.`]/g;
    usermail = mail.replace(regex, '');

     console.log(usermail);
  }
  console.log(mail)
  const toggle = () => {
    setModal(!modal);
  }
  const authCtx = useContext(AuthContext)
  console.log(authCtx.isLoggedIn);

  const [items, setItems] = useState([]);
  const existingItems = [...items];
  const [listKey, setListKey] = useState('');
 
  useEffect(()=>{
    const arrayOfExpenses = [];
    mail && axios.get(`https://expensetracker-def96-default-rtdb.firebaseio.com/expenses/${usermail}.json`)
    .then((response) => {
      console.log(response.data)
      
      const result = response.data
      console.log(result)
      Object.entries(result).forEach((item)=>{
        // console.log('item :',item[1].title,item[1].category,item[1].amount);

        console.log(item[1])
        arrayOfExpenses.push({
          title: item[1].title,
          amount: item[1].amount,
          category:item[1].category
        })
        
      })
      
      console.log(arrayOfExpenses)
       setItems(arrayOfExpenses)
      console.log('result')
    }).catch((error) => {
      console.error(error)
    })

  },[])
    

    
  
   /*adding items to backend */
  async function saveExpense(expenseItem){
    try{
          
    
    const response = await axios.post(`https://expensetracker-def96-default-rtdb.firebaseio.com/expenses/${usermail}.json`,expenseItem);
    if(response.status === 200){
        console.log('posted items successfully',response.data.name);
        console.log(response)
        setListKey(response.data.name);
        existingItems.push(expenseItem);
        setItems(existingItems);
        setModal(false)
    }else{
        alert('failed post request');
    }
  }catch(error){
      console.log('error:');
      alert('failed ')
  }
    
    
  };
   return (
    <section style={{ display:'grid', gridTemplateRows:'repeat(2,1fr'}}>
    
    <Nav/>
    
     
  
    <div className={styles.dailyExpenses}>
      <div></div>
      <div className={styles.container}>
        <h2 style={{    letterSpacing: '2px',
    fontSize: '27px'}}>Daily Expenses</h2>

        <br></br>
        <button className={styles.addBtn} onClick={()=> setModal(true)}>Add Expense</button>
      { items.length!== 0 && <div className={styles.container}>
         <h3> Added Expenses</h3>
              {items.map((item)=> <li key={listKey} className={styles.listItem}><div className={styles.expenseItem}>
              <span>{item.title} </span>
              <span>{item.category} </span>
             <span>{item.amount}</span> 
            <span> <button className={styles.Editbtn}>Edit</button> <button className={styles.deletebtn}>X</button></span>
             </div></li>)}
        </div>}
       
      </div>
      
      <div></div>
    </div>
    <Expense toggle={toggle} modal={modal} addItem={saveExpense}/>
    </section>
  );
};

export default DailyExpenses;
