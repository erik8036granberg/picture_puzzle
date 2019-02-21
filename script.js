"use strict";
let inputSrc;
let numOfXPieces;
let numOfYPieces;
let image;
let naturalHeight;
const container_width = 400;
const container_height = 400;
let dragged;
const checkList = [];

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  document.querySelector("#makePuzzle").addEventListener("click", loadTheImage);
}

function loadTheImage() {
  console.log("loadTheImage");
  // get input image + values
  inputSrc = document.querySelector("#inputSrc").value;
  numOfXPieces = document.querySelector("#inputX").value;
  numOfYPieces = document.querySelector("#inputY").value;

  // load image in DOM
  image = document.querySelector("#image");
  image.src = inputSrc;

  // You find out how big the picture is.
  let naturalHeight = image.naturalHeight;
  let naturalWidth = image.naturalWidth;
  document.querySelector("img").onload = piecesLoop();
  console.log("nat-H: " + naturalHeight);
  console.log("nat-W: " + naturalWidth);

  // make button to reset
  document
    .querySelector("#makePuzzle")
    .removeEventListener("click", loadTheImage);

  document.querySelector("#makePuzzle").textContent = "New puzzle";

  document.querySelector("#makePuzzle").addEventListener("click", reset);
}

// You make a 2D loop to generate the dropzones, according to the user input.

function piecesLoop() {
  console.log(piecesLoop);
  document.querySelector(
    "#container"
  ).style.gridTemplateColumns = `repeat(${numOfXPieces}, 1fr)`;
  document.querySelector("#container").style.width = `${container_width}px`;

  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      let dropzone = document.createElement("div");

      dropzone.classList.add("dropzone");
      dropzone.style.height = container_height / numOfYPieces + "px";
      // dropzone.textContent = `${x}${y}`;

      // unique piece ID for checking placement
      dropzone.dataset.xyid = `id${x}${y}`;

      // add xy-ID to checkList as false
      let obj = {
        xyid: `id${x}${y}`,
        correct: false
      };
      checkList.push(obj);

      document.querySelector("#container").appendChild(dropzone);
    }
  }

  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      let piece = document.createElement("div");

      piece.classList.add("piece");
      // piece.textContent = `${x}${y}`;

      let pieceWidth = container_height / numOfYPieces;
      let pieceHeight = container_height / numOfYPieces;

      piece.style.width = pieceWidth + "px";
      piece.style.height = pieceHeight + "px";

      // set background image
      piece.style.backgroundImage = `url('${inputSrc}')`;
      piece.style.backgroundPosition = `-${x * pieceWidth}px -${y *
        pieceHeight}px`;

      piece.style.position = "absolute";
      piece.id = "draggable";
      piece.draggable = "true";

      piece.style.left = `${700 + Math.random() * 250}px`;
      piece.style.top = `${250 + Math.random() * 200}px`;

      // unique piece ID for checking placement
      piece.dataset.xyid = `id${x}${y}`;

      document.querySelector("#container").appendChild(piece);
    }
  }

  dragPiece();
}

function dragPiece() {
  console.log("dragPiece");

  /* events fired on the draggable target */
  document.addEventListener("drag", function(event) {}, false);

  document.addEventListener("dragstart", function(event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = 0.5;

    event.dataTransfer.setData("text", event.target.dataset.xyid);
  });

  document.addEventListener("dragend", function(event) {
    // reset the transparency
    event.target.style.opacity = "";
  });

  /* events fired on the drop targets */
  document.addEventListener("dragover", function(event) {
    // prevent default to allow drop
    event.preventDefault();
  });

  document.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();

    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
      event.target.style.background = "";
      dragged.parentNode.removeChild(dragged);
      event.target.appendChild(dragged);
      dragged.style.left = event.target.style.left;
      dragged.style.top = event.target.style.top;

      // dropzone id when piece is dropped
      let droppedInZone = event.target.dataset.xyid;
      console.log("Drop-zone: ", droppedInZone);

      // piece id when dropped
      let pieceDropped = event.dataTransfer.getData("text");
      console.log("Piece dropped: ", pieceDropped);

      // Clear the drag data cache (for all formats/types)
      event.dataTransfer.clearData();

      checkPieces(pieceDropped, droppedInZone);
    } else if (event.target.className == "theBody") {
      // park the dragged elem somewhere on the body

      // if the piece is dropped outside the dropzone
      let droppedInZone = "theBody";
      console.log("Drop-zone: ", droppedInZone);

      dragged.style.left = event.pageX + "px";
      dragged.style.top = event.pageY + "px";
    }
  });
}

function checkPieces(pieceDropped, droppedInZone) {
  console.log("checkPieces");
  console.log(checkList);

  // if dropped piece matches dropzone - change value in checkList
  if (pieceDropped === droppedInZone) {
    let objIndex = checkList.findIndex(obj => obj.xyid == pieceDropped);
    checkList[objIndex].correct = true;
  }

  let counter = 0;
  let numMax = numOfXPieces * numOfYPieces;

  // Check list for correct pieces
  checkList.forEach(check => {
    console.log("checkList");
    if (checkList[counter].correct === true) {
      counter++;
    }
    if (counter === numMax) alert("You did it!");
  });
}

function reset() {
  console.log("reset");
  // reload page
  location.reload(true);
}
