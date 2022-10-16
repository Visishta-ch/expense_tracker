/* eslint-disable */

import {createSlice} from '@reduxjs/toolkit'


const initialAuthStatus={
    token:'',
    isLoggedIn: false
}
const authSlice = createSlice({
    name:'auth',
    initialState: initialAuthStatus,
    reducers:{
        login(state,action) {
            // state.isLoggedIn = true,
            // state.token = action.payload
            localStorage.setItem('tokenID',action.payload)
            state.token = localStorage.getItem('tokenID')
            console.log(state.token)
            localStorage.setItem('isLoggedIn', true)
        
        },
        logout(state){
            // state.isLoggedIn= false,
            localStorage.removeItem('tokenID')
            localStorage.clear();
            localStorage.removeItem('isLoggedIn')
        }


    },
})

export const authActions = authSlice.actions

export default authSlice.reducer