const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    key: { type: String, require: true },
    name: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
