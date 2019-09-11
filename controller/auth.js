const express = require("express");
const router = express.Router();
const User = require("../model/user");
// const {
//   authenticateByJwtCookieAndAddToLocal
// } = require("../middlewares/authenticate");

/*
get login
post login //json si ok

get register
post register //redirect login

get logout // json

*/
//router.use(authenticateByJwtCookieAndAddToLocal);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res, err) => {
  const user = await User.findOne({ email: req.body.email }).exec();
  if (!user) {
    return res.render("login", { errors: ["wrong username or password"] });
  }

  const compareResult = await user.comparePassword(req.body.password);

  if (compareResult !== true) {
    return res.render("login", { errors: ["wrong username or password"] });
  }

  req.session.isAuthenticated = true;
  req.session.user = user.toObject();
  return req.session.save(err => {
    console.log(err);
    res.redirect("/");
  });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).exec();
  if (!!user) {
    return res.render("register", { errors: ["email already existant!"] });
  }

  let newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  });

  await newUser.encryptPassword();
  newUser = await newUser.save();

  res.redirect("/login");
});

router.get("/logout", async (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
});

module.exports = router;
