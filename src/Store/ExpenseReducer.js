import {createSlice } from '@reduxjs/toolkit';
import {useContext, useState} from 'react'
import AuthContext from '../Store/AuthContext';


const authCtx = useContext(AuthContext)
const mail = localStorage.getItem('userMail')

const initialExpenseState = {data:[]}
const arrayOfExpenses = [];   
const [items, setItems] = useState([])


const ExpenseSlice = createSlice({
    name:'expense',
    initialState:initialExpenseState,
    reducers:{
        fetchData(state){
          
        }
    }
})


export const expenseActions = ExpenseSlice.actions;

export default ExpenseSlice.reducer;