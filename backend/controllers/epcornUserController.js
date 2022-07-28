import EpcornUser from "../models/EpcornUser.js";

export const register = async (req, res) => {
  const { name, password } = req.body;
  try {
    if (!name || !password) {
      return res.status(400).json({ msg: "Please provide all values" });
    }
    const alreadyUser = await EpcornUser.findOne({ name });
    if (alreadyUser) {
      return res.status(400).json({ msg: "Name already exists" });
    }

    const user = await EpcornUser.create(req.body);
    res.status(201).json({ msg: `${user.name} has been registered` });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    if (!name || !password) {
      return res.status(400).json({ msg: "Please provide all values" });
    }

    const user = await EpcornUser.findOne({ name });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Name" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    const token = await user.createJWT();

    res.status(201).json({
      user: { name: user.name, role: user.role, userId: user._id },
      token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await EpcornUser.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await EpcornUser.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    await EpcornUser.findOneAndDelete({ _id: id });
    res.status(200).json({ msg: "User has been deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};
