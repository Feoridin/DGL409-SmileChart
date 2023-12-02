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
  ctx.fillStyle = e.target.value;
}
if (e.target.id === "stroke2") {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
}
if (e.target.id === "stroke3") {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
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
let lineWidth = 3;
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
  if(!isPainting) return; // if isDrawing is false return from here
    ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas

    if(selectedTool === "brush" || selectedTool === "eraser") {
        // if selected tool is eraser then set strokeStyle to white 
        // to paint white color on to the existing canvas content else set the stroke color to selected color
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
        ctx.stroke(); // drawing/filling line with color
    } else if(selectedTool === "rectangle"){
        drawRect(e);
    } else if(selectedTool === "circle"){
        drawCircle(e);
    } else {
        drawTriangle(e);
    }
};

canvas.addEventListener("mousedown", (e) => {
  isPainting = true;
  prevMouseX = e.offsetX; // passing current mouseX position as prevMouseX value
  prevMouseY = e.offsetY; // passing current mouseY position as prevMouseY value
  ctx.beginPath(); // creating new path to draw
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
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
}//End of touchscreen function

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
const fillColor = document.querySelector("#fill-color");
let selectedTool = "brush";
let selectedColor = fillColor;

const drawRect = (e) => {
  
  // if fillColor isn't checked draw a rect with border else draw rect with background
  if(!fillColor.checked) {
    
      // creating circle according to the mouse pointer
      return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
  }
  
  console.log(ctx.lineWidth)
  ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
  ctx.lineWidth = 1;
}

const drawCircle = (e) => {
    ctx.beginPath(); // creating new path to draw circle
    // getting radius for circle according to the mouse pointer
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
    fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
}

const drawTriangle = (e) => {
    ctx.beginPath(); // creating new path to draw circle
    ctx.moveTo(prevMouseX, prevMouseY); // moving triangle to the mouse pointer
    ctx.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
    ctx.closePath(); // closing path of a triangle so the third line draw automatically
    fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill triangle else draw border
}

