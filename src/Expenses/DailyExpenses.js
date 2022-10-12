import React, { useState,useRef, useEffect, useContext} from 'react';
import AuthContext from '../Store/AuthContext';
import styles from './DailyExpenses.module.css';
import Nav from '../Components/pages/Nav';
import axios from 'axios';
import Expense from '../Components/Modal/Expense';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DailyExpenses = () => {

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');


  
  const expenseTitleRef = useRef();
  const expenseCategoryRef = useRef();
  const expenseAmountRef = useRef();


   const [id, setId] = useState('');
  const [modal, setModal] = useState(false);
  
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
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isLoggedIn);

  const [items, setItems] = useState([]);
  const existingItems = [...items];
  // const [listKey, setListKey] = useState('[]');

  useEffect(() => {
    const arrayOfExpenses = [];
     
        axios
          .get(
            `https://expensetracker-def96-default-rtdb.firebaseio.com/expenses/${usermail}.json`
          )
          .then((response) => {
            console.log(response.data);
  
            const result = response.data;
            let keys = Object.keys(result)
            console.log("keys", keys)
            console.log(result);
            Object.entries(result).forEach((item) => {
              // console.log('item :',item[1].title,item[1].category,item[1].amount);
    
              // console.log(id);
              //  console.log(item[0])
                     
              // console.log(item[1]);
              arrayOfExpenses.push({
                title: item[1].title,
                amount: item[1].amount,
                category: item[1].category,
                id: item[0]
              });
            });
  
            // console.log(arrayOfExpenses);
            setItems(arrayOfExpenses);
            // console.log('result');
            
            
          })
          .catch((error) => {
            console.error(error);
          });
    
    
  }, []);
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
        setItems(temp.filter((c)=>c.id !== id));
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
          
        });
      })
      .catch((err) => {
        alert(err.message);
      });

    setTitle('');
    setCategory('');
    setAmount('');
  };
  
  return (
    <>
    <section style={{ display: 'grid', gridTemplateRows: 'repeat(2,1fr)' }}>
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
          {items.length !== 0 && (
            <div className={styles.container}>
              <h3> Added Expenses</h3>
              {items.map((item) => (
                <li key={Math.random()} id={item.id} className={styles.listItem}>
                  <div className={styles.expenseItem}>
                    <span>{item.title} </span>
                    <span>{item.category} </span>
                    <span>{item.amount}</span>
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
