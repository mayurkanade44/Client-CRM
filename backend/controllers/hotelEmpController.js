import HotelEmployee from "../models/HotelEmployee.js";

export const employeeRegister = async (req, res) => {
  const { name, email, department, password } = req.body;

  try {
    if (!name || !department || !password || !email) {
      return res.status(400).json({ msg: "Please enter all values" });
    }

    const alreadyExists = await HotelEmployee.findOne({ email });
    if (alreadyExists) {
      return res
        .status(400)
        .json({
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

export const employeeLogin  =  async (req, res) => {
    const {email, password, hotel} = req.body

    try {
        if (!password || !email || !hotel) {
          return res.status(400).json({ msg: "Please enter all values" });
        }
        
    } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ msg: "Something went wrong, please try again later" });
    }
}
