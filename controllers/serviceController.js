import Service from "../models/serviceModel.js";
import { uploadFile } from "../utils/helperFunction.js";

export const newComplaint = async (req, res) => {
  try {
    if (req.user.type === "PestEmployee")
      return res
        .status(400)
        .json({ msg: "Yoe are not allowed to raise a complaint" });

    let sr = `SR - ${Math.floor(1 + Math.random() * 9000)}`,
      unique = true;

    while (unique) {
      const alreadySR = await Service.findOne({
        "complaintDetails.number": sr,
        client: req.user.client,
      });
      if (alreadySR) {
        sr = `SR - ${Math.floor(1 + Math.random() * 9000)}`;
      } else {
        unique = false;
      }
    }

    const imageLinks = [];
    if (req.files) {
      let images = [];
      if (req.files.images.length > 0) {
        images = req.files.images;
      } else {
        images.push(req.files.images);
      }

      for (let i = 0; i < images.length; i++) {
        const link = await uploadFile({ filePath: images[i].tempFilePath });
        if (!link)
          return res
            .status(400)
            .json({ msg: "Image upload error. Try again later" });
        imageLinks.push(link);
      }
    }

    const complaint = await Service.create({
      type: "Complaint",
      complaintDetails: {
        number: sr,
        service: req.body.service,
        employeeName: req.user.name,
        image: imageLinks,
        comment: req.body.comment,
      },
      client: req.user.client,
      location: req.params.id,
    });
    return res.status(201).json({
      msg: `Your service request is ${complaint.complaintDetails.number}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const getAllClientComplaints = async (req, res) => {
  try {
    const complaints = await Service.find({
      client: req.user.client,
      type: "Complaint",
    }).populate({
      path: "location",
      select: "floor subLocation location",
    });

    return res.json(complaints);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const getSingleComplaint = async (req, res) => {
  const { id } = req.params;
  try {
    
    const complaint = await Service.findById(id);
    if (!complaint) return res.status(404).json({ msg: "Complaint not found" });

    return res.json(complaint);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error, try again later" });
  }
};
