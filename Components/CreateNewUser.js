import React,{useState} from 'react'
import firebase from './firebase'
import {View,Text, TextInput, TouchableOpacity, Modal, Image, Button, SafeAreaView} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import style from './styles'
import { validate } from 'validate.js';
import constraints from './constraingt';
import DatePicker from 'react-native-datepicker';

export default function CreateNewUser(){
    const  navigation = useNavigation()
    const [state,setState] = useState({ 
        name :"",
        email :"",
        password:"",
        phone:"",
    })
     const [date,setDate] = useState(new Date(Date.now()));
    const handleChangeText =(name,value) =>{
        setState({...state,[name]:value})
    }
    const saveNewUser = async () => {
        try {
            if (state.name === "" || state.email === "" || state.password === "" || state.phone === "") {
                alert("Provide a value");
            } else {
                const validationResult = validate(state.email, constraints);
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
                            alert(error)
                        })
                        return  firebase.db.collection("clients").doc(cred.user.uid).set({
                            name: state.name,
                            phone: state.phone,
                            date:date
                        })
                    })
                   
                alert("Saved");
                navigation.goBack();
            }
        } catch (e) {
            alert("Insertion error,try again"+e);
            console.log(e);
        }
    };
    

    return(
        <View>
          <View style={style.container} >
              <Text>Name</Text>
            <TextInput style={style.input}  placeholder={'Name'}  onChangeText ={(value)=> handleChangeText('name',value)} ></TextInput>
            <Text>Email</Text>
            <TextInput   style={style.input} placeholder={'Email'} autoCompleteType={'email'} onChangeText ={(value)=> handleChangeText('email',value)}></TextInput>
            <Text>Password</Text>
            <TextInput   style={style.input}  placeholder={'Passowrd'} autoCompleteType={'password'} secureTextEntry={true} onChangeText ={(value)=> handleChangeText('password',value)}></TextInput>
            <Text>Phone</Text>
            <TextInput  style={style.input} placeholder={'Phone'} autoCompleteType={'tel'} onChangeText ={(value)=> handleChangeText('phone',value)}></TextInput>
            <Text>Date</Text>
            <DatePicker
            style={style.datePicker}
             date={date}
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
            <SafeAreaView  style={style.buttonSave} > 
            <Button color='#E21212' onPress={saveNewUser} title={'SAVE'}> </Button>
            </SafeAreaView>
            
            <SafeAreaView  style={style.cancelButton} > 
            <Button color='#CDCBCB' onPress={()=>{navigation.goBack()}}  title={'CANCEL'}> </Button>
            </SafeAreaView>
         </View>
         <View>
         </View>
        </View>
 
        
    )
}