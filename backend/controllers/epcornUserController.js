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
    res.status(201).json({ msg: `${user.name} is created` });
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

    res.status(201).json({ user: { name: user.name, role: user.role }, token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};
