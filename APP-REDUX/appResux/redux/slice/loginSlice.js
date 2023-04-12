import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged:false,
    loginCredentials:{
        email:'',
        password:''
    },
    userDetails:{},
    todo:{
        todo:''
    },
    todoList:[],
    registerDetails:{
        name:'',
        email:"",
        password:"",
    }

}

const loginSlice = createSlice({
    name:'LoginSlice',
    initialState,
    reducers:{
        setIsLogged: (state, action) => {
            state.isLogged = action.payload
        },
        setLoginCredentials: (state, action) => {
            state.loginCredentials = action.payload
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload
        },
        setTodo: (state, action) => {
            state.todo = action.payload
        },
        setTodoList: (state, action) => {
            state.todoList = action.payload
        },
        setRegisterDetails: (state, action) => {
            state.registerDetails = action.payload
        }
    }
})

export const { setIsLogged, setLoginCredentials, setUserDetails, setTodo, setTodoList, setRegisterDetails} = loginSlice.actions

export default loginSlice.reducer