



 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
    
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

 import {getDatabase, ref, get, set, child, update, remove, query, limitToLast, onValue, onChildAdded, onChildChanged}
 from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
 import {getStorage, ref as sRef, uploadBytesResumable, getDownloadURL}
 from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";
 const db = getDatabase(app);
 const dbref = ref(db);
 var patientid = document.getElementById("patientidName");
 var patientname = document.getElementById("patientName");
 
 get(child(dbref,"Selected")).then((snapshot)=>{
    var patientname2;
    if(snapshot.exists()){
        patientid.value = snapshot.val().PatientID;
        get(child(dbref,"Patient/"+patientid.value)).then((snapshot)=>{
            if(snapshot.exists()){
                patientname.value = snapshot.val().PatientFirstName +" "+  snapshot.val().PatientLastName; 
            }
            else{
                alert("No Data Found");
            }
        })
        .catch((error)=>{
        alert("unsuccesful, error"+error);
        });   
    }
    else{
        alert("No Data Found");
    }
})
.catch((error)=>{
alert("unsuccesful, error"+error);
});






