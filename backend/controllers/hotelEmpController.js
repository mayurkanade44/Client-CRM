import HotelEmployee from "../models/HotelEmployee.js";

export const employeeRegister = async (req, res) => {
  const { name, email, department, password } = req.body;

  try {
    if (!name || !department || !password || !email) {
      return res.status(400).json({ msg: "Please enter all values" });
    }

    const alreadyExists = await HotelEmployee.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json({
        msg: "Given email id already exists.",
      });
    }

    const emp = await HotelEmployee.create(req.body);
    res.status(201).json({ msg: `${name} has been added`, emp });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const employeeLogin = async (req, res) => {
  const { email, password, hotel } = req.body;

  try {
    if (!password || !email || !hotel) {
      return res.status(400).json({ msg: "Please enter all values" });
    }

    const user = await HotelEmployee.findOne({ email, hotel });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid email or Selected wrong hotel" });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = await user.createJWT();
    res.status(200).json({
      user: {
        hotelId: user.hotel,
        name: user.name,
        role: user.hotelAdmin,
        token: token,
      },
      msg: "logged in",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const employeeDeletion = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await HotelEmployee.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ msg: "Employee not found" });
    }

    await user.remove();
    res.status(200).json({ msg: "Employee removed" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const getAllEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employees = await HotelEmployee.find({ hotel: id });
    if (employees.length === 0) {
      return res.status(200).json({ msg: "No employee registered yet" });
    }
    res.status(200).json({ employees });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};
