import Client from "../models/clientModel.js";
import Location from "../models/locationModel.js";

export const addLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
    if (!client) return res.status(404).json({ msg: "Client not found" });

    
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};
