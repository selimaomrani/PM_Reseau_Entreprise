const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  productId: { type: String, required: true },
  pictureRequest: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model("User", userSchema);
