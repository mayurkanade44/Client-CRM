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

export const getSingleSR = async (req, res) => {
  const { id } = req.params;

  try {
    const sr = await ServiceRequest.findOne({ _id: id });
    if (!sr) {
      return res.status(404).json({ msg: "Service Request not found" });
    }

    res.status(200).json({ sr });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const allEmployeeSR = async (req, res) => {
  const { id } = req.params;
  try {
    const sr = await ServiceRequest.find({ employee: id });
    if (sr.length === 0) {
      return res.status(404).json({ msg: "No service request created yet" });
    }

    res.status(200).json({ sr });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const allHotelSR = async (req, res) => {
  const { id } = req.params;
  try {
    const sr = await ServiceRequest.find({ hotel: id });
    if (sr.length === 0) {
      return res.status(404).json({ msg: "No service request created yet" });
    }

    res.status(200).json({ sr });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};
