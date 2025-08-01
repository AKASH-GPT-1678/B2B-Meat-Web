// import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { set } from "zod/v4-mini";

// export type Initials = {
//     sigUpMode : boolean,
//     loginMode : boolean,
//     isLoggedIn : boolean,
//     isVerified : boolean,
   

// }

// const initialState : Initials = {
//     sigUpMode : false,
//     loginMode : false,
//     isLoggedIn : false,
//     isVerified : false,
    
// }
// export const userState = createSlice({
//     name : "User",
//     initialState,
//     reducers : {
//         signUpMode : (state) => {
//             state.sigUpMode = !state.sigUpMode
//         },
//         loginMode : (state , action : PayloadAction<boolean>) => {
//             state.loginMode = action.payload
//         },
//         setIsLoggedIn : (state , action : PayloadAction<boolean>) => {
//             state.isLoggedIn = action.payload
//         } ,
//         setIsVerified : (state , action : PayloadAction<boolean>) => {
//             state.isVerified = action.payload
//         },
  

//     }
// })

// export const { signUpMode , loginMode, setIsVerified } = userState.actions;


// const store = configureStore({
//     reducer : {
//         user : userState.reducer
//     }
// });

// export default store