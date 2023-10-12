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
    const uploadButton2 = document.getElementById('upload2');
    const clearButton = document.getElementById('clearUp');
    var imageDisplay = false;
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
                    imageElement.className = ('d-flex p-2 w-100');
                    imageElement.setAttribute('id','upImage');
                    imageElement.setAttribute('onclick',"document.getElementById('modal01').style.display='block'");
                    imageElement.src = url;
                    document.getElementById("image-container").appendChild(imageElement);
                    console.log(imageElement);
                    imageDisplay = true;            
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
        uploadImage();
    });
// Call the function to upload images
uploadButton2.addEventListener("click",function(){
    if(imageDisplay==true){
        clearAttribute();
    }
    displayImages();
});
clearButton.addEventListener("click",function(){
    clearAttribute();
    console.log(imageDisplay);
});
function clearAttribute(){
    const list = document.getElementById("image-container");

    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
 }
   
//Canvas Function
const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

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
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    prevMouseX = e.offsetX; // passing current mouseX position as prevMouseX value
    prevMouseY = e.offsetY; // passing current mouseY position as prevMouseY value
    ctx.beginPath(); // creating new path to draw
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

 //Blows up xray images when clicked
function showurl(){
    displayImages2();
    if(imageDisplay==true){
        clearAttribute2();
    }
    
              
}
function displayImages2() {
    imagesRef.listAll().then(function (result) {
        result.items.forEach(function (imageRef) {
            // Get the download URL for each image
            imageRef.getDownloadURL().then(function (url) {
                const imageElement = document.createElement("img");
                imageElement.className = ('d-flex p-2 w-100');
                imageElement.setAttribute('id','upImage');
                imageElement.src = url;
                document.getElementById("image-container2").appendChild(imageElement);
                imageDisplay = true;            
            }).catch(function (error) {
                console.error("Error getting download URL:", error);
            });
        });          
    }).catch(function (error) {
        console.error("Error listing images:", error);
    });
} 

function clearAttribute2(){
    const list = document.getElementById("image-container2");

    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
 }
//touchscreen
const viewport = window.visualViewport;
const context = canvas.getContext('2d');
function startup() {
    canvas.addEventListener('touchstart', handleStart);
    canvas.addEventListener('touchend', handleEnd);
    canvas.addEventListener('touchcancel', handleCancel);
    canvas.addEventListener('touchmove', handleMove);
  }
  
  document.addEventListener("DOMContentLoaded", startup);
  
  const ongoingTouches = [];
  
  function handleStart(evt) {
    evt.preventDefault();
    const touches = evt.changedTouches;
    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;
    console.log(offsetX, offsetY)
    for (let i = 0; i < touches.length; i++) {
      ongoingTouches.push(copyTouch(touches[i]));
    }
  }
  
  function handleMove(evt) {
    evt.preventDefault();
    const touches = evt.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      const color = document.getElementById('stroke').value;
      const idx = ongoingTouchIndexById(touches[i].identifier);
      if (idx >= 0) {
        context.beginPath();
        context.moveTo(ongoingTouches[idx].clientX - offsetX, ongoingTouches[idx].clientY - offsetY);
        context.lineTo(touches[i].clientX - offsetX, touches[i].clientY - offsetY);
        context.lineWidth = document.getElementById('lineWidth').value;
        context.strokeStyle = color;
        context.lineJoin = "round";
        context.closePath();
        context.stroke();
        ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
      }
    }
  }
  
  function handleEnd(evt) {
    evt.preventDefault();
    const touches = evt.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      const color = document.getElementById('stroke').value;
      let idx = ongoingTouchIndexById(touches[i].identifier);
      if (idx >= 0) {
        context.lineWidth = document.getElementById('lineWidth').value;
        context.fillStyle = color;
        ongoingTouches.splice(idx, 1);  // remove it; we're done
      }
    }
  }
  
  function handleCancel(evt) {
    evt.preventDefault();
    const touches = evt.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      let idx = ongoingTouchIndexById(touches[i].identifier);
      ongoingTouches.splice(idx, 1);  // remove it; we're done
    }
  }
  
  function copyTouch({ identifier, clientX, clientY }) {
    return { identifier, clientX, clientY };
  }
  
  function ongoingTouchIndexById(idToFind) {
    for (let i = 0; i < ongoingTouches.length; i++) {
      const id = ongoingTouches[i].identifier;
      if (id === idToFind) {
        return i;
      }
    }
    return -1;    // not found
  }