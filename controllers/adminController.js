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

    const servName = capitalLetter(serviceName);

    await Admin.create({
      serviceType,
      serviceName: { label: servName, value: servName },
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

    const services = [];
    const products = [];

    allServices.map(
      (item) =>
        (item.serviceType.label === "Product" &&
          products.push(item.serviceName)) ||
        (item.serviceType.label === "Service" &&
          services.push(item.serviceName))
    );

    return res.json({ allServices, services, products });
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

    const serviceName = capitalLetter(req.body.serviceName);

    service.serviceType = req.body.serviceType;
    service.serviceName = { label: serviceName, value: serviceName };

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
