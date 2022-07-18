import express from "express";
import Hotel from "../models/Hotels.js";

export const hotelRegister = async (req, res) => {
  const { hotelName, hotelEmail, hotelAddress, password } = req.body;

  try {
    const hotel = await Hotel.findOne({ $or: [{ hotelName }, { hotelEmail }] });

    if (hotel) {
      return res
        .status(400)
        .json({ msg: "Hotel name Or hotel email already exists" });
    }

    const newHotel = await Hotel.create({
      hotelName,
      hotelAddress,
      hotelEmail,
      password,
    });

    res.status(201).json({ msg:`${hotelName} is successfully added` });
  } catch (error) {
    console.log(error);
  }
};
export const hotelLogin = async (req, res) => {
  const { hotelEmail, password } = req.body;

  try {
    const hotel = await Hotel.findOne({ hotelEmail });

    if (!hotel) {
      return res.status(404).json({
        msg: "There is no hotel registered with this email id. Please contact EPCORN Admin",
      });
    }

    const isPasswordMatch = await hotel.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = await hotel.createJWT();
    res.status(200).json({ hotel: hotel._id, token });
  } catch (error) {
    console.log(error);
  }
};
