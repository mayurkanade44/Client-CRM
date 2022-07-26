import Hotel from "../models/Hotels.js";

export const hotelRegister = async (req, res) => {
  const { hotelName, hotelEmail, hotelAddress, password } = req.body;

  try {
    const hotel = await Hotel.findOne({ $or: [{ hotelName }, { hotelEmail }] });

    if (hotel) {
      return res
        .status(400)
        .json({ msg: "Hotel name Or email already exists" });
    }

    const newHotel = await Hotel.create(req.body);

    res
      .status(201)
      .json({ hotel: newHotel._id, msg: `${hotelName} is successfully added` });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const hotelDeletion = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findOne({ _id: id });
    await hotel.remove();
    res.status(200).json({ msg: "Hotel removed." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const editHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const location = await Hotel.findById(id);

    if (!location) {
      return res.status(404).json({ msg: "Hotel not found" });
    }

    const loc = await Hotel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({ msg: "Treatment location updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    const hotelNames = await Hotel.find().select("hotelName");
    res.status(200).json({ hotels, hotelNames });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const singleHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findOne({ _id: id });
    if (!hotel) {
      return res.status(404).json({ msg: "Hotel not found" });
    }

    res.status(200).json({ hotel });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
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
    res.status(200).json({
      user: {
        hotel: hotel._id,
        hotelName: hotel.hotelName,
        role: hotel.hotelAdmin,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};
