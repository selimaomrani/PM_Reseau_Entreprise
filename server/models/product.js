const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const productSchema = new Schema({});

module.exports = mongoose.model("Product", productSchema);
