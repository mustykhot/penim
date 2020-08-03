const click = document.querySelector(".cont");

const formClick = click.addEventListener("click", async (event) => {
  event.preventDefault();
  const search = document.querySelector("#search").value;
  const unsplashSearch = await { search };
  Search(unsplashSearch); 
});

const Search = async (name) => {
  axios
    .post("https://pen-image.herokuapp.com/search", name, { headers: headers})
    .then((response) => {
      response.data; 
      if (response.status == "200") {
        if ( typeof(response.data.error) == "undefined") {
          const imageOne = document.querySelector("#one");
          imageOne.src = response.data.output[0]
          const imageTwo = document.querySelector("#two");
          imageTwo.src = response.data.output[1]
          const imageThree = document.querySelector("#three");
          imageThree.src = response.data.output[2]
          const imageFour = document.querySelector("#four");
          imageFour.src = response.data.output[3]
          const imageFive = document.querySelector("#five");
          imageFive.src = response.data.output[4]
        } else { 
          show("Unable to search.", "error");
        }
      } else {
        show("Enter a correct word.", "error");
      }
    })

  .catch((error) => console.error(error.message));
};
