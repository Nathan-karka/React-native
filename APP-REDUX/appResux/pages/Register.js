import { View, TextInput, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setRegisterDetails } from '../redux/slice/loginSlice';
import axios from 'axios';

const Register = ({navigation}) => {

    const { registerDetails } = useSelector((state) => state.loginSlice)
    const dispatch = useDispatch()

  const handleRegister = async() => {
    try {
        let { data } = await axios.post('http://192.168.0.168:6000/user', registerDetails)
        if (data.status == 'success'){
            Alert.alert(
                'Registration Data',
                `Name: ${registerDetails.name}\nEmail: ${registerDetails.email}\n`,
              );
            dispatch(setRegisterDetails({
                name:'',
                email:'',
                password: ''
            }))
        }
        else if(data.status == 'failed'){
            Alert.alert(data.message)
        }
    }
    catch(error){
        console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={text => dispatch(setRegisterDetails({...registerDetails, name:text}))}
        value={registerDetails.name}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => dispatch(setRegisterDetails({...registerDetails, email:text}))}
        value={registerDetails.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => dispatch(setRegisterDetails({...registerDetails, password:text}))}
        value={registerDetails.password}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={{color:'white'}}>Register</Text>
      </TouchableOpacity>
      <Text style={{textAlign:'center', marginVertical:5}}>(or)</Text>
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={{textAlign:'center', marginVertical:5}}>sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  registerButton:{
    backgroundColor:'#1e90ff',
    width:"100%",
    justifyContent:'center',
    alignItems:'center',
    marginStart:'auto',
    marginEnd:'auto',
    paddingVertical:8,
    marginVertical:10
},
});

export default Register;