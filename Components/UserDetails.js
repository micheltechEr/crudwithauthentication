import React, {useState } from 'react'
import {View,Text ,TextInput, TouchableOpacity,Alert} from 'react-native'
import firebase from './firebase'
import style from './styles'
import {useNavigation} from '@react-navigation/native'
import DatePicker from 'react-native-datepicker';

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
    const [bornDate,setDate] = useState(new Date(Date.now()));

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
                        bornDate: date
                    });
                    seClient(initialState);
                    alert("Updated successfully ");
                    navigation.goBack()
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
   
 }  

return(
    <View>
        <View style={style.container}>
        <Text>Welcome {route.params?.name}</Text>
        <Text>Name</Text>
          <TextInput style= {style.input} placeholder={'Name'}  value ={client.name} onChangeText ={(value)=> handleChangeText('name',value)}></TextInput>
          <Text>Phone</Text>
          <TextInput style = {style.input} placeholder={'Phone'} value={client.phone} onChangeText={(value)=>handleChangeText('phone',value)}></TextInput>
          <Text>Email</Text>
          <TextInput style = {style.input} placeholder={'Email'} value={client.email} onChangeText={(value)=>handleChangeText('email',value)}></TextInput>
          <Text>Password</Text>
          <TextInput style = {style.input} placeholder={'Password'} value={client.password} onChangeText={(value)=>handleChangeText('password',value)}></TextInput>

          <DatePicker
            style={style.datePicker}
             date={bornDate}
             mode='date'
             locale={'en'}
             format='DD-MM-YYYY'
             maxDate='31-12-2021'
             confirmBtnText='Confirm'
             cancelBtnText='Cancel'
             onDateChange = {(date)=>{
                 setDate(date)
                 handleChangeText('date',date)
             }}
            />

                   <TouchableOpacity  onPress={()=>updateUser()}>
                      <Text style ={style.buttonUpd}>UPDATE</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>deleteUser()}>
                     <Text style ={style.buttonDel}>DELETE</Text>
                   </TouchableOpacity>
        </View>
    </View>
)
}