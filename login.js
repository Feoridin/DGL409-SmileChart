// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
let mainForm = document.getElementById('MainForm');


function SignInUser(evt){
    evt.preventDefault();
    console.log("Hello!");
    signInWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
    .then(async(credentials)=>{
        console.log(credentials);
        var ref = doc(db,"UserAuthList",credentials.user.uid);
        const docSnap = await getDoc(ref);

        if(docSnap.exists()){
            sessionStorage.setItem("user-info", JSON.stringify({
                firstname: docSnap.data().firstname,
                lastname: docSnap.data().lastname,
            }))
            sessionStorage.setItem("user-creds",JSON.stringify(credentials.user));
            window.location.href = "addpatient.html";
        }
    })
    .catch((error)=>{
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
   
}
mainForm.addEventListener('submit', SignInUser);
