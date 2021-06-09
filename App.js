import React from 'react';
import CreateNewUser from './Components/CreateNewUser'
import Home from './Components/Login'
import UserDetails from './Components/UserDetails'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
const Stack =  createStackNavigator()
function MyStack(){

  return(
    <Stack.Navigator>
              <Stack.Screen  name = 'Home' component = {Home} options={{title:'Home'}}/>
              <Stack.Screen  name = 'CreateNewUser'component = {CreateNewUser} options={{title:'Create New User'}}/>
              <Stack.Screen  name = 'UserDetails'component = {UserDetails} options={{title:'Users Details'}}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}