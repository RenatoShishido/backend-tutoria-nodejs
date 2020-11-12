require("dotenv/config")
const mongoose = require("mongoose")

 mongoose.connect(`mongodb://${process.env.USERS}:${process.env.PASSWORD}@${process.env.DOCKER_MONGO_LOCAL}:${process.env.DOCKER_MONGO_PORT}`, {
  dbName: 'tutoria',
     useNewUrlParser: true,
      useUnifiedTopology: true,
       useFindAndModify: false
     })
    .catch((err) => console.log("error: " + err))

const db = mongoose.connection

db.once('open', () => console.log("Banco de dados funcionando ..."))

module.exports = mongoose;
