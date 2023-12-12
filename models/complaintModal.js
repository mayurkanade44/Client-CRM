import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    service: { type: Array, required: true },
    status: { type: String, default: "Open" },
    employeeName: { type: Object, required: true },
    image: [String],
    comment: { type: String },
    update: [
      {
        image: [String],
        employeeName: { type: Object, required: true },
        date: { type: Date },
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

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
