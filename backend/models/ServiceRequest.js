import mongoose from "mongoose";

const ServiceRequestSchema = new mongoose.Schema(
  {
    SRNumber: { type: String },
    floor: { type: String, required: true },
    locations: { type: String, required: true },
    pestService: { type: String, required: true },
    otherDetails: { type: String },
    status: { type: String, default: "Open" },
    operatorComment: [String],
    images: [String],
    hotel: { type: mongoose.Types.ObjectId, ref: "Hotel", required: true },
    employee: {
      type: mongoose.Types.ObjectId,
      ref: "HotelEmployee",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ServiceRequest", ServiceRequestSchema);
