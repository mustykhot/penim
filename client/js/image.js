const imgOne = document.querySelector("#one");
const imgOneClick = imgOne.addEventListener("click", async (event) => {
  event.preventDefault();
  let image = imgOne.src;
  const imgOneUpload = await { image };
  Image(imgOneUpload); 
});

const imgTwo = document.querySelector("#two");
const imgTwoClick = imgTwo.addEventListener("click", async (event) => {
  event.preventDefault();
  let image = imgTwo.src;
  const imgTwoUpload = await { image };
  Image(imgTwoUpload); 
});

const imgThree = document.querySelector("#three");
const imgThreeClick = imgThree.addEventListener("click", async (event) => {
  event.preventDefault();
  let image = imgThree.src;
  const imgThreeUpload = await { image };
  Image(imgThreeUpload); 
});

const imgFour = document.querySelector("#four");
const imgFourClick = imgFour.addEventListener("click", async (event) => {
  event.preventDefault();
  let image = imgFour.src;
  const imgFourUpload = await { image };
  Image(imgFourUpload); 
});

const imgFive = document.querySelector("#five");
const imgFiveClick = imgFive.addEventListener("click", async (event) => {
  event.preventDefault();
  let image = imgFive.src;
  const imgFiveUpload = await { image };
  Image(imgFiveUpload); 
});


const Image = async (name) => {
  axios
    .post("https://pen-image.herokuapp.com/image", name, { headers: headers})
    .then((response) => {
      response.data; 
      if (response.status == "200") {
        if ( typeof(response.data.picError) == "undefined") {
          const preview = document.querySelector(".image_img");
          preview.src = response.data.picture;
          preview.alt = response.data.name;
        } else { 
          show("Unable to upload.", "error");
        }
      } else {
        show("Enter a correct word.", "error");
      }
    })

  .catch((error) => console.error(error.message));
};
