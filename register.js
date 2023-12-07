// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4vkPVUjbqnGAoDGmXLFYm5WOuR4-PhyQ",
  authDomain: "dgl-409.firebaseapp.com",
  databaseURL: "https://dgl-409-default-rtdb.firebaseio.com",
  projectId: "dgl-409",
  storageBucket: "dgl-409.appspot.com",
  messagingSenderId: "587821176763",
  appId: "1:587821176763:web:e9e9a293cd59725320969e",
  measurementId: "G-QSD6CP8DG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);

let EmailInp = document.getElementById('emailInp');
let PassInp = document.getElementById('passwordInp');
let FnameInp = document.getElementById('fnameInp');
let LnameInp = document.getElementById('lnameInp');
let mainForm = document.getElementById('MainForm');

function RegisterUser(evt){
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
    .then(async(credentials)=>{
        console.log("Hello!");
        var ref = doc(db,"UserAuthList",credentials.user.uid)
        await setDoc(ref,{
            firstname: FnameInp.value,
            lastname: LnameInp.value
        })
        alert("User Added Successfully")
        
    })
    .catch((error)=>{
        alert(error.message);
        console.log(error.code);
        console.log(error.message);

    })
   
}
mainForm.addEventListener('submit', RegisterUser);