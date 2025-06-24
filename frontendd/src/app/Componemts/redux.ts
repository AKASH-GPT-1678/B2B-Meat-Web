import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Initials = {
    sigUpMode : boolean,
    loginMode : boolean
}

const initialState : Initials = {
    sigUpMode : false,
    loginMode : false
}
const userState = createSlice({
    name : "User",
    initialState,
    reducers : {
        signUpMode : (state) => {
            state.sigUpMode = !state.sigUpMode
        },
        loginMode : (state , action : PayloadAction<boolean>) => {
            state.loginMode = action.payload
        }   
    }
})

export const { signUpMode , loginMode } = userState.actions;


const store = configureStore({
    reducer : {
        user : userState.reducer
    }
});

export default store