import { combineReducers, configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
// import  {getallProjects}  from "./projectredux";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { userState } from "./redux";
export type Initials = {
    token: string | null,

}

const initialState: Initials = {
    token: null
}

interface Storage {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<string>;
    removeItem(key: string): Promise<void>;
}

const createNoopStorage = (): Storage => {
    return {
        getItem(_key: string): Promise<string | null> {
            console.log(_key)
            return Promise.resolve(null);
        },
        setItem(_key: string, value: string): Promise<string> {
            console.log(_key)
            return Promise.resolve(value);
        },
        removeItem(_key: string): Promise<void> {
            console.log(_key)
            return Promise.resolve();
        }
    };
};
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();


const dataState = createSlice({
    name: "Data",
    initialState,
    reducers: {

        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        }

    }
})

export const { setToken } = dataState.actions;


const rootReducer = combineReducers({
  data: dataState.reducer,      // will be persisted
  user: userState.reducer       // will NOT be persisted
});



const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["data"]
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store2 = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

});


export const persistor = persistStore(store2);