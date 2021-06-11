import { StyleSheet } from 'react-native'; 
const style = StyleSheet.create({
   container:{
    backgroundColor:'#E0FFFF',
    flex:1,
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


startButton:{
    backgroundColor:'#A4C8B2',
    width:150,
    height:40,
    textAlign:'center',
    paddingTop:10,
    borderRadius:20,
    marginHorizontal:105,
    marginVertical:220,
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
    marginTop:2,
    marginBottom: 25
},

createClientModal:{
    backgroundColor:'#008B8B',
    flex:1
},
createClientDatas:{
    backgroundColor:'#F5F5DC',
    borderWidth:2,
    borderColor:'transparent',
    width:270,
    marginTop:70,
    marginLeft:50,
    alignItems:'center',
    paddingVertical:40,
    borderRadius:25
},

changeClients:{
    backgroundColor:'#DCDCDC',
    borderWidth:2,
    borderColor:'transparent',
    width:270,
    height:420,
    marginTop:120,
    marginLeft:50,
    alignItems:'center',
    paddingVertical:20,
    borderRadius:25
},

buttonUpd:{
    backgroundColor:'#FF8C00',
    marginStart:-120
},

buttonDel:{
    backgroundColor:'#FF0000',
    marginEnd:-120,
    marginTop:-40
},

showUserManager:{
    textAlign:'center',
    paddingTop:20,
    backgroundColor:'#008B8B',
    width:120,
    marginTop:60,
    marginBottom:20,
    marginHorizontal:120,
    color:'#FFF',
    fontWeight:'700',
    borderRadius:5,
    height:60
},
list:{
    backgroundColor:'#D8BFD8',
    marginLeft:30,
    borderRadius:10,
    marginTop:40,
    height:310,
    width:300
},

userList:{
    textAlign:'center',
    fontSize:13
},

headerList:{
    fontWeight:'700',
    borderColor:'#B483B4',
    borderWidth:2,
    textAlign:'center',
    marginBottom:10,
    marginTop:6,
    fontSize:22
},

detailScreen:{
    flex:1,
    backgroundColor:'#BFD8D8'
},
logoutIcon:{
    width:25,
    height:25,
    marginHorizontal:320,
    marginTop:5
}
})
export default style