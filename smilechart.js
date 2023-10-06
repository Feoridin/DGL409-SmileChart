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
//Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyC4vkPVUjbqnGAoDGmXLFYm5WOuR4-PhyQ",
    authDomain: "dgl-409.firebaseapp.com",
    databaseURL: "https://dgl-409-default-rtdb.firebaseio.com",
    projectId: "dgl-409",
    storageBucket: "dgl-409.appspot.com",
    messagingSenderId: "587821176763",
    appId: "1:587821176763:web:e9e9a293cd59725320969e",
    measurementId: "G-QSD6CP8DG3"
    };
firebase.initializeApp(firebaseConfig);
//uploading file in storage
    function uploadImage(){
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
    var url = getInputVal('url');
 // Save message
 // saveMessage(url);
    }
    function getInputVal(id){
   document.getElementById('contactForm').reset();}

// Function to get form values
    function getInputVal(id){
    return document.getElementById(id).value;
    }

// Save message to firebase database
    function saveMessage(url){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
    imageurl:url,
     });
    }
//Disply images references
    const uploadButton = document.getElementById('upload');
// Reference to Firebase Storage
    const storage2 = firebase.storage();
// Reference to the folder where your images are stored
    const imagesRef = storage2.ref("Teeth/");
// Function to fetch and display images
    function displayImages() {
        imagesRef.listAll().then(function (result) {
            result.items.forEach(function (imageRef) {
                // Get the download URL for each image
                imageRef.getDownloadURL().then(function (url) {
                    const imageElement = document.createElement("img");
                    imageElement.src = url;
                    document.getElementById("image-container").appendChild(imageElement);
                    console.log(imageElement);
                }).catch(function (error) {
                    console.error("Error getting download URL:", error);
                });
            });
           
        }).catch(function (error) {
            console.error("Error listing images:", error);
        });
    }
// Call the function to display images
    uploadButton.addEventListener("click",function(){
        displayImages();
    });
   
//Canvas Function
const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
    
});

const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX - canvas.offsetLeft;
    startY = e.clientY -  1000;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

 


