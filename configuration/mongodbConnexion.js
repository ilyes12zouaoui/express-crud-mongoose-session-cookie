const mongoose = require("mongoose");
//connecting to mongodb
mongoose
  .connect("mongodb://localhost:27017/express-crud-two", {
    useNewUrlParser: true
  })
  .then(
    () => {
      console.log("connected to mongodb");
    },
    err => {
      console.log("not connected problem !!!!!");
    }
  );
