const imagePrev = document.querySelector(".imagePrev");
const downloadClick = imagePrev.addEventListener("click", async (event) => {
  event.preventDefault();
  const name = document.querySelector(".image_img").alt;
  const width = document.querySelector("#imgWidth").value;
  let crop = "";
  if (document.querySelector("#crop1").selected){
    crop = document.querySelector("#crop1").value
  }else if(document.querySelector("#crop2").selected){
    crop = document.querySelector("#crop2").value
  }else{
    crop = "scale";
  }
  let font_family = "";
  if (document.querySelector("#fontFamily1").selected){
    font_family = document.querySelector("#fontFamily1").value
  }else if(document.querySelector("#fontFamily2").selected){
    font_family = document.querySelector("#fontFamily2").value
  }else if(document.querySelector("#fontFamily3").selected){
    font_family = document.querySelector("#fontFamily3").value
  }else if(document.querySelector("#fontFamily4").selected){
    font_family = document.querySelector("#fontFamily4").value
  }else if(document.querySelector("#fontFamily5").selected){
    font_family = document.querySelector("#fontFamily5").value
  }else if(document.querySelector("#fontFamily6").selected){
    font_family = document.querySelector("#fontFamily6").value
  }else if(document.querySelector("#fontFamily7").selected){
    font_family = document.querySelector("#fontFamily7").value
  }else if(document.querySelector("#fontFamily8").selected){
    font_family = document.querySelector("#fontFamily8").value
  }else if(document.querySelector("#fontFamily9").selected){
    font_family = document.querySelector("#fontFamily9").value
  }else{
    font_family = "Arial";
  }
  const font_size = document.querySelector("#fontSize").value;
  let font_weight = "";
  if (document.querySelector("#fontSize1").selected){
    font_weight = document.querySelector("#fontSize1").value
  }else if(document.querySelector("#fontSize2").selected){
    font_weight = document.querySelector("#fontSize2").value
  }else if(document.querySelector("#fontSize3").selected){
    font_weight = document.querySelector("#fontSize3").value
  }else if(document.querySelector("#fontSize4").selected){
    font_weight = document.querySelector("#fontSize4").value
  }else{
    font_weight = "bold";
  }
  let font_style = "";
  if (document.querySelector("#fontStyle1").selected){
    font_style = document.querySelector("#fontStyle1").value
  }else if(document.querySelector("#fontStyle2").selected){
    font_style = document.querySelector("#fontStyle2").value
  }else{
    font_style = "italics";
  }
  let text_decoration = "";
  if (document.querySelector("#textDeco1").selected){
    text_decoration = document.querySelector("#textDeco1").value
  }else if(document.querySelector("#textDeco2").selected){
    text_decoration = document.querySelector("#textDeco2").value
  }else if(document.querySelector("#textDeco3").selected){
    text_decoration = document.querySelector("#textDeco3").value
  }else{
    text_decoration = "normal";
  }
  let text_align = "";
  if (document.querySelector("#textAlign1").selected){
    text_align = document.querySelector("#textAlign1").value
  }else if(document.querySelector("#textAlign2").selected){
    text_align = document.querySelector("#textAlign2").value
  }else if(document.querySelector("#textAlign3").selected){
    text_align = document.querySelector("#textAlign3").value
  }else if(document.querySelector("#textAlign4").selected){
    text_align = document.querySelector("#textAlign4").value
  }else if(document.querySelector("#textAlign5").selected){
    text_align = document.querySelector("#textAlign5").value
  }else if(document.querySelector("#textAlign6").selected){
    text_align = document.querySelector("#textAlign6").value
  }else{
    text_align = "center";
  }
  const text = document.querySelector("#txt").value;
  let gravity = "";
  if (document.querySelector("#gravity1").selected){
    gravity = document.querySelector("#gravity1").value
  }else if(document.querySelector("#gravity2").selected){
    gravity = document.querySelector("#gravity2").value
  }else if(document.querySelector("#gravity3").selected){
    gravity = document.querySelector("#gravity3").value
  }else if(document.querySelector("#gravity4").selected){
    gravity = document.querySelector("#gravity4").value
  }else if(document.querySelector("#gravity5").selected){
    gravity = document.querySelector("#gravity5").value
  }else if(document.querySelector("#gravity6").selected){
    gravity = document.querySelector("#gravity6").value
  }else if(document.querySelector("#gravity7").selected){
    gravity = document.querySelector("#gravity7").value
  }else if(document.querySelector("#gravity8").selected){
    gravity = document.querySelector("#gravity8").value
  }else{
    gravity = "north";
  }
  const y = document.querySelector("#y").value;
  const x = document.querySelector("#x").value;
  const color = document.querySelector("#color").value;
  const unsplashText = await { name, width, crop, font_family, font_size, font_weight, 
  font_style, text_decoration, text_align, text, gravity, y, x, color };
  Text(unsplashText); 
});


const Text = async (name) => {
  axios
    .post("https://pen-image.herokuapp.com/text", name, { headers: headers})
    .then((response) => {
      response.data; 
      if (response.status == "200") {
        if ( typeof(response.data.picError) == "undefined") {
          const preview = document.querySelector(".image_img");
          preview.src = response.data.textImage.slice(10, -4);
          preview.alt = "preview";

          const download = document.querySelector(".download");
          download.href = response.data.textImage.slice(10, -4);
          download.setAttribute("download", "penImage");
        } else { 
          show("Unable to generate download image.", "error");
        }
      } else {
        show("Unable to send request.", "error");
      }
    })

  .catch((error) => console.error(error.message));
};