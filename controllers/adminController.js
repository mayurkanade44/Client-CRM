import Admin from "../models/adminModel.js";
import { capitalLetter } from "../utils/helperFunction.js";

export const addService = async (req, res) => {
  const { serviceName, serviceType } = req.body;
  try {
    if (!serviceName || !serviceType)
      return res.status(400).json({ msg: "Please provide required values" });

    const service = await Admin.findOne({ serviceName });
    if (service)
      return res.status(400).json({ msg: `${serviceName} already exists` });

    await Admin.create({
      serviceType,
      serviceName: capitalLetter(serviceName),
    });

    res.status(201).json({ msg: `${serviceName} successfully added` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};
