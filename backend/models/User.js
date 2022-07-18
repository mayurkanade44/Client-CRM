import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    department: { type: String, required: true },
    password: { type: String, required: true },
    hotel: { type: mongoose.Types.ObjectId, ref: "Hotels", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", User);
