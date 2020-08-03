const config = require("config");
const express = require("express");
const router = express.Router();
const {
  Picture
} = require('../upload');
const path = require('path');
const fetch = require('node-fetch');
global.fetch = fetch;
const Unsplash = require('unsplash-js').default;
const unsplash = new Unsplash({
  accessKey: config.get("secret")
});
unsplash.users.profile(config.get("user"))
  .catch(err => {
    // Your flawless error handling code
  });
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: config.get("cloud_name"),
  api_key: config.get("api_key"),
  api_secret: config.get("api_secret")
});

//routes
router.post("/upload", (req, res) => {
  Picture(req, res, (error) => {
    // console.log(res);
    if (error === "LIMIT_UNEXPECTED_FILE") {
      return res.json("Too many files to upload.");
    }
    if (error) return res.json("Error when trying to upload files.");
    let OUTPUT = () => {
      let PICTURE = [];
      if (req.files["picture"] === undefined) {
        PICTURE = req.files["picture"]
      } else {
        req.files["picture"].forEach((image) => {
          PICTURE.push(image.filename);
        });
      }
      let pictures = PICTURE;
      cloudinary.uploader.upload(path.join(__dirname, '../public/uploads/' + pictures[0]), function (error, result) {
        if (result) {
          let name = result.public_id;
          let picture = result.secure_url;
          res.status(200).json({
            name,
            picture
          });
        } else {
          res.status(200).json({
            picError: "Unable to upload image."
          });
        }
      });
      // res.sendFile(path.join(__dirname,'../public/uploads/' + pictures[0]));
    };

    if (req.files == undefined) {
      OUTPUT()
    } else(
      OUTPUT()
    );
  });
});


router.post('/search', (req, res) => {
  const page = parseInt(req.body.page) || 1
  const per_page = parseInt(req.body.per_page) || 5

  //make request to api
  let output = [];
  unsplash.search.photos(req.body.search, page, per_page, {
      orientation: "portrait"
    })
    .then(response => response.json())
    .then(data => {
      data.results.forEach((pics) => {
        output.push(pics.urls.regular);
      });
      res.status(200).json({
        output
      });
    })
    .catch(err => {
      res.json({
        error: err
      })
    })
});

router.post('/image', (req, res) => {
  const image = req.body.image;
  cloudinary.uploader.upload(image, function (error, result) {
    if (result) {
      let name = result.public_id;
      let picture = result.secure_url;
      res.status(200).json({
        name,
        picture
      });
    } else {
      res.status(200).json({
        picError: "Unable to upload image."
      });
    }
  });
})

router.post('/text', (req, res) => {
  const {
    name,
    width,
    crop,
    font_family,
    font_size,
    font_weight,
    font_style,
    text_decoration,
    text_align,
    text,
    gravity,
    y,
    x,
    color
  } = req.body;
  let textImage = cloudinary.image(name, {
    transformation: [{
        width: width,
        crop: crop
      },
      {
        overlay: {
          font_family: font_family,
          font_size: font_size,
          font_weight: font_weight,
          font_style: font_style,
          text_decoration: text_decoration,
          text_align: text_align,
          text: text
        },
        gravity: gravity,
        y: y,
        x: x,
        color: color
      }
    ]
  });
  res.status(200).json({
    textImage
  });
})

// An example of how the inputs should be.

// let textImage = cloudinary.image(name, {transformation: [
// {width: 500, crop: "scale"},
// {overlay: {font_family: "Arial", font_size:80,
// font_weight: "bold", font_style: "italics", text_decoration: "underline", 
// text_align: "center", text: "OHW"}, gravity: "south", y: 20, 
// x: 3, color: "#00000080" }
// ]});

module.exports = router;