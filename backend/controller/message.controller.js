import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { sanitizeString } from "../utils/trimAndSanitize.js";

export const getAllMessages = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const user = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    res.status(200).json({ message: "all users", user });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching all users" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id } = req.params;
    const { page = 1, limit = 15 } = req.query;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: id },
        { senderId: id, receiverId: myId },
      ],
    })
      .sort({ createdAt: -1 }) // newest first
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      message: "all chats with the user",
      messages,
      hasMore: messages.length === parseInt(limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching messages" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const sanitizedText = sanitizeString(text);

    if (!text && !image) {
      return res.status(400).json({ message: "Image or text is required!" });
    }

    if (senderId.equals(receiverId)) {
      return res
        .status(400)
        .json({ message: "Cannot send message to yourself" });
    }

    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(400).json({ message: "Receiver not found" });
    }

    let imageUrl;

    if (image) {
      const uploaded = await cloudinary.uploader.upload(image);
      imageUrl = uploaded.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text: sanitizedText,
      image: imageUrl,
    });
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json({ message: "Message sent successfully!", newMessage });
  } catch (error) {
    res.status(500).json({ message: "Server error sending message" });
  }
};

export const chatPartnerId = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: loggedInUser }, { receiverId: loggedInUser }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUser.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    });

    res.status(200).json({
      message: "All users you have chatted with.",
      chatPartners,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Server error while fetching users you have chatted with",
    });
  }
};
