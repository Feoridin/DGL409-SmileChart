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
  measurementId: "G-QSD6CP8DG3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
  query,
  limitToLast,
  onValue,
  onChildAdded,
  onChildChanged,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";
const db = getDatabase(app);
const dbref = ref(db);
var patientid = document.getElementById("patientidName");
var patientname = document.getElementById("patientName");

get(child(dbref, "Selected"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      patientid.value = snapshot.val().PatientID;
      get(child(dbref, "Patient/" + patientid.value)).then((snapshot) => {
        if (snapshot.exists()) {
          patientname.value =
            snapshot.val().PatientFirstName +
            " " +
            snapshot.val().PatientLastName;
        }
      });
      //-------DISPLAY IMAGE--------///
      // Reference to Firebase Storage
      const storage2 = firebase.storage();
      // Reference to the folder where your images are stored
      const imagesRef = storage2.ref("Teeth/" + patientid.value + "/Teeth/");
      // Function to fetch and display images
      function displayImages() {
        imagesRef
          .listAll()
          .then(function (result) {
            result.items.forEach(function (imageRef) {
              // Get the download URL for each image
              imageRef
                .getDownloadURL()
                .then(function (url) {
                  const imageElement = document.createElement("img");
                  imageElement.className = "d-flex p-2 w-100 w3-hover-opacity";
                  imageElement.setAttribute("onclick", "onClick(this)");
                  imageElement.src = url;
                  document
                    .getElementById("image-container")
                    .appendChild(imageElement);
                  console.log(imageElement);
                  imageDisplay = true;
                })
                .catch(function (error) {
                  console.error("Error getting download URL:", error);
                });
            });
          })
          .catch(function (error) {
            console.error("Error listing images:", error);
          });
      }

      //-------UPLOADING FILE IN STORAGE------------//
      //--Disply images references
      var uploadbtn = document.getElementById("upload");
      var uploadButton2 = document.getElementById("upload2");
      var clearButton = document.getElementById("clearUp");
      var imageDisplay = false;
      // Call the function to upload images
      uploadbtn.addEventListener("click", uploadimage);
      // Call the function to display images
      uploadButton2.addEventListener("click", function () {
        if (imageDisplay == true) {
          clearAttribute();
        }
        displayImages();
      });
      clearButton.addEventListener("click", function () {
        clearAttribute();
        console.log(imageDisplay);
      });
      function clearAttribute() {
        const list = document.getElementById("image-container");

        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
      }
      //---UPLOAD IMAGE FUNCTION----//
      function uploadimage() {
        var type = getInputVal("types");
        var storage = firebase.storage();
        var file = document.getElementById("files").files[0];
        var storageref = storage.ref("Teeth/" + patientid.value);
        var thisref = storageref.child(type).child(file.name).put(file);
        thisref.on(
          "state_changed",
          function (snapshot) {},
          function (error) {},
          function () {
            // Uploaded completed successfully, now we can get the download URL
            thisref.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              //getting url of image
              document.getElementById("url").value = downloadURL;
              alert("uploaded successfully");
              saveMessage(downloadURL);
            });
          }
        );

        // Get values
        //var url = getInputVal('url');
        // Save message
        // saveMessage(url);
      }
      //function getInputVal(id){
      //   document.getElementById('contactForm').reset();
      //}
      // Function to get form values
      function getInputVal(id) {
        return document.getElementById(id).value;
      }

      // Save message to firebase database

      function saveMessage(url) {
        set(ref(db, "Patient/" + patientid.value + "/Images"), {
          imageurl: url,
        });
      }
      //

      listChart();
      //Set Background Image Canva

      const backgroundImage = new Image();
      backgroundImage.src = "Images/ToothChartEdited.jpg";
      backgroundImage.onload = function () {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      };
      toolbar.addEventListener("click", (e) => {
        if (e.target.id === "clear") {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const backgroundImage = new Image();
          backgroundImage.src = "Images/ToothChartEdited.jpg";
          backgroundImage.onload = function () {
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
          };
        }
      });

      const saveImg = document.querySelector(".save-img");
      var file = document.getElementById("drawing-board");

      saveImg.addEventListener("click", () => {
        const link = document.createElement("a"); // creating <a> element
        link.download = `${Date.now()}`; // passing current date as link download value
        link.href = canvas.toDataURL(); // passing canvasData as link href value
        link.click(); // clicking link to download image
        const date = new Date();
        const today = date.toDateString();
        canvas.toBlob(function (blob) {
          var storageref = firebase.storage().ref();

          var uploadRef = storageref.child(
            "Teeth/Chart/" + patientid.value + "/" + link.download + today
          );
          uploadRef.put(blob).then(function (snapshot) {
            console.log("uploaddone");
            uploadRef.getDownloadURL().then(function (url) {
              const db = getDatabase(app);
              set(
                ref(
                  db,
                  "Patient/" +
                    patientid.value +
                    "/URLImages/" +
                    today +
                    "/" +
                    link.download +
                    "/"
                ),
                {
                  imageref: uploadRef.name,
                  imageurl: url,
                }
              );
              console.log("this shold be a firebase url", url);
              listChart2();
            });
          });
        });
      }); //End of Set and Save Image on Canvas
    } else {
      alert("No Data Found");
    }
  })
  .catch((error) => {
    alert("unsuccesful, error" + error);
  });

