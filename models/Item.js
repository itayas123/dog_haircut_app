const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date_time: {
    type: Date,
    required: true
  },
  hour_time: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = Item = mongoose.model("item", ItemSchema);
