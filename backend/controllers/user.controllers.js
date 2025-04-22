import UserModel from "../models/user.modules.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// create token
const createToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user
const registerUser = async function (req, res) {
  const { name, email, password } = req.body;

  try {
    // if user already exists
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: `User already exists with "${email}"`,
      });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: `Enter a valid email`,
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: `Password is less than 8 characters`,
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = new UserModel({
      name: String(name).toLowerCase(),
      email: String(email).toLowerCase(),
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Error at registering the user", error);
    res.json({
      success: false,
      message: "Error at registering the user",
    });
  }
};

// Login user
const loginUser = async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: `User not exists with "${email}" >> please create a newaccount`,
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.json({
        success: false,
        message: `Invalid password`,
      });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("Error at user login", error);
    res.json({
      success: true,
      message: "Error at user login",
    });
  }
};

export { loginUser, registerUser };
