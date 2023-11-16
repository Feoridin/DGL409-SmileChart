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
 firebase.initializeApp(firebaseConfig);
 import {getDatabase, ref, get, set, child, update, remove, query, limitToLast, onValue, onChildAdded, onChildChanged}
 from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
 import {getStorage, ref as sRef, uploadBytesResumable, getDownloadURL}
 from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";
 const db = getDatabase(app);
 const dbref = ref(db);
 var patientid = document.getElementById("patientidName");
 var patientname = document.getElementById("patientName");
 
 get(child(dbref,"Selected")).then((snapshot)=>{
    if(snapshot.exists()){
        patientid.value = snapshot.val().PatientID;
        console.log(patientid.value);
        get(child(dbref,"Patient/"+patientid.value)).then((snapshot)=>{
            if(snapshot.exists()){
                patientname.value = snapshot.val().PatientFirstName +" "+  snapshot.val().PatientLastName; 
            }
            
        });
//-------UPLOADING FILE IN STORAGE------------//
        var uploadbtn = document.getElementById("upload");
        uploadbtn.addEventListener("click",uploadimage);

        
        //document.getElementById(
            //'contactForm').addEventListener('submit', submitForm);
        
        function uploadimage(){
        var type = getInputVal('types');
        var storage = firebase.storage();
        var file=document.getElementById("files").files[0];
        var storageref=storage.ref();
        var thisref=storageref.child(type).child(file.name).put(file);
        thisref.on('state_changed',function(snapshot) {
        
        
        }, function(error) {
        
        }, function() {
        // Uploaded completed successfully, now we can get the download URL
        thisref.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            //getting url of image
            document.getElementById("url").value=downloadURL;
            alert('uploaded successfully');
            saveMessage(downloadURL);
        });
        });
        
        // Get values
        //var url = getInputVal('url');
        // Save message
        // saveMessage(url);
        }
        //function getInputVal(id){
         //   document.getElementById('contactForm').reset();
        
        //}
        
        
        // Function to get form values
        function getInputVal(id){
        return document.getElementById(id).value;
        }
        
        // Save message to firebase database
        
        function saveMessage(url){
            set(ref(db, "Patient/"+patientid.value+"/Images"),{
                imageurl:url
            })
        }
        

    }
    else{
        alert("No Data Found");
    }
})
.catch((error)=>{
alert("unsuccesful, error"+error);
});








