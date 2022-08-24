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
    const sr = await ServiceRequest.findOne({ _id: id }).populate({
      path: "employee",
      select: "name department",
    });
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

export const updateSingleSR = async (req, res) => {
  const { id } = req.params;
  const { comment, status } = req.body;
  try {
    const sr = await ServiceRequest.findOne({ _id: id });
    if (!sr) {
      return res
        .status(404)
        .json({ msg: "No service request with this number" });
    }

    if (sr.status === "Close") {
      return res.status(400).json({ msg: "SR already closed" });
    }

    sr.operatorComment.push(comment);
    sr.status = status;

    await sr.save();
    res.status(200).json({ msg: "SR has been updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const allEmployeeSR = async (req, res) => {
  const { id } = req.params;
  const { search, status } = req.query;

  const queryObject = {
    employee: id,
  };
  if (search) {
    queryObject.SRNumber = { $regex: search, $options: "i" };
  }
  if (status && status !== "All Requests") {
    queryObject.status = status;
  }

  try {
    const sr = await ServiceRequest.find(queryObject).sort("-createdAt");
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
  const { search, status } = req.query;

  try {
    const queryObject = {
      hotel: id,
    };

    if (search) {
      queryObject.SRNumber = { $regex: search, $options: "i" };
    }
    if (status && status !== "All Requests") {
      queryObject.status = status;
    }

    let requests = ServiceRequest.find(queryObject)
      .populate({
        path: "employee",
        select: "name department",
      })
      .sort("-createdAt");

    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * 5;
    requests = requests.skip(skip).limit(5);

    const sr = await requests;
    const totalSR = await ServiceRequest.countDocuments(queryObject);
    const numPages = Math.ceil(totalSR / 5);

    res.status(200).json({ sr, totalSR, numPages });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const serviceStats = async (req, res) => {
  const { id } = req.params;
  try {
    const services = await ServiceRequest.find({ hotel: id });

    const serviceNames = ["Green Shield", "Ratrid", "Bedbugs", "Termiproof"];

    const serviceCount = [];
    for (let service of serviceNames) {
      const count = services.filter((item) =>
        item.pestService.includes(service)
      ).length;
      if (count > 0) {
        serviceCount.push({ name: service, y: count });
      }
    }
    res.status(200).json({ serviceCount });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};
