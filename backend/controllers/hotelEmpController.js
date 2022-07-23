import HotelEmployee from "../models/HotelEmployee.js";

export const employeeRegister = async (req, res) => {
  const { name, username, department, password } = req.body;

  try {
    if (!name || !department || !password || !username) {
      return res.status(400).json({ msg: "Please enter all values" });
    }

    const alreadyExists = await HotelEmployee.findOne({ username });
    if (alreadyExists) {
      return res.status(400).json({
        msg: "Given username already exists. Try different username.",
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
  const { username, password, hotel } = req.body;

  try {
    if (!password || !username || !hotel) {
      return res.status(400).json({ msg: "Please enter all values" });
    }

    const user = await HotelEmployee.findOne({ username, hotel });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid username or Selected wrong hotel" });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // const userHotel = user.hotel.toString().replace(/ObjectId\("(.*)"\)/, "$1");
    // if (hotel !== userHotel) {
    //   return res
    //     .status(400)
    //     .json({ msg: "User is not registered in the selected hotel" });
    // }

    const token = await user.createJWT();
    res.status(200).json({ token, hotel, msg: "logged in" });
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
