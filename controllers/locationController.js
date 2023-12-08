import Client from "../models/clientModel.js";
import Location from "../models/locationModel.js";

export const addLocation = async (req, res) => {
  const { floor, subLocation, location, clientId } = req.body;
  try {
    const client = await Client.findById(clientId);
    if (!client) return res.status(404).json({ msg: "Client not found" });

    const locationExist = await Location.findOne({
      client: clientId,
      floor: { $regex: floor, $options: "i" },
      subLocation: { $regex: subLocation, $options: "i" },
      location: { $regex: location, $options: "i" },
    });
    if (locationExist)
      return res.status(400).json({ msg: "Location already exist" });

    await Location.create({
      floor,
      subLocation,
      location,
      service: req.body.service.length > 0 ? req.body.service : [],
      product: req.body.product.length > 0 ? req.body.product : [],
      client: client._id,
      qr: "qr",
    });

    return res.status(201).json({ msg: "Location added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const getAllLocations = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
    if (!client) return res.status(404).json({ msg: "Client not found" });

    const locations = await Location.find({ client: id });

    return res.json({ client, locations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};
