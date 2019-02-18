"use strict";
let inputSrc;
let numOfXPieces;
let numOfYPieces;
let image;
let naturalHeight;
const container_width = 400;
const container_height = 400;


// const imageAddress = "http://erik-crg.dk/croco.jpg";

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
  naturalHeight = image.naturalHeight;
  document.querySelector("img").onload = dropContainerLoop();
}

function dropContainerLoop() {
  console.log(dropContainerLoop);
  document.querySelector("#container").style.gridTemplateColumns = `repeat(${numOfXPieces}, 1fr)`;
  document.querySelector("#container").style.width = `${container_width}px`
  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {

      let piece = document.createElement("div");

      piece.style.height = (container_height / numOfYPieces) + "px";

      piece.textContent = `${x}${y}`;
      piece.classList.add("piece");

      document.querySelector("#container").appendChild(piece);
    }
  }
}
// You find out how big the picture is.
// You make a 2D loop to generate the dropzones, according to the user input.
// You give the pieces an ID, need I say it has to be unique.