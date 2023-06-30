console.log("hello");
const galleryImages = document.getElementsByClassName("image");
const imgContainer = document.querySelector(".imgContainer");

let globalIndex = 0,
  last = { x: 0, y: 0 };

const activate = (image, x, y) => {
  const containerRect = imgContainer.getBoundingClientRect();
  const imageRect = image.getBoundingClientRect();
  
  const maxX = containerRect.width - imageRect.width;
  const maxY = containerRect.height - imageRect.height;
  
  const clampedX = Math.max(0, Math.min(x, maxX));
  const clampedY = Math.max(0, Math.min(y, maxY));

  image.style.left = `${clampedX}px`;
  image.style.top = `${clampedY}px`;
  image.style.zIndex = globalIndex;

  image.dataset.status = "active";

  last = { x: clampedX, y: clampedY };
};

const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
};

const handleOnMove = e => {
  const containerRect = imgContainer.getBoundingClientRect();

  if (
    e.clientX >= containerRect.left &&
    e.clientX <= containerRect.right &&
    e.clientY >= containerRect.top &&
    e.clientY <= containerRect.bottom
  ) {
    if (distanceFromLast(e.clientX, e.clientY) > containerRect.width / 20) {
      const lead = galleryImages[globalIndex % galleryImages.length];
      const tail = galleryImages[(globalIndex - 5) % galleryImages.length];

      activate(lead, e.clientX, e.clientY);

      if (tail) tail.dataset.status = "inactive";

      globalIndex++;
    }
  }
};

imgContainer.addEventListener("mousemove", e => handleOnMove(e));
imgContainer.addEventListener("touchmove", e => handleOnMove(e.touches[0]));
