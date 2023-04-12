import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Styles } from './Login'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faPencil, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { setTodo, setTodoList } from "../redux/slice/loginSlice";



const Home = () => {
    const { userDetails, todo, todoList } = useSelector((state) => state.loginSlice)
    const dispatch = useDispatch()


    let fetchUserDetails = async() => {
        try {
            let {data} = await axios.get(`http://192.168.0.168:6000/user/${userDetails.id}`)
            dispatch(setTodoList(data.data.todos))
        }
        catch(error) {
            console.log(error)
        }
    }

    let deleteUserDetails = async(todo) => {
        try {
            console.log(todo)
            let { data } = await axios.post(`http://192.168.0.168:6000/user/${userDetails.id}/todo/${todo.id}`)
            if( data.status == 'success'){
                fetchUserDetails()
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    let addTodo = async() => {
        try{
            let {data} = await axios.post(`http://192.168.0.168:6000/user/${userDetails.id}/todo`, {todo: todo.todo})
            if (data.status == 'success'){
                fetchUserDetails()
                dispatch(setTodo(''))
            }
        }
        catch(error){
           console.log(error)
        }
    }

    let updateTodo = async() => {
        try {
            let { data } = await axios.post('http://192.168.0.168:6000/user/todo', todo)
            if(data.status == "success") {
                fetchUserDetails()
                dispatch(setTodo({todo:''}))
            }
        }
        catch(error) {
            console.log(error)
        }
        
    }

    let completeUncomplete = async(todo) => {
        try{
            let { data } = await axios.post('http://192.168.0.168:6000/user/todo', {...todo,completed:!todo.completed})
            if(data.status == "success") {
                fetchUserDetails()
            }
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <View>
            <Text style={{fontSize:25, textAlign:'center', color:'black', marginTop:10, fontWeight:'bold'}}>WELCOME { userDetails.name.toUpperCase() }</Text>
            <View style={ homeStyle.typeSection}>
                <TextInput style={[Styles.textInput, {width:'65%'}]} onChangeText={ text => dispatch(setTodo({...todo,todo:text}))} defaultValue={todo.todo}/>
                {!todo.id ? <TouchableOpacity style={[{backgroundColor:"#daa520", borderWidth:1, borderColor:'black' }, homeStyle.addButton]} onPress={addTodo}>
                    <Text style={{fontSize:15, color:"white", fontWeight:'bold'}}>Add</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={[{backgroundColor:"#cd853f", borderWidth:1, borderColor:'black'}, homeStyle.addButton]} onPress={updateTodo}>
                    <Text style={{fontSize:15, color:"white", fontWeight:'bold'}}>update</Text>
                </TouchableOpacity>}
            </View>
            <View style={homeStyle.displayContainer}>
                {todoList.length > 0 && todoList.map( (value, index) => (
                    <View style={homeStyle.displayTodo} key={index}>
                        <View style={homeStyle.displayText}>
                            <Text style={homeStyle.indexStyle}>{index + 1}</Text>
                            <Text style={!value.completed ? homeStyle.textStyle : homeStyle.completed}>{value.todo.toUpperCase()}</Text>
                        </View>
                        <View style={homeStyle.iconContainer}>
                            <TouchableOpacity onPress={() => dispatch(setTodo(value))}>
                                <FontAwesomeIcon icon={faPencil} style={homeStyle.iconStyle} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteUserDetails(value)}>
                                <FontAwesomeIcon icon={faTrash} style={homeStyle.iconStyle}/>   
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => completeUncomplete(value)}>
                                <FontAwesomeIcon icon={faCheck} style={homeStyle.iconStyle}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

const homeStyle = StyleSheet.create({
    typeSection:{
        width:"80%",
        marginStart:"auto",
        marginEnd:'auto',
        flexDirection:"row",    
        alignItems:"center",
        justifyContent:'center',
        marginVertical:20
    },
    addButton:{
        padding:14,
        marginHorizontal:20,
        borderRadius:5,
    },
    displayContainer:{
        width:'90%',
        marginRight:'auto',
        marginLeft:'auto'
    },
    displayTodo:{
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        marginVertical:10,
        backgroundColor: "#daa520",
        borderColor:'black',
        borderWidth:1
    },
    displayText:{
        flexDirection:'row',
        padding:5,
        alignItems:"center"
    },
    indexStyle:{
        color: "white",
        borderWidth:2,
        borderColor:'white',
        height: 20,
        width: 20,
        borderRadius: 10,
        textAlign:"center",
        fontWeight:'bold'
    },
    textStyle:{
        color:"white",
        marginHorizontal:10,
        fontSize: 20
    },
    iconStyle:{
        color:'white',
        marginHorizontal:10
    },
    iconContainer:{
        flexDirection:'row'
    },
    completed:{
        textDecorationLine:'line-through',
        textDecorationColor:'black',
        color:"white",
        marginHorizontal:10,
    }
})

export default Home;