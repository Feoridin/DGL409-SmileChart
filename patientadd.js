"use strict";
var masterindex;
export {masterindex};
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
    //const recentPostRef = query(ref(db,"Patient"), limitToLast(100));
    const recentPostRef =ref(db,"Patient");
    onValue(recentPostRef, (snapshot) => {
        var patients = []
        snapshot.forEach((childSnapshot) => {
            patients.push(childSnapshot.val())
            /* Clear the existing table content - Before inserting new rows into the table, 
            we clear the existing content within the table body using a while loop to remove all child elements.*/
            while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
            }

            for (var i = 0; i < patients.length; i++) {
            var row = tableBody.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            var cell7 = row.insertCell(6);  // Add a cell for the button
            var cell8 = row.insertCell(7);  // Add a cell for the button


            cell1.innerHTML = patients[i].PatientID;
            cell2.innerHTML = patients[i].PatientFirstName;
            cell3.innerHTML = patients[i].PatientLastName;
            cell4.innerHTML = patients[i].Contact;
            cell5.innerHTML = patients[i].Email;
            cell6.innerHTML = patients[i].Gender;

            // Create a Bootstrap button element and add it to the last cell
        var button = document.createElement("button");
        var buttonImage = document.createElement("button");
        buttonImage.setAttribute("type","button");
        button.setAttribute("type","button"); // Add a class for styling
        button.setAttribute("data-toggle","modal");
        button.setAttribute("data-target","#exampleModalCenter");
        button.classList.add("btn","w3-round", "w3-teal", "w3-hover-border-orange"); // Add a class for styling
        buttonImage.classList.add("btn","w3-round", "w3-teal", "w3-hover-border-orange"); // Add a class for styling
        //cell6.appendChild(button);
        //cell7.appendChild(buttonImage);
        button.innerHTML = "Edit"; // Set the button text
        buttonImage.innerHTML = "Image";
        // Add a click event listener to the button and pass the row index
        button.addEventListener("click", function (index) {
        return function () {
            editPatient(index);
            console.log(index);
        };
    }(i));
    
    buttonImage.addEventListener("click", function (index) {
      
      
      
        return function () {
            //window.location.href="canvas.html"
            editPatient(index);
            masterindex = index+1;
            
            showPatientName();
        };   
    }(i));
        cell7.appendChild(button);
        cell8.appendChild(buttonImage); // button in the last cell
        }
        })
     
    })
        // Get a reference to the table body
        var tableBody = document.getElementById("myTable").getElementsByTagName('tbody')[0];
        
    function editPatient(rowIndex){
         patientIdrow = rowIndex+1;
         SelectData();
         
        }
//--------References--------------//
        var patientid = document.getElementById("idBox");
        var fname = document.getElementById("firstName");
        var lname = document.getElementById("lastName");
        var contact = document.getElementById("contactBox");
        var email = document.getElementById("emailBox");
        var genbox = document.getElementById("GenBox");
        var patientIdrow = 0;

        var updbtn = document.getElementById("updateButton");
        var clrbtn = document.getElementById("clearButton");
        var addbtn = document.getElementById("addBtn");
        var savebtn = document.getElementById("updateButton2");
        
    function SelectData(){
    const dbref = ref(db);
    var button2 = document.getElementById("updateButton")
    var button3 = document.getElementById("updateButton2")
    button3.setAttribute("hidden","hidden");
    button2.removeAttribute("hidden");
    get(child(dbref,"Patient/"+patientIdrow)).then((snapshot)=>{
        if(snapshot.exists()){
            patientid.value = snapshot.val().PatientID;
            fname.value = snapshot.val().PatientFirstName;
            lname.value = snapshot.val().PatientLastName;
            contact.value = snapshot.val().Contact;
            email.value = snapshot.val().Email;
            genbox.value = snapshot.val().Gender; 
        }
        else{
            alert("No Data Found");
        }
    })
    .catch((error)=>{
    alert("unsuccesful, error"+error);
    })
    }
    //--------UPDATE DATA FUNCTION--------------//
    function UpdateData(){
    const dbref = ref(db);
    update(ref(db, "Patient/"+patientIdrow),{
                PatientFirstName: fname.value,
                PatientLastName: lname.value,
                Contact: contact.value,
                Email: email.value,
                Gender: genbox.value,
            })
            .then(()=>{
                alert("data stored successfully");
            })
            .catch((error)=>{
                alert("unsuccessful, error"+error);
            });
        }
//-------CLEAR FORM FUNCTION--------------//
function ClearForm(){
    const dbref = ref(db);
    document.getElementById("myForm").reset();
    console.log(patientIdrow);
    get(child(dbref,"Patient/"+patientIdrow)).then((snapshot)=>{
        if(snapshot.exists()){
            patientid.value = snapshot.val().PatientID;
        }
    })
}
//-------SEARCH FUNCTION--------------//
var searchbar = document.getElementById("searchBar");
var searchbtn = document.getElementById("searchBtn");

function SearchTable(){
    
    var input, filter, table, tr, td, i, txtValue, td2, category;
    input = document.getElementById("searchBar");
    category = document.getElementById("Category")
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

  
  if (category.value === "By First Name"){
    
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      }  else {
        tr[i].style.display = "none";
      }
    }       
  }
}
if (category.value === "By Last Name"){
    
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
if (category.value === "By Patient ID"){
    
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
}
//--------ADD PATIENT FUNCTION------------------//
function AddPatient(){
    const dbref = ref(db);
    var patients = [];
    var patientIdNumber;
    var pnumber = document.getElementById("idBox")
    var button2 = document.getElementById("updateButton")
    var button3 = document.getElementById("updateButton2")
    button2.setAttribute("hidden","hidden");
    button3.removeAttribute("hidden");
    
    onValue(recentPostRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            patients.push(childSnapshot.val())
            patientIdNumber = patients.length+1;
            patientid = patientIdNumber.value;
            pnumber.setAttribute("value",patientIdNumber);
            pnumber.setAttribute("placeholder",patientIdNumber+1);
        })
        console.log(patientIdNumber);
          
    })
    
    
    
        }
//--------SAVE PATIENT FUNCTION------------------//
function SavePatient(){
    const dbref = ref(db);
    var pnumber = document.getElementById("idBox")
    var patientid = pnumber;
    console.log(patientid.value);
    set(ref(db, "Patient/"+patientid.value),{
                PatientID: patientid.value,
                PatientFirstName: fname.value,
                PatientLastName: lname.value,
                Contact: contact.value,
                Email: email.value,
                Gender: genbox.value
            })
            .then(()=>{
                alert("data stored successfully");
                
            })
            .catch((error)=>{
                alert("unsuccessful, error"+error);
            });
        }


//--------ASSIGN EVENTS TO BUTTONS--------------//
        updbtn.addEventListener('click',UpdateData);
        clrbtn.addEventListener('click',ClearForm);
        searchbtn.addEventListener('click',SearchTable);
        addbtn.addEventListener('click',AddPatient);
        savebtn.addEventListener('click',SavePatient);
        
 // Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}
function showPatientName(){
  window.location.href="canvas.html"
  console.log(masterindex);
      console.log("Hello");
      set(ref(db, "Selected/"),{
        PatientID: masterindex
    })
}

        
  