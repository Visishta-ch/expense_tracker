import React, { useState,useRef, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {expenseActions} from '../Store/expense-slice';
// import {themeActions} from '../Store/theme-slice'
// import AuthContext from '../Store/AuthContext';
import styles from './DailyExpenses.module.css';
import Nav from '../Components/pages/Nav';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import useLocalStorage from 'use-local-storage';


import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DailyExpenses = () => {
  const dispatch = useDispatch();
  
  const data = useSelector((state) => state.auth.token)
  const expenses = useSelector((state) => state.expense)
  console.log('expenses from slice:', expenses)
  console.log('data from Expenseslice',data);

  const [fetchData, setFetchData] = useState(false);
  const [theme, setTheme] = useLocalStorage('theme'?'dark':'light')
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [downloadbtn, setDownloadbtn] = useState(false); 
  
  const [items, setItems] = useState([]);
  const existingItems = [...items];
  let totalAmount = 0;
  let[total,setTotal] = useState(0);
  
  const expenseTitleRef = useRef();
  const expenseCategoryRef = useRef();
  const expenseAmountRef = useRef();

  // const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [modal, setModal] = useState(false);
  console.log(modal);

  const headers = [
    {
      label: 'Expense Title', key: 'title'
    },
    {
      label : 'Expense Category', key:'category'
    },
    {
      label: 'Amount Spent', key:'amount'
    }
  ]

  const csvLink = {
    filename : 'file.csv',
    headers: headers,
    data: items

  }
  const [isEditing, setIsEditing] = useState(false);
  let mail = localStorage.getItem('userMail');
  let usermail;
  if (mail != null) {
    const regex = /[`@.`]/g;
    usermail = mail.replace(regex, '');

    console.log(usermail);
  }
  console.log(mail);
  const toggle = () => {
    setModal(!modal);
  };
  // const authCtx = useContext(AuthContext);
  // console.log(authCtx.isLoggedIn);

 let result  //to store the total expenses
  

  useEffect(() => {
    const arrayOfExpenses = [];
    axios
          .get(
            `https://expensetracker-def96-default-rtdb.firebaseio.com/expenses/${usermail}.json`
          )
          .then((response) => {
            // console.log(response.data);
            
            result = response.data;
            // console.log(result)
            let keys = Object.keys(result)
            // console.log("keys", keys)
            // console.log(result);
            Object.entries(result).forEach((item) => {
              arrayOfExpenses.push({
                title: item[1].title,
                amount: item[1].amount,
                category: item[1].category,
                id: item[0]
              });
            });
            
            // console.log(arrayOfExpenses);
            setItems(arrayOfExpenses);
            dispatch(expenseActions.saveExpenses(result))
            console.log('dispatch success')
            for(let i = 0; i < arrayOfExpenses.length; i++){
              totalAmount = totalAmount + Number( arrayOfExpenses[i].amount)
            }
            // console.log(totalAmount);
            setTotal(totalAmount)
          })
          .catch((error) => {
            console.error(error);
          });
    
    
  }, [fetchData , modal]);
/**adding data to form */
  const addExpenseHandler = (e) => {
    e.preventDefault();
    const title = expenseTitleRef.current.value;
    const category = expenseCategoryRef.current.value;
    const amount = expenseAmountRef.current.value;
    const expenseItem = {
      title,
      category,
      amount,
    };
    console.log(expenseItem);
    saveExpense(expenseItem);
    
    setTitle('');
    setCategory('');
    setAmount('');
  };


  /*adding items to backend */
  async function saveExpense(expenseItem) {
    console.log(expenseItem);
    try {
      const response = await axios.post(
        `https://expensetracker-def96-default-rtdb.firebaseio.com/expenses/${usermail}.json`,
        expenseItem
      );
      if (response.status === 200) {
        console.log('posted items successfully', response.data.name); //id
        console.log(response);
      //  setListKey(response.data.name); /**  id */
        existingItems.push(expenseItem);
        setItems(existingItems);
        setModal(false);
        // dispatch(expenseActions.saveExpenses(expenseItem))
      } else {
        alert('failed post request');
      }
    } catch (error) {
      console.log('error:');
      alert('failed ');
    }
  }


  function deleteExpense(id){
    const temp = [...items];

    console.log('delete', id);
    fetch(`https://expensetracker-def96-default-rtdb.firebaseio.com/expenses/${usermail}/${id}.json`,
    {
      method: 'DELETE',
    }).then((response) => {
      response.json().then((response)=>{
        console.log('deleting item');
        
        // setTotal(totalAmount);
        setItems(temp.filter((c)=>c.id !== id));
        
        setFetchData(true)
      })
    }).catch(err=>{
      alert(err.message)
    })
  }

  const expenseEdit= (item)=> {
    console.log('edit', item);
    setModal(true);
    setIsEditing(true);
    setId(item.id);
    setAmount(item.amount);
    setCategory(item.category);
    setTitle(item.title)
    setFetchData(true)
  }

  const editExpenseHandler = (id) => {
    console.log('editing Id', id);
    const title = expenseTitleRef.current.value;
    const category = expenseCategoryRef.current.value;
    const amount = expenseAmountRef.current.value;
  
    fetch(
      `https://expensetracker-def96-default-rtdb.firebaseio.com/expenses/${usermail}/${id}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          title: title,
          category: category,
          amount: amount,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      }
    )
      .then((response) => {
        response.json().then((data) => {
          console.log('Editing item', data, id);

          setIsEditing(false);
          setModal(false);
          // setItems(data);
       //   setFetchData(true)
        });
      })
      .catch((err) => {
        alert(err.message);
      });

    setTitle('');
    setCategory('');
    setAmount('');
    setFetchData(true)
  };

  const activatePremium = (e) => {
    e.preventDefault()
    console.log('Activating premium')
    const newTheme = theme === 'light'? 'dark' : 'light';
    // dispatch(themeActions.changeTheme());
    setDownloadbtn(true)
    setTheme(newTheme);
  }
  
  return (
    <>
    <section className={styles.main} >
      <Nav />

      <div className={styles.dailyExpenses}>
        <div></div>
        <div className={styles.container}>
          <h2 style={{ letterSpacing: '2px', fontSize: '27px' }}>
            Daily Expenses
          </h2>

          <br></br>
          <button className={styles.addBtn} onClick={() => {
            setModal(true);
             setIsEditing(false)
             }}>
            Add Expense 
          </button>
          <br></br>
          {items.length !== 0 && (
            <div className={styles.container}>
              <h3> Added Expenses</h3> <br></br>
              {downloadbtn && <CSVLink {...csvLink} className={styles.downloadbtn}>download Expenses as csv <span>⬇️</span></CSVLink>}
              <br></br>
              {items.map((item) => (
                <li key={Math.random()} id={item.id} className={styles.listItem}>
                  <div className={styles.expenseItem}>
                    <span>{item.title} </span>
                    <span>{item.category} </span>
                    <span >{item.amount}</span>
                    <span>
                      {' '}
                      <button
                        className={styles.Editbtn}
                        onClick={()=> expenseEdit(item)}
                      >
                        Edit
                      </button>{' '}
                      <button className={styles.deletebtn} onClick={()=>deleteExpense(item.id)}>X</button>
                    </span>
                  </div>
                </li>
                
              ))}
              {total<10000 ? <p>Total Amount:{total}</p> : <div className={styles.premium}>
                <p>Total Amount: {total}</p>
                <p className={styles.premiumHeading}>Expenses exceeded 10K... Go for premium</p>
                <button onClick={activatePremium}>Activate Premium</button>
              </div>}
            </div>
          )}
        </div>

        <div></div>
      </div>
      {/* <Expense toggle={toggle} modal={modal} addItem={saveExpense} items={items} expenseEdit={expenseEdit}  edit={isEditing}  editItemID={id} editItem={editExpense}/> */}
    </section>
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Daily Expenses</ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group mb-3">
              <input
                type="text"
                placeholder="Expense Title"
                className="form-control "
                ref={expenseTitleRef}
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                placeholder="Expense Category"
                className="form-control"
                ref={expenseCategoryRef}
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="number"
                placeholder="Expense Amount"
                className="form-control"
                ref={expenseAmountRef}
                name="amount"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          {!isEditing && (
            <button className="btn btn-primary" onClick={addExpenseHandler}>
              Add Expense
            </button>
          )}
          {isEditing && (
            <button
              className="btn btn-primary"
              onClick={() => editExpenseHandler(id)}
            >
              Edit Expense
            </button>
          )}
          <button className="btn btn-secondary" onClick={toggle}>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
    </>
  );
};



export default DailyExpenses;

