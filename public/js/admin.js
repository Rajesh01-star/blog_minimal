  document.querySelectorAll(".file-input-container").forEach((eachContainer) => {
    const inputField = eachContainer.querySelector("input[type=file]");
    const box = eachContainer.querySelector(".file-input-box");
    const inputType = inputField.id === "preview_image" ? "img" : "md";
  
    eachContainer.addEventListener("click", () => {
      inputField.click();
    });
  
    inputField.addEventListener("change", () => {
      if(inputType === "md" && inputField.files[0].type.startsWith('text/')){
        box.textContent = inputField.files[0].name;
        console.log(inputField.value)
      }
      else if(inputType === "img" && inputField.files[0].type.startsWith('image/')){
        box.textContent = inputField.files[0].name;
        console.log(inputField.value)
      }
      else{
         alert("wrong input");
         inputField.value = '';
         console.log(inputField.value);
        }
    });
  });



  