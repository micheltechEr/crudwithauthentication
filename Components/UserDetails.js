import React,{useState} from 'react'
import {View,Text ,TextInput,SectionList,Alert} from 'react-native'
import firebase from './firebase'
import style from './styles'
import { Modal } from 'react-native'
import DatePicker from 'react-native-datepicker';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements/dist/buttons/Button'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function UserDetails({route}){
    const navigation = useNavigation()
    const initialState = {
        id:'',
        name:'',
        phone:'',
        email:'',
        password:''
    }

    const[client,seClient] = useState(initialState)
    const [bornDate,setDate] = useState(new Date(Date.now()));

    const reload = ()=>{
        navigation.reset({
            index:0,
            routes: [{ name: "Home" }],
        })
    }
    const goBack = ()=>{
        navigation.goBack()
    }

const updateUser =  () => {
    if (client.name === "" || client.email === '' || client.password === '' || client.phone === "") {
        Alert.alert("Please, provide a value");
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
                        bornDate: bornDate
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

const deleteUser =  () => {
    try {
        const client = firebase.firebase.auth().currentUser
        client.delete().then(function(){
        const removeLink = firebase.db.collection("clients").doc(route.params?.id);
         removeLink.delete();
        alert("Removed sucessfully");
        })
    } catch (e) {
        alert("Removal error,try again");
    }
};

 const handleChangeText =(name,value) =>{
     seClient({...client,[name]:value})
   
 }  
 const clientDatas = [
    {
        title:'User Information',
        data:[route.params?.name]
    },
    {
        title:'User Contact',
        data:[route.params?.phone,route.params?.email]
    }
];
const User = ({ title }) => (
    <View >
      <Text>{title}</Text>
    </View>
  );
return(
    <View style={style.container}>
        <SectionList  
         sections={clientDatas}  
         renderItem={({ user }) => <User title={user} /> }
          keyExtractor={(user, index) => user + index}
         renderSectionHeader={({ section: { title } }) => (
        <Text>{title}</Text>
             )} 
      />
        <Modal animationType={'slide'}  transparent={true}  visible={true} >
        <View style={style.changeClients}>
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
                  <SafeAreaView style={style.buttonUpd}>
                  <Button title={'UPDATE'} color='#FF8C00' onPress={()=>{updateUser(),goBack(),reload()}}/>
                  </SafeAreaView>

                  <SafeAreaView style={style.buttonDel}>
                  <Button title={'DELETE'}   onPress={()=>{deleteUser(),goBack(),reload()}}/>
                  </SafeAreaView>
             </View>
        </Modal>
    </View>
)
}