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
        phone:""
    })
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
                        return  firebase.db.collection("clients").doc(cred.user.uid).set({
                            name: state.name,
                            phone: state.phone,
                        });
                    });
                alert("Saved");
                navigation.goBack();
            }
        } catch (e) {
            alert("Insertion error,try again");
            console.log(e);
        }
    };
    

    return(
        <View>
          <View style={style.container} >
            <TextInput style={style.input}  placeholder={'Name'}  onChangeText ={(value)=> handleChangeText('name',value)} ></TextInput>
            <TextInput   style={style.input} placeholder={'Email'} autoCompleteType={'email'} onChangeText ={(value)=> handleChangeText('email',value)}></TextInput>
            <TextInput   style={style.input}  placeholder={'Passowrd'} autoCompleteType={'password'}  onChangeText ={(value)=> handleChangeText('password',value)}></TextInput>
            <TextInput  style={style.input} placeholder={'Phone'} autoCompleteType={'tel'} onChangeText ={(value)=> handleChangeText('phone',value)}></TextInput>
            
            <SafeAreaView  style={style.buttonSave} > 
            <Button color='#E21212' onPress={saveNewUser} title={'SAVE'}> </Button>
            </SafeAreaView>
            
            <SafeAreaView  style={style.cancelButton} > 
            <Button color='#CDCBCB'  title={'CANCEL'}> </Button>
            </SafeAreaView>
         </View>
         <View>
         </View>
        </View>
 
        
    )
}