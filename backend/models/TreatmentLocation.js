import mongoose from "mongoose";

const HotelTreatmentLocation = new mongoose.Schema(
  {
    floor: { type: String, required: true },
    location: { type: String, required: true },
    hotel: {
      type: mongoose.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TreatmentLocation", HotelTreatmentLocation);
