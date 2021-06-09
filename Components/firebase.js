import firebase from 'firebase'
import 'firebase/firestore'
var firebaseConfig = {
    apiKey: "AIzaSyBouGpW0XbdaT8wiRsj1S7Z8X4_qJsXndA",
    authDomain: "autocleancrud.firebaseapp.com",
    projectId: "autocleancrud",
    storageBucket: "autocleancrud.appspot.com",
    messagingSenderId: "19716659917",
    appId: "1:19716659917:web:552c3ac8edcca9fe10a784",
    measurementId: "G-90ZY4FGB7L"
  };
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  export default  {
firebase,
db
  }