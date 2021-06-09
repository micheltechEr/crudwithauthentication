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
        phone:''
    }

    const[client,seClient] = useState(initialState)
    const [loading,setLoading] = useState(true) //Defina se o indicador de carregamento é mostrado.

const updateUser = async () => {
    if (client.name === "" || client.phone === "") {
        alert("Please, provide a value");
    } else {
        try {
            const upRef = firebase.db.collection("clients").doc(route.params?.id);
            await upRef.set({
                name: client.name,
                phone: client.phone,
            });
            seClient(initialState);
            alert("Updated successfully ");
        } catch (e) {
            alert("Update error,try again");
            console.log("Cause of the error ", e);
        }
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
                   <TouchableOpacity onPress={()=>updateUser()}>
                      <Text style ={style.buttonUpd}>UPDATE</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>deleteUser()}>
                     <Text style ={style.buttonDel}>DELETE</Text>
                   </TouchableOpacity>
    </View>
)
}