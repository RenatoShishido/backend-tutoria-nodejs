const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');


app.set('view engine', 'ejs')
require("./database/index")

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  next();
});


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

require('./app/controllers/index')(app)


app.listen(process.env.PORT || 3000)

