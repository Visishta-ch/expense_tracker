import {createSlice } from '@reduxjs/toolkit';
import {useContext} from 'react'
import AuthContext from '../Store/AuthContext';


const authCtx = useContext(AuthContext)
const mail = localStorage.getItem('userMail')
const initialAuthState = {
    isLoggedIn :false,
    token:null,
    userID:''
}

const AuthSlice = createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        login(state){
            state.token = authCtx.token;
        }
    }
})


export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;