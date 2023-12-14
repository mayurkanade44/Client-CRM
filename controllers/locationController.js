import Client from "../models/clientModel.js";
import Location from "../models/locationModel.js";
import Service from "../models/serviceModel.js";
import { qrCodeGenerator, uploadFile } from "../utils/helperFunction.js";
import fs from "fs";

let locationId = null;
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

    const newLocation = await Location.create({
      floor,
      subLocation,
      location,
      service: req.body.service.length > 0 ? req.body.service : [],
      product: req.body.product.length > 0 ? req.body.product : [],
      client: client._id,
    });
    locationId = newLocation._id;

    const qrData = await qrCodeGenerator({
      link: `https://www.pestXz/location/${locationId}`,
      floor,
      location: `${subLocation}, ${location}`,
    });
    if (!qrData) {
      await Location.findByIdAndDelete(locationId);
      locationId = null;
      return res
        .status(400)
        .json({ msg: "QR generation error. Try again later" });
    }

    fs.writeFileSync("./tmp/qr.jpeg", qrData);

    const qrLink = await uploadFile({ filePath: "./tmp/qr.jpeg" });
    if (!qrLink) {
      await Location.findByIdAndDelete(locationId);
      locationId = null;
      return res.status(400).json({ msg: "QR upload error. Try again later" });
    }

    newLocation.qr = qrLink;
    await newLocation.save();
    locationId = null;

    return res.status(201).json({ msg: "Location added successfully" });
  } catch (error) {
    if (locationId) {
      await Location.findByIdAndDelete(locationId);
      locationId = null;
    }
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

export const updateLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findById(id);
    if (!location) return res.status(404).json({ msg: "Location not found" });

    location.floor = req.body.floor;
    location.subLocation = req.body.subLocation;
    location.location = req.body.location;
    location.service = req.body.service;
    location.product = req.body.product;

    await location.save();
    return res.json({ msg: "Updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findById(id);
    if (!location) return res.status(404).json({ msg: "Location not found" });

    await Location.findByIdAndDelete(id);
    return res.json({ msg: "Location & all its records deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const getLocationDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findById(id);
    if (!location)
      return res.status(404).json({ msg: "Location not found, contact admin" });

    const complaints = await Service.find({
      type: "Complaint",
      location: id,
      "complaintDetails.status": { $ne: "Close" },
    });

    let lastServices = [];
    if (req.user.type === "ClientEmployee") {
      const ser = await Service.find({ location: id })
        .sort("-updatedAt")
        .limit(10);
      for (let service of ser) {
        if (service.type === "Regular")
          lastServices.push({
            id: service._id,
            type: service.type,
            date: service.updatedAt,
            pest: service.regularService.map((item) => item.name),
            status: "NA",
          });
        else if (
          service.type === "Complaint" &&
          service.complaintDetails.status !== "Open"
        ) {
          lastServices.push({
            id: service._id,
            type: service.type,
            date: service.updatedAt,
            pest: service.complaintDetails.service,
            status: service.complaintDetails.status,
          });
        }

        if (lastServices.length === 3) break;
      }
    }

    return res.json({ location, complaints, lastServices });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};
