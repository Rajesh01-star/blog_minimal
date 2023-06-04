let modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");
let openBtn = document.getElementById("openBtn");
let openBtnClass = document.querySelector(".openBtnClass");

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

openBtn.addEventListener("click", openModal);
openBtnClass.addEventListener("click", openModal);
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});
overlay.addEventListener("click", closeModal);

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();
  let paswd = document.getElementById("paswd");
  if (paswd.value === "vibha") {
    window.location.href = "/psswd.html";
  } else {
    window.location.href = "https://www.dafk.net/what/";
  }
});