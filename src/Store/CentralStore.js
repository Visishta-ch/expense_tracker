import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './auth-slice'
import expenseSliceReducer from './expense-slice'
import themeReducer from './theme-slice'

const store = configureStore({
    reducer:{auth: authSliceReducer, expense: expenseSliceReducer, theme: themeReducer}
})

export default store;