import EpcornUser from "../models/EpcornUser.js";

export const register = async (req, res) => {
  const { name, password } = req.body;
  try {
    if (!name || !password) {
      return res.status(400).json({ msg: "Please provide all values" });
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
