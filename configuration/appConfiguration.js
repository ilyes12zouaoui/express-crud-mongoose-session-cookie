var express = require("express");
var path = require("path");

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

module.exports = app => {
  //
  const store = new MongoDBStore({
    uri: "mongodb://localhost:27017/express-crud-two",
    collection: "sessions"
  });

  const paths = {
    static: path.join(__dirname, "..", "public"),
    views: path.join(__dirname, "..", "view")
  };

  const templeteEngineName = "twig";

  // view engine setup
  app.set("views", paths.views);
  app.set("view engine", templeteEngineName);

  //
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    session({
      secret: "my secret",
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );
  //serving static assets
  app.use("/public", express.static(paths.static));
};
