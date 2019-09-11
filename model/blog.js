const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  isStolen: {
    type: Boolean,
    required: true
  },
  stolenSource: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: false,
    default: Date.now()
  }
});

module.exports = new mongoose.model("Blog", BlogSchema);
