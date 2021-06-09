import React, {useEffect, useState} from 'react'
import {View,Text, TouchableOpacity, } from 'react-native'
import { TextInput } from 'react-native'
import style from './styles'
import { Modal } from 'react-native'
import { Button } from 'react-native'
import { SafeAreaView } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import firebase from './firebase'
import { validate } from 'validate.js';
import constraints from './constraingt';

export default function Home(){
    const  navigation = useNavigation()
    const[visible,setVisible] = useState(false)
    const [state,setState] = useState({
        id:'',
        name:'',
        email :'',
        password:'',
    })
    const handleChangeText =(name,value) =>{
        setState({...state,[name]:value})
    }
    const createNewUser=()=>{
        navigation.navigate('CreateNewUser')
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
                    navigation.navigate("UserDetails", { id: uid, name: doc });
                })
                .catch((error) => {
                    alert(error + " .Please provide correct credentials");
                });
        }
    };

    return(
         <View style={style.loginBackground}>
             <Text style={style.titleHome}>YARD SHOP </Text>

             <TouchableOpacity onPress={()=>setVisible(true)}>
                 <Text style={style.startButton}>START</Text>
             </TouchableOpacity>                 
             <Modal animationType={'slide'} transparent={true} visible={visible} >

             <View  style={style.loginModal}>
                 <TextInput placeholder={'Email'} style={style.inputModal} autoCompleteType={'email'}  onChangeText ={ (value)=> handleChangeText('email',value)} ></TextInput>
                 <TextInput placeholder={'Password'} style={style.inputModal} autoCompleteType={'password'}  onChangeText ={(value)=> handleChangeText('password',value)}></TextInput>
                 <SafeAreaView style={style.loginButton}>
                 <Button  title={'LOGIN'} onPress={()=>login()} ></Button>
                 </SafeAreaView>

                 <TouchableOpacity onPress={createNewUser}>
                 <Text style={style.signInStyle}>Sign in </Text>
                 </TouchableOpacity>
             </View>
             </Modal>
         </View>
    )
    }
