const express = require("express");
const router = express.Router();

const Blog = require("../model/blog");

const Type = require("../model/type");
const User = require("../model/user");

const _ = require("lodash");

//get create
router.get("/create", async (req, res) => {
  const types = await Type.find().exec();
  return res.render("blogs/create", { types });
});

//get list
router.get("/", async (req, res) => {
  console.log("query :", req.query);
  let searchQuery = {};
  if (req.query.title) {
    searchQuery.title = req.query.title;
  }
  const blogs = await Blog.find(searchQuery)
    .populate("type")
    .populate("user")
    .exec();
  console.log("blogs :", blogs);
  res.render("blogs/index", { blogs: blogs });
});

///get update
router.get("/update/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const types = await Type.find().exec();
  return res.render(`blogs/update`, { blog: blog, types: types });
});

//get delete
router.get("/delete/:id", async (req, res) => {
  await Blog.deleteOne({ _id: req.params.id });
  await res.redirect("/blogs");
});

//post create
router.post("/create", async (req, res) => {
  const user = await User.findById(req.session.user._id).exec();
  console.log("user :", user, "our session:", req.session.user);
  let newBlog = { ...req.body, user: user };
  if (newBlog.isStolen) {
    newBlog.isStolen = true;
  } else {
    newBlog.isStolen = false;
  }
  console.log("new", newBlog);
  const blog = new Blog(newBlog);
  await blog.save();

  res.redirect("/blogs");
});

//post update
router.post("/update/:id", async (req, res) => {
  let newBlog = { ...req.body };
  if (newBlog.isStolen) {
    newBlog.isStolen = true;
  } else {
    newBlog.isStolen = false;
    newBlog.stolenSource = "";
  }
  console.log(newBlog);
  await Blog.update(
    { _id: req.params.id },
    {
      $set: newBlog
    }
  );
  res.redirect("/blogs");
});

//get search
router.get;

//get by id or search
router.get("/:id", async (req, res) => {
  if (!req.query) {
    const blog = await Blog.findById(req.params.id);
    res.render("blogs/detail", { blog: blog });
  } else {
    console.log(req.query);
    const blogs = await Blog.find(req.query).exec();
    res.render("blogs/index", { blogs: blogs });
  }
});

module.exports = router;
