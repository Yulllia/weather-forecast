const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  googleId: {
    type: String,
    required: false,
  },
  defaultValue: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("list", ListSchema);
