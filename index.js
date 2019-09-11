var express = require("express");
const {
  addUserToLocal,
  checkIfUserAuthenticated
} = require("./middleware/auth");
const Routers = {
  type: require("./controller/type"),
  blog: require("./controller/blog"),
  auth: require("./controller/auth")
};

const app = express();

//connecting to mongoDB
require("./configuration/mongodbConnexion");

//adding configurations to app
require("./configuration/appConfiguration")(app);

app.use(addUserToLocal);
app.use(["/types", "/types/*", "/blogs", "/blogs/*"], checkIfUserAuthenticated);

//-------adding routes
app.use("/", Routers.auth);
app.use("/types", Routers.type);
app.use("/blogs", Routers.blog);

// index route
app.get("/", (req, res) => {
  res.render("index");
});

// catch 404 route
app.get("/*", function(req, res, next) {
  res.status(404).render("404");
});

app.listen(5000, console.log("listening 5000 .."));
