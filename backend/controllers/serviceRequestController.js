import ServiceRequest from "../models/ServiceRequest.js";

export const createServiceRequest = async (req, res) => {
  const { floor, locations, pestService, hotel, employee } = req.body;

  try {
    if (!floor || !locations || !pestService || !hotel || !employee) {
      return res.status(400).json({ msg: "Please provide all values" });
    }

    let sr = `SR - ${Math.floor(1 + Math.random() * 9000)}`,
      unique = true;

      
    while (unique) {
      const alreadySR = await ServiceRequest.findOne({ SRNumber: sr });
      if (alreadySR) {
        sr = `SR - ${Math.floor(1 + Math.random() * 9000)}`;
      } else {
        unique = false;
      }
    }

    req.body.SRNumber = sr;

    const serviceReq = await ServiceRequest.create(req.body);
    res.status(201).json({
      msg: `Your service request number is ${serviceReq.SRNumber}`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};