function listChart() {
  const storage = getStorage();

  // Create a reference under which you want to list
  const listRef = sRef(storage, "Teeth/Chart/" + patientid.value);

  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        var chartlist = [];
        chartlist.push(itemRef.name);
        var charthead = document.getElementById("chartbox");
        var chartoption = document.createElement("option");

        for (var i = 0; i < chartlist.length; i++) {
          chartoption.setAttribute("value", chartlist[i]);
          chartoption.setAttribute("label", chartlist[i]);
          charthead.appendChild(chartoption);
        }
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
}
//THis function shows the chart images according to the selected saved chart
var showbtn = document.getElementById("showChart");
showbtn.addEventListener("click", showchart);
function showchart() {
  var charthead = document.getElementById("chartbox");
  var chartvaluehead =
    charthead.options[charthead.selectedIndex].getAttribute("value");
  var chartvalue = chartvaluehead.slice(13);
  var chartvalue1 = chartvaluehead.slice(0, 13);
  console.log(chartvalue1);
  var patientchartimage;
  console.log(chartvalue);
  get(
    child(
      dbref,
      "Patient/" +
        patientid.value +
        "/URLImages/" +
        chartvalue +
        "/" +
        chartvalue1
    )
  ).then((snapshot) => {
    if (snapshot.exists()) {
      patientchartimage = snapshot.val().imageurl;
      console.log(patientchartimage);
      showchartimage();
    }
  });
  function showchartimage() {
    const backgroundImage = new Image();
    backgroundImage.crossOrigin = "anonymous";
    backgroundImage.src = patientchartimage;
    backgroundImage.onload = function () {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };
  }
}
//This function populates the chart list after pressing the save button
function listChart2() {
  console.log("HELLO2 List Chart2");
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  const container = document.getElementById("chartbox");
  removeAllChildNodes(container);
  var chartoption = document.createElement("option");
  var charthead = document.getElementById("chartbox");
  chartoption.setAttribute("value", "");
  chartoption.setAttribute("disabled", "");
  chartoption.setAttribute("selected", "");
  chartoption.setAttribute("id", "chartOption");
  chartoption.setAttribute("label", "Select Patient's Chart");
  charthead.appendChild(chartoption);
  listChart();
}

var delbtn = document.getElementById("delete");
delbtn.addEventListener("click", deletechart);
function deletechart() {
  var charthead = document.getElementById("chartbox");
  var chartvaluehead =
    charthead.options[charthead.selectedIndex].getAttribute("value");
  var chartvalue = chartvaluehead.slice(13);
  var chartvalue1 = chartvaluehead.slice(0, 13);
  const storage = getStorage();
  const desertRef = sRef(
    storage,
    "Teeth/Chart/" + patientid.value + "/" + chartvaluehead
  );
  console.log(chartvalue1);
  console.log(chartvalue);
  console.log(chartvaluehead);
  remove(
    ref(
      db,
      "Patient/" +
        patientid.value +
        "/URLImages/" +
        chartvalue +
        "/" +
        chartvalue1
    )
  );
  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
      console.log("File deleted");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log("This is the Error:" + error);
    });
  location.reload();
}
