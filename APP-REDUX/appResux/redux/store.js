import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slice/loginSlice";

const store = configureStore({
    reducer:{
        loginSlice,
    }
})

export default store;