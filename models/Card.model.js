const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  text: String,
  img: String,
  openCart: {
    type: Boolean,
    default: false,
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
