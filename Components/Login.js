import React, { useState} from 'react'
import {View,Text, TouchableOpacity,  } from 'react-native'
import { TextInput } from 'react-native'
import style from './styles'
import { Modal } from 'react-native'
import { Button } from 'react-native'
import { SafeAreaView } from 'react-native'
import firebase from './firebase'
import { validate } from 'validate.js';
import constraints from './constraingt';
import { useIsFocused } from '@react-navigation/native';


export default function Home({navigation}){
    const isFocused = useIsFocused();
    const [state,setState] = useState({
        id:'',
        name:'',
        email :'',
        password:'',
        visible:false,
    })


    const handleChangeText =(name,value) =>{
        setState({...state,[name]:value})
    }
    const createNewUser=()=>{
        navigation.navigate('CreateNewUser')
    }

    const changeState = ()=>{
        setState(true)
        console.log(state.visible)
    }


    const login = async () => {
        if (state.email === "" || state.password === "") {
            alert("Provide a value");
        } else {
            const validationResult = validate(state.email, constraints);
            setState({ errors: validationResult });
            firebase.firebase
                .auth()
                .signInWithEmailAndPassword(state.email, state.password)
                .then(async (data) => {
                    alert("Sucess");
                    const uid = data.user.uid; 
                    const doc = await (await firebase.firebase.firestore().doc(`clients/${uid}`).get()).data().name;
                    const docPhone = await (await firebase.firebase.firestore().doc(`clients/${uid}`).get()).data().phone;
                    const docBirthDay = await (await firebase.firebase.firestore().doc(`clients/${uid}`).get()).data().bornDate;
                     navigation.navigate("UserDetails", { id: uid, name: doc,phone:docPhone,bornDate:docBirthDay,email:state.email});
                })
                .catch((error) => {
                    alert(error + " .Please provide correct credentials");
                });
        }
    };

 
    return(
         <View style={style.loginBackground}>
             <Text style={style.titleHome}>YARD SHOP </Text> 

             <TouchableOpacity onPress={()=>changeState()}>
                 <Text style={style.startButton}>START</Text>
             </TouchableOpacity>                 
             <Modal animationType={'slide'} transparent={true} visible={state.visible} >

             <View  style={style.loginModal}>
                 <TextInput placeholder={'Email'} style={style.inputModal} autoCompleteType={'email'}  onChangeText ={ (value)=> handleChangeText('email',value)} ></TextInput>
                 <TextInput placeholder={'Password'} style={style.inputModal} autoCompleteType={'password'}  onChangeText ={(value)=> handleChangeText('password',value)}></TextInput>
                 <SafeAreaView style={style.loginButton}>
                 <Button  title={'LOGIN'} onPress={()=>login()} ></Button>
                 </SafeAreaView>

                 <TouchableOpacity onPress={()=>createNewUser()}>
                 <Text style={style.signInStyle}>Sign in </Text>
                 </TouchableOpacity>
             </View>
             </Modal>
         </View>
    )
    }
