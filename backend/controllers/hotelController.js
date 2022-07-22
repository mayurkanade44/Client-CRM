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
    const location = await TreatmentLocation.findById(id);

    if (!location) {
      return res.status(404).json({ msg: "Location not found" });
    }

    const loc = await TreatmentLocation.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
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
    res.status(200).json(hotels);
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
    const hotel = await Hotel.findOne({ _id: id }).populate("employees");
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
    res.status(200).json({ hotel: hotel._id, token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};
