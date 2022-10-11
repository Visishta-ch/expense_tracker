import React,{ useRef} from 'react'
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const Expense = ({modal, toggle, addItem}) => {
    const expenseTitleRef = useRef();
    const expenseCategoryRef = useRef();
    const expenseAmountRef = useRef();

    const addExpenseHandler = (e)=>{
        e.preventDefault();
        
        const title = expenseTitleRef.current.value;
        const category = expenseCategoryRef.current.value;
        const amount = expenseAmountRef.current.value;
        const expenseItem = {
            title,
            category,
            amount,
        }
        console.log(expenseItem);
        addItem(expenseItem);
        
    }

  return (
    <div>
        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Add Daily Expenses</ModalHeader>
          <ModalBody>
           <form>
            <div className='form-group mb-3'>
                <input type='text' placeholder='Expense Title' className='form-control ' ref={expenseTitleRef} name='title' id ='title'/>
            </div>
            <div className='form-group mb-3'>
            <input type='text' placeholder='Expense Category' className='form-control' ref={expenseCategoryRef} name= 'category' id ='category'/>
            </div>
            <div className='form-group mb-3'>
            <input type='number' placeholder='Expense Amount' className='form-control' ref={expenseAmountRef} name='amount' id ='amount'/>
            </div>
           </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={addExpenseHandler}>Add Expense</button>{' '}
            <button className="btn btn-secondary" onClick={toggle}>Cancel</button>
          </ModalFooter>
        </Modal>
    </div>
  )
}

export default Expense