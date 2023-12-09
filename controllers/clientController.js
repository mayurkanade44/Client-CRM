import Client from "../models/clientModel.js";
import User from "../models/userModel.js";
import { capitalLetter } from "../utils/helperFunction.js";

export const registerClient = async (req, res) => {
  const { name, address, contractNo, email, password } = req.body;
  try {
    if (!name || !address || !contractNo || !email || !password)
      return res.status(400).json({ msg: "Please provide required values" });

    let capitalName = capitalLetter(name);

    const clientExists = await Client.findOne({
      $or: [{ name: capitalName }, { email }],
    });

    if (clientExists)
      return res.status(400).json({ msg: "Client already exists" });

    const client = await Client.create({
      name: capitalLetter(name),
      address,
      contractNo,
      email,
    });

    const user = await User.create({
      email,
      password,
      name,
      role: "ClientAdmin",
      type: "ClientEmployee",
      client: client._id,
    });

    res.status(201).json({ msg: `${user.name} has been created` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const getAllClient = async (req, res) => {
  try {
    const clients = await Client.find();

    return res.json(clients);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};
