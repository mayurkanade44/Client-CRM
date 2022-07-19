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
        msg: "Given email id already exists. Try different email id.",
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

    const user = await HotelEmployee.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Email Id" });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }
    const userHotel = user.hotel.toString().replace(/ObjectId\("(.*)"\)/, "$1");
    if (hotel !== userHotel) {
      return res
        .status(400)
        .json({ msg: "User is not registered in the selected hotel" });
    }

    const token = await user.createJWT();
    res.status(200).json({ token, msg: "logged in" });
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
