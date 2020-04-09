const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  username: {
    type: String,
    trim: true,
    min: 3
  },
  title: {
    type: String,
    trim: true
  },
  post: {
    left: {
      type: String,
      required: true,
      trim: true,
      max: 120
    },
    right: {
      type: String,
      requiredd: true,
      trim: true,
      max: 120
    }
  },
  color: {
    left: {
      type: String,
      trim: true
    },
    right: {
      type: String,
      trim: true
    }
  },
  votes: {
    left: {
      type: Number,
      default: 0
    },
    right: {
      type: Number,
      default: 0
    }
  }
});
module.exports = mongoose.model("Post", postSchema);
