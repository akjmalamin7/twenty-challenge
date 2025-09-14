const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const UserSchemaModel = new Schema(
  {
    firstName: { type: String, require: true, minlength: 2, maxlength: 255 },
    lastName: { type: String, require: true, minlength: 2, maxlength: 255 },
    email: {
      type: String,
      require: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    mobile: {
      type: String,
      require: true,
      minlength: 11,
      maxlength: 11,
      photo: {
        type: String,
      },
    },
    password: {
      type: String,
      minlength: 4,
      maxlength: 1024,
    },
  },
  { versionKey: false, timestamps: true }
);

UserSchemaModel.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: "12h" }
  );
  return token;
};
const UserModel = model("Users", UserSchemaModel);
module.exports = UserModel;
