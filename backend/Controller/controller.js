import { User } from "../Models/usermodel.js";
import bcrypt from "bcrypt";
import { generateTokenAndCookie } from "../Utils/jwtToken.js";

User;

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !password || !email)
      return res
        .status(400)
        .json({ success: false, message: "All field are require" });

    // validation for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ success: false, message: "Inavlid Email" });

    // validation for password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "paswrod should 6 character long",
      });
    }

    const exittingEmail = await User.findOne({ email: email });
    if (exittingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exist",
      });
    }
    const profile_img = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = profile_img[Math.floor(Math.random() * profile_img.length)];

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: email,
      password: hashedPassword,
      username: username,
      userimage: image,
    });
    generateTokenAndCookie(newUser._id, res);
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "Succesfully created new user",
      data: { ...newUser._doc, password: hashedPassword },
    });
  } catch (error) {
    // console.log("Error in signup", error);
    return res
      .status(500)
      .sjson({ success: false, messgae: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    // compare login password with hashedpassword(in database)

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }
    generateTokenAndCookie(user._id, res);

    return res.status(200).json({
      success: true,
      message: "Successfully login",
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
export async function logout(req, res) {
  try {
    res.clearCookie("jwt_token");
    return res
      .status(200)
      .json({ success: true, message: "Successfully Log out" });
  } catch (error) {
    // console.log("Error in Logout", error);
    return res.status(500).json({ success: false, message: "can't logout" });
  }
}

export async function authCheck(req, res) {
  try {
    // console.log("From Auth Check", req.user);

    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
