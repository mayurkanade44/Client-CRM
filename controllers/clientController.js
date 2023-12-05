import Client from "../models/clientModel.js";
import User from "../models/userModel.js";

export const registerClient = async (req, res) => {
  const { name, address, contractNo, email, password } = req.body;
  try {
    if (!name || !address || !contractNo || !email || !password)
      return res.status(400).json({ msg: "Please provide required values" });

    const clientExists = await Client.findOne({ name, email });
    if (clientExists)
      return res.status(400).json({ msg: "Client already exists" });

    const client = await Client.create({
      name,
      address,
      contractNo,
      email,
    });

    const user = await User.create({
      email,
      password,
      name,
      role: "Client Admin",
      type: "Client Employee",
      hotel: client._id,
    });

    res.status(201).json({ msg: `${user.name} has been created` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};
