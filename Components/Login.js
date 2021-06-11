import React, { useState} from 'react'
import {View,Text, TouchableOpacity,  LogBox} from 'react-native'
import { TextInput } from 'react-native'
import style from './styles'
import { Modal } from 'react-native'
import { Button } from 'react-native'
import { SafeAreaView } from 'react-native'
import firebase from './firebase'
import { validate } from 'validate.js';
import constraints from './constraingt';
import { useIsFocused } from '@react-navigation/native';
import { ClientContext } from './ClientContext'


export default function Home({navigation}){
    LogBox.ignoreAllLogs()
    const isFocused = useIsFocused();
    const initialState={
        id:'',
        name:'',
        email :'',
        password:'',
    }
    const[client,setClient] = useState(ClientContext)
    const [visible,setVisible] = useState(ClientContext)
        const handleChangeText =(name,value) =>{
        setClient({...client,[name]:value})
    }
    const createNewUser=()=>{
        navigation.navigate('CreateNewUser')
    }

    const changeModal = ()=>{
            setVisible(true)
    }

    const login = async () => {
            if (client.email === "" || client.password === "") {
                alert("Provide a value");
            } else {
                const validationResult = validate(client.email, constraints);
                setClient({ errors: validationResult });
                firebase.firebase
                    .auth()
                    .signInWithEmailAndPassword(client.email, client.password)
                    .then(async (data) => {
                       await alert("Sucess");
                        const uid = data.user.uid; 
                        const doc = await (await firebase.firebase.firestore().doc(`clients/${uid}`).get()).data().name;
                        const docPhone = await (await firebase.firebase.firestore().doc(`clients/${uid}`).get()).data().phone;
                        const docBirthDay = await (await firebase.firebase.firestore().doc(`clients/${uid}`).get()).data().date;

                         navigation.navigate("UserDetails", { id: uid, name: doc,phone:docPhone,date:docBirthDay,email:client.email,password:client.password});
                    })
                    .catch((error) => {
                        alert(error + " .Please provide correct credentials");
                    });
            }
    };

 
    return(
         <View style={style.loginBackground}>
                 <TouchableOpacity onPress={()=>{changeModal()}}>
                     <Text style={style.startButton}>START</Text>
                 </TouchableOpacity>                
             <Modal animationType={'slide'} transparent={true} visible={visible} >
             <View  style={style.loginModal}>
                 <TextInput placeholder={'Email'} style={style.inputModal} autoCompleteType={'email'}  onChangeText ={ (value)=> handleChangeText('email',value)} ></TextInput>
                 <TextInput placeholder={'Password'} style={style.inputModal} autoCompleteType={'password'} secureTextEntry={true}  onChangeText ={(value)=> handleChangeText('password',value)}></TextInput>
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
