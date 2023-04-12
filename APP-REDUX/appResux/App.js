import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'

const Stack = createNativeStackNavigator()

const App = () =>{
  return (
    <NavigationContainer initialRouteName='login'>
      <Stack.Navigator>
        <Stack.Screen name='login' component={Login}></Stack.Screen>
        <Stack.Screen name='home' component={Home}></Stack.Screen>
        <Stack.Screen name='register' component={Register}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;