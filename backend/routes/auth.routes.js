import express from "express";
import {
  signIn,
  signOut,
  signUp,
  updateProfile,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { User } from "../models/user.model.js";
const router = express.Router();

router.use(arcjetProtection);
// router.get("/test", (req, res) => {
//   res.json("hello");
// });
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/sign-out", signOut);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check-user", protectRoute, async (req, res) => {
  const loggedIn = req.user._id;
  const user = await User.findById(loggedIn).select("-password");
  if (!user) return res.status(400).json({ message: "User not found" });

  res.status(200).json({ user });
});

export default router;
