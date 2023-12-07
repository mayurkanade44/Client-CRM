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

export const getAllService = async (req, res) => {
  try {
    const allServices = await Admin.find();

    const service = allServices.filter(
      (item) => item.serviceType.label === "Service"
    );
    const product = allServices.filter(
      (item) => item.serviceType.label === "Product"
    );

    return res.json({ allServices, service, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const editService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Admin.findById(id);
    if (!service)
      return res.status(404).json({ msg: "Service/Product not found" });

    service.serviceType = req.body.serviceType;
    service.serviceName = capitalLetter(req.body.serviceName);

    await service.save();

    return res.json({ msg: "Successfully updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Admin.findById(id);
    if (!service)
      return res.status(404).json({ msg: "Service/Product not found" });

    await Admin.findByIdAndDelete(id);

    return res.json({ msg: "Successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};
