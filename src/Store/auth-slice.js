/* eslint-disable */

import {createSlice} from '@reduxjs/toolkit'

const initialAuthStatus={
    token:localStorage.getItem('tokenID'),
    isLoggedIn: localStorage.getItem('isLoggedIn')
}
// console.log('token from slice', initialAuthStatus.token)
const authSlice = createSlice({
    name:'auth',
    initialState: initialAuthStatus,
    reducers:{
        login(state,action) {            
            localStorage.setItem('tokenID',action.payload)
            // state.token = localStorage.getItem('tokenID')
            // console.log(state.token)
            localStorage.setItem('isLoggedIn', true)        
        },
        logout(state){
            state.isLoggedIn= false,
            localStorage.removeItem('tokenID')
            localStorage.removeItem('isLoggedIn')
        },
        


    },
})

export const authActions = authSlice.actions

export default authSlice.reducer


// state.isLoggedIn = true,
            // state.token = action.payload