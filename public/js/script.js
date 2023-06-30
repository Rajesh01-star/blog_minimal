const images = [
"http://0x0.st/Hbx6.jpg","http://0x0.st/HbxI.jpg","http://0x0.st/HbxI.jpg","http://0x0.st/Hbxl.jpg","http://0x0.st/HbxU.jpg","http://0x0.st/Hbx0.jpg","http://0x0.st/HbxG.jpg","http://0x0.st/HbxD.jpg","http://0x0.st/Hbxk.jpg","http://0x0.st/Hbxd.jpg","http://0x0.st/Hbxn.jpg","http://0x0.st/Hbx5.jpg","http://0x0.st/HbxR.jpg","http://0x0.st/Hbx7.jpg","http://0x0.st/Hbxh.jpg","http://0x0.st/HbxF.jpg","http://0x0.st/HbxC.jpg","http://0x0.st/Hb3r.jpg","http://0x0.st/Hb3s.jpg","http://0x0.st/Hb3z.jpg","http://0x0.st/Hb3i.jpg",
]

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  function getRandomImage() {
    let num = randomNumber(1, images.length);
    return images[num];
  }
  
  document.addEventListener("DOMContentLoaded", (event) => {
    var gal = document.getElementById("img-gallery");
    for (var i = 0; i < 3; i++) {
      var img = document.createElement("img");
      img.src = getRandomImage();
      gal.appendChild(img);
    }
  });
  
  
  
 