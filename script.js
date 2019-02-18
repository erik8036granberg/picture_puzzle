"use strict";
let inputSrc;
let numOfXPieces;
let numOfYPieces;
let image;
let naturalHeight;
const container_width = 400;
const container_height = 400;
let dragged;

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
  image = document.querySelector("img");
  image.src = inputSrc;

  // You find out how big the picture is.
  naturalHeight = image.naturalHeight;
  document.querySelector("img").onload = piecesLoop();
  console.log(naturalHeight);
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

      dropzone.style.height = container_height / numOfYPieces + "px";
      dropzone.textContent = `${x}${y}`;
      dropzone.classList.add("dropzone");

      // unique piece ID
      dropzone.dataset.xyid = `id${x}${y}`;

      document.querySelector("#container").appendChild(dropzone);
    }
  }

  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      let piece = document.createElement("div");

      piece.style.height = container_height / numOfYPieces + "px";
      piece.style.width = container_width / numOfXPieces + "px";
      piece.textContent = `${x}${y}`;
      piece.classList.add("piece");
      // piece.classList.add("move");

      piece.style.position = "absolute";
      piece.id = "draggable";
      piece.draggable = "true";

      piece.style.backgroundImage = `url('${inputSrc}')`;
      piece.style.backgroundPosition = `${y *
        (container_width / numOfYPieces)}px ${x *
        (container_height / numOfXPieces)}px`;

      piece.style.left = `${Math.random() * 100 + 500}px`;
      piece.style.top = `${Math.random() * 100}px`;

      console.log(inputSrc);

      // unique piece ID
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
    console.log("DROP", event.target.className);
    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
      event.target.style.background = "";
      dragged.parentNode.removeChild(dragged);
      event.target.appendChild(dragged);
      dragged.style.left = event.target.style.left;
      dragged.style.top = event.target.style.top;
    } else if (event.target.className == "theBody") {
      // park the dragged elem somewhere on the body
      dragged.style.left = event.pageX + "px";
      dragged.style.top = event.pageY + "px";
    }
  });
}
