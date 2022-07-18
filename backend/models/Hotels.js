import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const HotelSchema = new mongoose.Schema(
  {
    hotelName: { type: String, required: true },
    hotelAddress: { type: String, required: true },
    hotelEmail: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

HotelSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
HotelSchema.methods.comparePassword = async function (password) {
  const isMath = await bcrypt.compare(password, this.password);
  return isMath;
};
HotelSchema.methods.createJWT = async function () {
  return jwt.sign({ hotelId: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model("Hotel", HotelSchema);
