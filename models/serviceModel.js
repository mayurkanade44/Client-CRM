import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    complaintDetails: {
      number: { type: String, required: true },
      service: { type: Array, required: true },
      status: { type: String, default: "Open" },
      employeeName: { type: String, required: true },
      image: [String],
      comment: { type: String },
    },
    complaintUpdate: [
      {
        image: [String],
        employeeName: { type: Object, required: true },
        date: { type: Date },
        comment: { type: String, required: true },
      },
    ],
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
