// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === "block") {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = "block";
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}
// Get the color by its ID

var colorPicker = document.getElementById("toolbar");
colorPicker.addEventListener('click', hide)
function hide(e){
if (e.target.id === "stroke1") {
  ctx.strokeStyle = e.target.value;
}
if (e.target.id === "stroke2") {
  ctx.strokeStyle = e.target.value;
}
if (e.target.id === "stroke3") {
  ctx.strokeStyle = e.target.value;
}
}
//Canvas Function
const canvas = document.getElementById("drawing-board");
const toolbar = document.getElementById("toolbar");
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener("change", (e) => {
  if (e.target.id === "stroke") {
    ctx.strokeStyle = e.target.value;
    console.log(e.target.value)
  }
  

  if (e.target.id === "lineWidth") {
    lineWidth = e.target.value;
  }
});

const draw = (e) => {
  if (!isPainting) {
    return;
  }
  snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
};

canvas.addEventListener("mousedown", (e) => {
  isPainting = true;
  prevMouseX = e.offsetX; // passing current mouseX position as prevMouseX value
  prevMouseY = e.offsetY; // passing current mouseY position as prevMouseY value
  ctx.beginPath(); // creating new path to draw
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mouseup", (e) => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

//Blows up xray images when clicked
function showurl() {
  displayImages2();
  if (imageDisplay == true) {
    clearAttribute2();
  }
}
function displayImages2() {
  imagesRef
    .listAll()
    .then(function (result) {
      result.items.forEach(function (imageRef) {
        // Get the download URL for each image
        imageRef
          .getDownloadURL()
          .then(function (url) {
            const imageElement = document.createElement("img");
            imageElement.className = "d-flex p-2 w-100";
            imageElement.setAttribute("id", "upImage");
            imageElement.src = url;
            document
              .getElementById("image-container2")
              .appendChild(imageElement);
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

function clearAttribute2() {
  const list = document.getElementById("image-container2");

  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}
//touchscreen
const viewport = window.visualViewport;
const context = canvas.getContext("2d");

function startup() {
  canvas.addEventListener("touchstart", handleStart);
  canvas.addEventListener("touchend", handleEnd);
  canvas.addEventListener("touchcancel", handleCancel);
  canvas.addEventListener("touchmove", handleMove);
}

document.addEventListener("DOMContentLoaded", startup);

const ongoingTouches = [];

function handleStart(evt) {
  evt.preventDefault();
  const touches = evt.changedTouches;
  offsetX = canvas.getBoundingClientRect().left;
  offsetY = canvas.getBoundingClientRect().top;
  console.log(offsetX, offsetY);
  for (let i = 0; i < touches.length; i++) {
    ongoingTouches.push(copyTouch(touches[i]));
  }
}

function handleMove(evt) {
  evt.preventDefault();
  const touches = evt.changedTouches;
  for (let i = 0; i < touches.length; i++) {
    const color = document.getElementById("stroke").value;
    const idx = ongoingTouchIndexById(touches[i].identifier);
    if (idx >= 0) {
      context.beginPath();
      context.moveTo(
        ongoingTouches[idx].clientX - offsetX,
        ongoingTouches[idx].clientY - offsetY
      );
      context.lineTo(
        touches[i].clientX - offsetX,
        touches[i].clientY - offsetY
      );
      context.lineWidth = document.getElementById("lineWidth").value;
      context.strokeStyle = color;
      context.lineJoin = "round";
      context.closePath();
      context.stroke();
      ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
    }
  }
}

function handleEnd(evt) {
  evt.preventDefault();
  const touches = evt.changedTouches;
  for (let i = 0; i < touches.length; i++) {
    const color = document.getElementById("stroke").value;
    let idx = ongoingTouchIndexById(touches[i].identifier);
    if (idx >= 0) {
      context.lineWidth = document.getElementById("lineWidth").value;
      context.fillStyle = color;
      ongoingTouches.splice(idx, 1); // remove it; we're done
    }
  }
}

function handleCancel(evt) {
  evt.preventDefault();
  const touches = evt.changedTouches;
  for (let i = 0; i < touches.length; i++) {
    let idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(idx, 1); // remove it; we're done
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
  return -1; // not found
}

function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
}
//Selecting the shape for drawing
const toolBtns = document.querySelectorAll(".tool")
toolBtns.forEach(btn => {
  btn.addEventListener("click", () => { // adding click event to all tool option
      // removing active class from the previous option and adding on current clicked option
      document.querySelector(".options .active").classList.remove("active");
      btn.classList.add("active");
      selectedTool = btn.id;
      console.log("Shape Hello")
  });
});

