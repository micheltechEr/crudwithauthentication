import React,{useState} from 'react'
import firebase from './firebase'
import {View,Text, TextInput, Modal, Button, SafeAreaView, Alert,LogBox} from 'react-native'
import style from './styles'
import { validate } from 'validate.js';
import constraints from './constraingt';
import DatePicker from 'react-native-datepicker';


export default function CreateNewUser({navigation}){
    LogBox.ignoreAllLogs()
    const [state,setState] = useState({ 
        name :"",
        email :"",
        password:"",
        phone:"",
        visible:true
    })
    const [date,setDate] = useState(new Date(Date.now()));

    const handleChangeText =(name,value) =>{
        setState({...state,[name]:value})
    }

    const goBack = ()=>{
        navigation.goBack()
    }
    const reload = ()=>{
        navigation.reset({
            index:0,
            routes: [{ name: "Home" }],
        })
    }
  
    const saveNewUser = async () => {
        try {
            if (state.name === "" || state.email === "" || state.password === "" || state.phone === "") {
                alert("Provide a value");
            } else {
                const validationResult=  validate(state.email, constraints);
                // validationResult is undefined if there are no errors
                setState({ errors: validationResult });
                await firebase.firebase
                    .auth()
                    .createUserWithEmailAndPassword(state.email, state.password)
                    .then((cred) => {
                        const client = firebase.firebase.auth().currentUser
                        client.sendEmailVerification().then(function(){
                            console.log('Sucess')
                        }).catch((error)=>{
                           Alert.alert(error)
                        })
                        return  firebase.db.collection("clients").doc(cred.user.uid).set({
                            name: state.name,
                            phone: state.phone,
                            date:date
                        })
                    })
                   
                 alert("Saved");
            }
        } catch (e) {
           alert(e);
        }
    };
    
    return(
            <View style = {style.createClientModal}>
              <Modal animationType={'fade'} transparent={true}  visible={state.visible}>
                <View style={style.createClientDatas}>
                  <Text>Name</Text>
                     <TextInput style={style.inputModal}  placeholder={'Name'}  autoCompleteType={'name'} onChangeText ={(value)=> handleChangeText('name',value)} ></TextInput>
                 <Text>Email</Text>
                     <TextInput   style={style.inputModal} placeholder={'Email'} autoCompleteType={'email'} onChangeText ={(value)=> handleChangeText('email',value)}></TextInput>
                <Text>Password</Text>
                    <TextInput   style={style.inputModal}  placeholder={'Password'} autoCompleteType={'password'} secureTextEntry={true} onChangeText ={(value)=> handleChangeText('password',value)}></TextInput>
                <Text>Phone</Text>
                   <TextInput  style={style.inputModal} placeholder={'Phone'} autoCompleteType={'tel'} onChangeText ={(value)=> handleChangeText('phone',value)}></TextInput>
                <Text>Date</Text>
                   <DatePicker
                   style={style.datePicker}
                   date={date}
                   mode='date'
                   format='DD-MM-YYYY'
                   maxDate='31-12-2021'
                   onDateChange = {(date)=>{
                   setDate(date)
                  handleChangeText('date',date)
             }}
            />
            <SafeAreaView  style={style.buttonSave} > 
            <Button color='#32CD32' onPress={()=>{saveNewUser(),goBack(),reload()}} title={'SAVE'}> </Button>
            </SafeAreaView>
            
            <SafeAreaView  style={style.cancelButton} > 
            <Button color='#CDCBCB'  onPress={()=>{goBack(),reload()}}  title={'CANCEL'}> </Button>
            </SafeAreaView>
                  </View>
              </Modal>       
                  </View>
    )
}