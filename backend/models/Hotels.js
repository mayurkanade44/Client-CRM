import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const HotelSchema = new mongoose.Schema(
  {
    hotelName: { type: String, required: true },
    hotelAddress: { type: String, required: true },
    contractNo: { type: String, required: true },
    billToAddress: { type: String, required: true },
    hotelEmail: { type: String, required: true },
    role: { type: String, default: "Hotel Admin" },
    password: { type: String, required: true },
    floor: [String],
    locations: [String],
    pestService: [String],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

HotelSchema.virtual("employees", {
  ref: "HotelEmployee",
  localField: "_id",
  foreignField: "hotel",
  justOne: false,
});

HotelSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
HotelSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
HotelSchema.methods.createJWT = async function () {
  return jwt.sign({ hotelId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model("Hotel", HotelSchema);
