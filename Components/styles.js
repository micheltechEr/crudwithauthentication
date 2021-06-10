import { StyleSheet } from 'react-native'; 
const style = StyleSheet.create({
   container:{
       width:'100%',
       alignItems:'center',
       paddingTop:60
   },
   input:{
       borderBottomColor:'gray',
       borderLeftColor:'transparent',
       borderRightColor:'transparent',
       borderTopColor:'transparent',
       borderStyle:'solid',
       borderWidth:0.35,
       marginBottom:20,
       width:210,
},
buttonSave:{
    width:90,
    marginStart:120,

},
cancelButton:{
    width:90,
    marginStart:-120,
    marginTop:-37
},

carWashMan:{
    height:95,
    width:115,
    marginLeft:20,
    marginVertical:-55,
    marginBottom:10,
},

loginModal:{
    backgroundColor:'#226C9E',
    borderWidth:2,
    borderColor:'transparent',
    width:270,
    marginTop:180,
    marginLeft:50,
    alignItems:'center',
    paddingVertical:40,
    borderRadius:25
},

inputModal:{
    backgroundColor:'#FFFF',
    width:200,
    height:40,
    borderRadius:6.5,
    borderColor:'#FFFF',
    marginBottom:10,
    borderWidth:0.35,

},

loginButton:{
    marginBottom:10,
    paddingTop:10,
    width:200,
    borderRadius:50
},

loginBackground:{
    backgroundColor:'#A5AFA9',
    flex:1
},

signInStyle:{
    color:'#FFFF',
},

titleHome:{
    color:'#FFFF',
    fontSize:30,
    marginHorizontal:110,
    marginVertical:40,
    width:200
},

startButton:{
    backgroundColor:'#A4C8B2',
    width:150,
    height:40,
    textAlign:'center',
    paddingTop:10,
    borderRadius:20,
    marginHorizontal:105,
    marginVertical:80,
    color:'#FFFF',
    fontSize:15
},

closeModal:{
    color:'#FFFF',
    marginTop:-215,
    marginLeft:300,
    backgroundColor:'gray',
    width:30,
    height:30,
    borderRadius:30,
    fontSize:20,
    textAlign:'center'
},
datePicker:{
    marginTop:15,
    marginBottom: 25
},

})
export default style