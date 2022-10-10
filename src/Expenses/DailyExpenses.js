import React, { useRef, useState } from 'react';
import styles from './DailyExpenses.module.css';

const DailyExpenses = () => {
  const [items, setItems] = useState([]);
  const expenseTitleRef = useRef();
  const expenseDescriptionRef = useRef();
  const expenseAmountRef = useRef();
  const existingItems = [...items];
  const [listKey, setListKey] = useState('');
  const addExpenseHandler = (e) => {
    e.preventDefault();
    const title = expenseTitleRef.current.value;
    const description = expenseDescriptionRef.current.value;
    const amount = expenseAmountRef.current.value;
    const list = {
      title: title,
      description: description,
      amount: amount,
    };
    console.log(title, description, amount);
    console.log(list);
    existingItems.push(list);
    setItems(existingItems);
    setListKey(Math.random());
  };
  return (
    <div className={styles.dailyExpenses}>
      {/* <div></div> */}
      <div className={styles.formDiv}>
        <h1 className={styles.heading}>Daily Expenses</h1>
        <br></br>
        <form className={styles.form} onSubmit={addExpenseHandler}>
          <label>Expense-Title</label>
          <br />
          <input
            type="text"
            name="expense_title"
            placeholder="Expense Title"
            ref={expenseTitleRef}
          />
          <br />
          <label>Expense-Description</label>
          <br />
          <input
            type="text"
            name="expense_description"
            placeholder="Expense"
            ref={expenseDescriptionRef}
          />
          <br />
          <label>Expense-Amount</label>
          <br />
          <input
            type="number"
            name="expense_amount"
            placeholder="Expense"
            ref={expenseAmountRef}
          />
          <br />

          <button className={styles.btn}>Add Expense</button>
        </form>
      </div>
      {/* <p> added items: <li>{items}</li></p> */}

      <div className={styles.list}>
        <h2 className={styles.heading2}>Added Expenses</h2>
        <br></br>
        <div className={styles.titlelist}>
        <span
          style={{
            fontFamily: 'sans serif',
            color: 'purple',
            fontSize: '25px',
            padding: '5px',
          }}
        >
          Title
        </span>{' '}
        <span
          style={{
            fontFamily: 'sans serif',
            color: 'purple',
            fontSize: '25px',
            padding: '5px',
          }}
        >
          Description
        </span>{' '}
        <span
          style={{
            fontFamily: 'sans serif',
            color: 'purple',
            fontSize: '25px',
            padding: '5px',
          }}
        >
          Amount
        </span>
        </div>
        <div className={styles.item}>
        <ul>
          {items.map((item) => (
            <li key={listKey} id={listKey} className={styles.listItem}>
              <span>{item.title} </span>
              <span>{item.description} </span>
             <span>{item.amount}</span> 
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default DailyExpenses;
