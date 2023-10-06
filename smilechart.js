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