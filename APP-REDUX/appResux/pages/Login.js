import { useEffect } from "react";
// import LoginScreen from "react-native-login-screen";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import { setIsLogged, setLoginCredentials, setTodoList, setUserDetails } from "../redux/slice/loginSlice";
import axios from "axios";


const Login = ({navigation}) =>{

    const { isLogged, loginCredentials } = useSelector((state) => state.loginSlice)

    const dispatch = useDispatch()

    useEffect( () => {
        if ( isLogged ) {
            navigation.navigate('home')
            
        } 
        console.log('hello')
    },[isLogged])

    const loginAuthentication = async() =>{
       try{
        const { data } = await axios.post('http://192.168.0.168:6000/auth/user', loginCredentials)
        if(data.status === 'success'){
            dispatch(setUserDetails(data.data))
            dispatch(setIsLogged(true))
            dispatch(setLoginCredentials({
                email:'',
                password:''
            }))
            dispatch(setTodoList(data.data.todos))
        }
        else{
            Alert.alert(data.message)
        }
       }
       catch(error){
        Alert.alert(error)
       }
    }
    console.log(isLogged)
    return (
        // <LoginScreen 
        //     onLoginPress={loginAuthentication}
        //     onEmailChange={ (text) => dispatch(setLoginCredentials({...loginCredentials, email:text}))} 
        //     onPasswordChange={ (text) => dispatch(setLoginCredentials({...loginCredentials, password:text})) }
        // />
        <View style={Styles.centered}>
            <View style={Styles.loginContainer}>
                <Text style={{textAlign:'center', fontSize:20}}>Login</Text>
                <TextInput placeholder="Email" 
                    style={Styles.textInput} 
                    onChangeText={ (text) => dispatch(setLoginCredentials({...loginCredentials, email:text}))} 
                    defaultValue={loginCredentials.email}
                />
                <TextInput placeholder="Password" 
                    style={Styles.textInput} 
                    onChangeText={ (text) => dispatch(setLoginCredentials({...loginCredentials, password:text}))}  
                    defaultValue={loginCredentials.password}
                    secureTextEntry
                />
                <TouchableOpacity onPress={loginAuthentication} style={Styles.loginButton}>
                    <Text style={Styles.loginText}>Sign In</Text>
                </TouchableOpacity>
                <Text style={{textAlign:'center'}}>(or)</Text>
                <TouchableOpacity onPress={() => navigation.navigate('register')}>
                    <Text style={{textAlign:'center', marginVertical:5}}>create an account ?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const Styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    textInput:{
        borderWidth:1,
        borderRadius:5,
        marginVertical:10,
        backgroundColor:'white'
    },
    loginButton:{
        backgroundColor:'#1e90ff',
        width:"100%",
        justifyContent:'center',
        alignItems:'center',
        marginStart:'auto',
        marginEnd:'auto',
        paddingVertical:8,
        marginVertical:10
    },
    loginText:{
        color:'white',
        fontSize:20,
    }
})

export default Login;