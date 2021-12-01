// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
  if(mCurrentIndex >= mImages.length){
    mCurrentIndex=0;
  }else if(mCurrentIndex<0){
  mCurrentIndex=mImages.length-1;
  }

  document.getElementById('photo').src= mImages[mCurrentIndex].img;
  var location=document.GetElementsByClassName('location')[0].innerHTML="Location:"+ mImages[mCurrentIndex].location;
  var description=document.GetElementsByClassName('description')[0].innerHTML="Description:"+ mImages[mCurrentIndex].description;
  var date=document.GetElementsByClassName('date')[0].innerHTML="Date:"+ mImages[mCurrentIndex].date;
  //Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded
	//from the JSON string

	mLastFrameTime=0;
	mCurrentIndex++;
	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

function fetchJson(){
  mRequest.addEventListener("readystatechange", () => {
    console.log(mRequest, mRequest.readyState);
    if (request.readyState === 4 && mRequest.status === 200) {
      mJson = JSON.parse(mRequest.responseText);
      console.log(mJson);
      iteraeJSON(mJson);
    } else if (mRequest.readyState === 4) {
      console.log("could not fetch the data");
    }
});

request.open("GET", mUrl, true);
request.send();
}
// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = '../images.json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
fetchJson(){
  const urlParams = new URLSearchParams(window.location.search);

  for (const [key, value] of urlParams) {

  console.log(`${key}:${value}`);

  mUrl = value;

  }

  if(mUrl == undefined)

  {

  mUrl = 'images.json';

  }
}
	// This initially hides the photos' metadata information
	// $('.details').eq(0).hide();

});

window.addEventListener('load', function() {

	console.log('window loaded');

}, false);

function GalleryImage() {
	this.location;
	this.description;
	this.date;
	this.img;
}

function iterateJson(mJson){
  for(let x = 0; x < mJson.images.length; x++)
  {
    mImages[x] = new gallerImage();
    mImages[x].location = mJson.images[x].imgLocation;
    mImages[x].description = mJson.images[x].description;
    mImages[x].date = mJson.images[x].date;
    mImages[x].img= mJson.images[x].imgPath;
  }
}
