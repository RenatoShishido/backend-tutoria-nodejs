require("dotenv/config");
const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.USERS}:${process.env.PASSWORD}@cluster0.y0qaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      dbName: "tutoria",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  )
  .catch((err) => console.log("error: " + err));

const db = mongoose.connection;

db.once("open", () => console.log("Banco de dados funcionando ..."));

module.exports = mongoose;
