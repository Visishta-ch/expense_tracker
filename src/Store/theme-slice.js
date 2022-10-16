import {createSlice} from '@reduxjs/toolkit'

const initialTheme = {background: 'light', color: 'black'};

const themeReducer = createSlice({
    name:'theme',
    initialState:initialTheme,
    reducers:{
        changeTheme(state){
            state.background = 'dark'
            state.color = 'light'
        }
    }
})
export const themeActions = themeReducer.actions
export default themeReducer.reducer