import {createSlice} from '@reduxjs/toolkit';

const initialExpenses = {
    items: []
}

const expensesSlice = createSlice({
    name: 'expense',
    initialState:initialExpenses,
    reducers:{
        saveExpenses(state,action){
            console.log('saving items to redux store')
            state.items = [...state.items, action.payload]
    
            console.log('adding items to slice')
        }
    
    }
})

export const expenseActions = expensesSlice.actions;

export default expensesSlice;