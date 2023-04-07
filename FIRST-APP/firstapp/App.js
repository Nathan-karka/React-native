import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard, ScrollView } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";

const App = () =>{
    const [inputValue, setInputValue] = useState('')
    const [messageList, setMessageList] = useState([])
    const [updateMessage, setUpdateMessage] = useState({message:'', index:''})

    const addMessage = (vlaue) =>{
        if(inputValue){
            setMessageList([...messageList, {message:vlaue, completed:false}])
            setInputValue('')
        }
        else{
            Alert.alert('empty message')
        }
    }

    const deleteMessage = (index) => {
        let duplicateArray = [...messageList]
        duplicateArray.splice(index, 1)
        setMessageList(duplicateArray)
    }

    const clickUpadte = () =>{
        console.log(updateMessage)
        let duplicateArray = [...messageList]
        duplicateArray.splice(updateMessage.index, 1)
        duplicateArray.splice(updateMessage.index, 0, {message:inputValue, completed:false})
        setMessageList(duplicateArray)
        setUpdateMessage('')
        setInputValue('')
    }

    const setCompleted = (completedIndex) =>{
        let duplicateArray = [...messageList]
        let newArray = duplicateArray.map((vlaue, index) =>{
            if (index == completedIndex){
                vlaue.completed = !vlaue.completed
            }
            return vlaue
        })
        setInputValue(newArray)

    }
    return (
        <ScrollView>
            <View style={Style.nav}>
                <Text style={Style.h1}>TO-DO</Text>
            </View>
            <View>
                <View style={Style.inputSection}>
                    <TextInput style={Style.border} defaultValue={updateMessage.message ? updateMessage.message : inputValue} onChangeText={text => setInputValue(text)} placeholder="type here" />
                    {!updateMessage.message ? <TouchableOpacity style={Style.buttonStyle} onPress={() => addMessage(inputValue)} >
                        <Text style={Style.textWhite}>Add</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity style={Style.buttonStyle} onPress={clickUpadte} >
                        <Text style={Style.textWhite}>update</Text>
                    </TouchableOpacity>}
                </View>
            </View>
            <View style={Style.messageContainer}>
                {messageList.length > 0 ? messageList.map((vlaue, index) =>(
                    <View key={index} style={Style.display}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={Style.textWhite}>{index + 1}:</Text>
                            <Text style={vlaue.completed ? Style.todoComplete : Style.todo}>{vlaue.message[0].toUpperCase() + vlaue.message.slice(1)}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={() => deleteMessage(index)}>
                                <FontAwesomeIcon icon={faTrash} color="white" style={Style.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setUpdateMessage({message:vlaue.message, index:index})}>
                                <FontAwesomeIcon icon={faPen} color="white" style={Style.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setCompleted(index)}>
                                <FontAwesomeIcon icon={faCheck} color="white" style={Style.icon}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) 
                ): <Text style={{textAlign:'center'}}>Plesae add a message......</Text>}
            </View>
        </ScrollView>
    )
}

const Style = StyleSheet.create({
    nav:{
        height:50,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#841584"
    },
    h1:{
        fontSize:30,
        color:'white'
    },
    h5:{
        fontSize:20,
        color:'white'
    },
    border:{
        borderWidth: 1,
        borderColor:'#841584',
        borderColor:'black',
        height:40,
        width:"80%",
    },
    inputSection:{
        flexDirection:'row',
        padding:10,
        width:'80%',
        // backgroundColor:'red',
        marginLeft:'auto',
        marginRight:'auto',
        justifyContent:'space-between',
        // marginHorizontal:'auto'
    },
    buttonStyle:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:10,
        backgroundColor:"#841584",
        paddingHorizontal:10,
        borderRadius:5
    },
    textWhite:{
        color:"white"
    },
    messageContainer:{
        width:'80%',
        marginLeft:'auto',
        marginRight:'auto',
        // backgroundColor:'steelblue',
    },
    display:{
        flexDirection:'row',
        backgroundColor:"#841584",
        padding:5,
        marginVertical:5,
        justifyContent:'space-between',
        borderRadius:5
    },
    icon:{
        marginTop:2,
        marginHorizontal:5
    },
    todo:{
        marginHorizontal:5, 
        color:'white', 
        fontSize:15
    },
    todoComplete:{
        marginHorizontal:5, 
        color:'white', 
        fontSize:15,
        textDecorationLine:'line-through',
    }
})

export default App;