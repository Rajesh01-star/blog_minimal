const roadTrip = [
    "http://0x0.st/opZU.jpg",
    "http://0x0.st/HQDU.jpg"
  ];
  
  const esplanade = [
    "http://0x0.st/HQD0.jpg",
    "http://0x0.st/opN6.jpg",
    "http://0x0.st/HQD0.jpg",
    "http://0x0.st/opN6.jpg",
    "http://0x0.st/HQD0.jpg",
    "http://0x0.st/opN6.jpg",
    "http://0x0.st/HQD0.jpg",
    "http://0x0.st/opN6.jpg",
    "http://0x0.st/HQD0.jpg",
    "http://0x0.st/opN6.jpg",
    "http://0x0.st/HQD0.jpg",
    "http://0x0.st/opN6.jpg",
    "http://0x0.st/HQD0.jpg",
    "http://0x0.st/opN6.jpg",
    "http://0x0.st/HQD0.jpg",
    "http://0x0.st/opN6.jpg",
    "http://0x0.st/HQD0.jpg",
    "http://0x0.st/opN6.jpg"
  ];
  
  const showCaseArr = window.location.href.split('/').pop();
  
  document.addEventListener("DOMContentLoaded", (event) => {
    var showCase = document.getElementById("showcase");
    var imageArray;
  
    if (showCaseArr === "roadTrip") {
      imageArray = roadTrip;
    } else if (showCaseArr === "esplanade") {
      imageArray = esplanade;
    } else {
      // Handle the case when showCaseArr doesn't match any specific array
      // For example, display a default set of images or show an error message
      return;
    }
  
    for (var i = 0; i < imageArray.length; i++) {
      var img = document.createElement("img");
      img.src = imageArray[i];
      showCase.appendChild(img);
    }
  });