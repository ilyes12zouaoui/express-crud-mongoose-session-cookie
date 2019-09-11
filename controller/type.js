const express = require("express");
const router = express.Router();

const Type = require("../model/type");
const Blog = require("../model/blog");

const _ = require("lodash");

//get create
router.get("/create", (req, res) => {
  return res.render("types/create");
});

//get list
router.get("/", async (req, res) => {
  let searchQuery = {};
  if (req.query.name) {
    searchQuery.name = req.query.name;
  }
  const types = await Type.find(searchQuery).exec();

  res.render("types/index", { types: types });
});

///get update
router.get("/update/:id", async (req, res) => {
  const type = await Type.findById(req.params.id);
  console.log("type :", type);
  return res.render(`types/update`, { type: type });
});

//get delete
router.get("/delete/:id", async (req, res) => {
  await Blog.deleteMany({ type: req.params.id });
  await Type.deleteOne({ _id: req.params.id });
  await res.redirect("/types");
});

//post create
router.post("/create", async (req, res) => {
  const type = new Type({ name: req.body.name });
  await type.save();

  res.redirect("/types");
});

//post update
router.post("/update/:id", async (req, res) => {
  await Type.update(
    { _id: req.params.id },
    {
      $set: { ...req.body }
    }
  );
  res.redirect("/types");
});

//get search
router.get;

//get by id or search
router.get("/:id", async (req, res) => {
  const type = await Type.findById(req.params.id);
  res.render("types/detail", { type: type });
});

module.exports = router;
