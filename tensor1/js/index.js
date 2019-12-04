var i = 0;
const imageArr = ['img/pug.jpg', 'img/coco.jpg', 'img/maine-coon.jpg', 'img/lorikeet.jpg', 'img/guitar.jpg'];
let net;

const prevImg = document.getElementById('prevImage');
const nextImg = document.getElementById('nextImage');

// Creating a function that makes the array loop when the last, and first image are reached. This also returns the current position in the array. ('i')
function getNextPos(pos){
  i = i + pos;
  
  if (i < 0){
    i = imageArr.length - 1;
  } 
  
  else if (i >= imageArr.length){
    i = 0;
  }
  
  return i;
}

function updateImage(arrPos){
  // Calling the item by name, and setting the src attribute of the element to the image. Each image is selected from imageArr with arrPos.
  document.imgCycle.src = imageArr[arrPos];
}

function goToNextImage(){
  // nextIndex is used to hold the value.
  var nextIndex = getNextPos(1);
  updateImage(i);
}

// This function does the same thing as goToNextImage, but it decrements instead of incrementing meaning it will go from 3 --> 2 --> 1, and so on.
function goToPreviousImage(){
  var nextIndex = getNextPos(-1);
  updateImage(i);
}

// addEventListener used over onclick attribute, for sake of degrading gracefully.
prevImg.addEventListener("click", goToPreviousImage, false);

nextImg.addEventListener("click", goToNextImage, false);


// Set the default image to arrPos 0. Meaning the first image in the array will be displayed. (In this case, that image is 'img_BMW.jpg').
updateImage(0);

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');

  // Make a prediction through the model on our image.
  const imgEl = document.getElementById('img');
  const result = await net.classify(imgEl);
  console.log(result);

  document.getElementById('console').innerText = `
  Prediction: ${result[0].className}\n
  Probability: ${result[0].probability} 
  `;

}

app();