import { generateToken } from "../lib/generateToken.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { trimming } from "../utils/trimAndSanitize.js";
import { sendWelcomeEmail } from "../emails/email.handler.js";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";

//SIGNUP
// export const signUp = async (req, res) => {
//   const { fullName, email, password } = req.body;
//   try {
//     const trimmedName = trimming(fullName, res, false, true);
//     const trimmedEmail = trimming(email, res, true, true);
//     const trimmedPassword = trimming(password, res, false, false);
//     if (trimmedPassword.length < 6) {
//       return res
//         .status(400)
//         .json({ message: "Password must be atleast 6 chars long" });
//     }

//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailRegex.test(trimmedEmail)) {
//       return res.status(400).json({ message: "Email is not valid" });
//     }

//     const user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

//     const newUser = new User({
//       fullName: trimmedName,
//       email: trimmedEmail,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     generateToken(newUser._id, res);
//     sendWelcomeEmail(trimmedEmail, trimmedName, ENV.URL);
//     res.status(201).json({
//       user: newUser.toJSON(),
//       message: "User created successfully!",
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({ message: "Server error while creating account" });
//   }
// };

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const trimmedName = trimming(fullName, false, true);
    const trimmedEmail = trimming(email, true, true);
    const trimmedPassword = trimming(password, false, false);
    if (trimmedPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 chars long" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    const newUser = new User({
      fullName: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
    });

    await newUser.save();
    generateToken(newUser._id, res);
    sendWelcomeEmail(trimmedEmail, trimmedName, ENV.URL);
    res.status(201).json({
      user: newUser.toJSON(),
      message: "User created successfully!",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error while creating account" });
  }
};
//SIGNIN
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const trimEmail = trimming(email, true, true);
    const trimPass = trimming(password, false, false);
    const user = await User.findOne({ email: trimEmail });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const comparePassword = await bcrypt.compare(trimPass, user.password);
    if (!comparePassword)
      return res.status(400).json({ message: "Invalid credentials" });
    generateToken(user._id, res);
    res.json({ message: "Logged In", user: user.toJSON() });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error while logging in" });
  }
};

//SIGNOUT
export const signOut = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged Out" });
};

//UPDATE PROFILEPIC

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic)
      return res.status(400).json({ message: "Profile Pic is required" });

    const userId = req.user._id;
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    ).select("-password");

    res
      .status(200)
      .json({ message: "Profile pic uploaded", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error adding profile pic" });
  }
};
