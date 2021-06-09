import React, { useEffect,useState} from 'react'
import firebase from './firebase'
import {View,Text, TouchableOpacity, } from 'react-native'
import {ListItem} from 'react-native-elements'


export default function ListUsers (props) {
    

    
return(
      <View>
          {
            users.map(user =>{
              return(
                <ListItem
                 key = {user.id}
                 bottomDivider onPress ={()=>{ navigation.navigate('UsersDetails',{
                  userId:user.id})}}
                >
                  <ListItem.Chevron />
                  <ListItem.Content>                 
                    <ListItem.Title>{user.name}</ListItem.Title>
                    </ListItem.Content>   
                </ListItem>
              )
            })
          }
      </View>
        )
}