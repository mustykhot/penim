const config = require("config");
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv')
//load env variables
dotenv.config()
const helmet = require('helmet')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(cookieParser());
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

//api call
const users = require("./api/paths");
app.use('/', users);

//documentation link
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//public files
app.use(express.static(path.join(__dirname, '/public')));

//welcome page
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})


//listen 
app.listen(port, () => {
  console.log(`The server is running on ${port}`);
})