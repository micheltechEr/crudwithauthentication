import React, { useEffect,useState } from 'react'
import { ActivityIndicator } from 'react-native'
import {View,Text ,TextInput, TouchableOpacity,Alert} from 'react-native'
import firebase from './firebase'
import style from './styles'
import {useBackButton, useNavigation} from '@react-navigation/native'

export default function UserDetails({route}){
    const  navigation = useNavigation()
    const initialState = {
        id:'',
        name:'',
        phone:'',
        email:'',
        password:''
    }

    const[client,seClient] = useState(initialState)
    const [loading,setLoading] = useState(true) //Defina se o indicador de carregamento é mostrado.

const updateUser = async () => {
    if (client.name === "" || client.email === '' || client.password === '' || client.phone === "") {
        alert("Please, provide a value");
    } else {
        try {
            const clientT = firebase.firebase.auth().currentUser;
            const newPass = client.password
            const newEmail = client.email
            clientT.updateEmail(newEmail).then(function(){
                clientT.updatePassword(newPass).then(function(){
                    const upRef = firebase.db.collection("clients").doc(route.params?.id);
                     upRef.set({
                        name: client.name,
                        phone: client.phone,
                    });
                    seClient(initialState);
                    alert("Updated successfully ");
                })
            })
        } catch (e) {
            alert("Update error,try again");
            console.log("Cause of the error ", e);
        }
    }
};

const deleteUser = async () => {
    try {
        const client = firebase.firebase.auth().currentUser
        client.delete().then(function(){
                    
        const removeLink = firebase.db.collection("clients").doc(route.params?.id);
         removeLink.delete();
        alert("Removed");
        navigation.goBack()
        })
    } catch (e) {
        alert("Removal error,try again");
    }
};

 const handleChangeText =(name,value) =>{
     seClient({...client,[name]:value})
     if(loading){
         return(
             <View>
                 <ActivityIndicator size = "large" color="#A9A9A9" />
             </View>
         )
     }
 }  

return(
    <View>
        <Text>Welcome {route.params?.name}</Text>
          <TextInput style= {style.input} placeholder={'Name'}  value ={client.name} onChangeText ={(value)=> handleChangeText('name',value)}></TextInput>
          <TextInput style = {style.input} placeholder={'Phone'} value={client.phone} onChangeText={(value)=>handleChangeText('phone',value)}></TextInput>
          <TextInput style = {style.input} placeholder={'Email'} value={client.email} onChangeText={(value)=>handleChangeText('email',value)}></TextInput>
          <TextInput style = {style.input} placeholder={'Password'} value={client.password} onChangeText={(value)=>handleChangeText('password',value)}></TextInput>

                   <TouchableOpacity onPress={()=>updateUser()}>
                      <Text style ={style.buttonUpd}>UPDATE</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>deleteUser()}>
                     <Text style ={style.buttonDel}>DELETE</Text>
                   </TouchableOpacity>
    </View>
)
}