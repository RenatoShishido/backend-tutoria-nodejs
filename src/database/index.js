require("dotenv/config")
const mongoose = require("mongoose")

mongoose.connect(process.env.URL_BANCO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .catch((err) => console.log("error: " + err))
const db = mongoose.connection

db.once('open', () => console.log("Banco de dados funcionando ..."))


module.exports = mongoose;
