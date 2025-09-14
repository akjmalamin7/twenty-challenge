const bcrypt = require("bcrypt");
const UserModel = require("../../models/users/userModel");
exports.createUser = async (req, res) => {
  const { email, firstName, lastName, mobile, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "Failed",
        message: "User already exists.",
      });
    }

    // Hash password first
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with hashed password
    const user = new UserModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobile: mobile,
      password: hashedPassword, // Use hashed password
    });

    const result = await user.save();

    // Generate token AFTER user is saved
    const token = user.generateJWT();

    return res.status(201).json({
      status: "Success",
      message: "Registration successful",
      token: token,
      data: {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        mobile: result.mobile,
      },
    });
  } catch (err) {
    console.error("Registration error:", err); // Log the actual error
    return res.status(400).json({
      status: "Failed",
      message: "Registration failed!",
      error: err.message, // Include error message for debugging
    });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "Failed",
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "Failed",
        message: "Incorrect password",
      });
    }

    const token = user.generateJWT();
    const userData = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
    };

    res.status(200).json({
      status: "Success",
      message: "Login successful",
      token: token,
      data: userData,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      status: "Failed",
      message: "Login failed",
      error: err.message,
    });
  }
};
