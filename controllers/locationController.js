import Client from "../models/clientModel.js";
import Location from "../models/locationModel.js";

export const addLocation = async (req, res) => {
  const { floor, subLocation, location, clientId } = req.body;
  try {
    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ msg: "Client not found" });

    const locationExist = await Location.findOne({
      floor,
      subLocation,
      location,
    });
    if (locationExist)
      return res.status(400).json({ msg: "Location already exist" });

    const newLocation = await Location.create({
      floor,
      subLocation,
      location,
      service: req.body.service,
      product: req.body.product,
      client: client._id,
      qr: "qr",
    });

    return res.status(201).json({ msg: "Location added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};
