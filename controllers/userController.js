import User from "../models/userModel.js";
import { capitalLetter, generateToken } from "../utils/helperFunction.js";

export const registerUser = async (req, res) => {
  const { name, password, email, department } = req.body;
  try {
    if (!name || !password || !email)
      return res.status(400).json({ msg: "Please provide required values" });

    const type = req.user.type;
    const client = req.user.client;

    const userExists = await User.findOne({ email, client, type });
    if (userExists)
      return res.status(400).json({ msg: "User details already exists" });

    const user = await User.create({
      name: capitalLetter(name),
      email,
      password,
      role: req.user.role === "Admin" ? "PestEmployee" : "ClientEmployee",
      department: department || "Pest Control",
      type,
      client,
    });

    return res.status(201).json({ msg: `${user.name} is created` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ msg: "Please provide required values" });

    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      generateToken(res, user._id);

      return res.json({
        _id: user._id,
        name: user.name,
        role: user.role,
        type: user.type,
      });
    } else res.status(400).json({ msg: "Invalid credentials" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ msg: "Logged out successfully" });
};
