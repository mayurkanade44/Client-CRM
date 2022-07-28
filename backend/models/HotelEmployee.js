import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const HotelEmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "Hotel Employee" },
    hotel: { type: mongoose.Types.ObjectId, ref: "Hotel", required: true },
  },
  { timestamps: true }
);

HotelEmployeeSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
HotelEmployeeSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
HotelEmployeeSchema.methods.createJWT = async function () {
  return jwt.sign(
    { empId: this._id, hotelId: this.hotel },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

export default mongoose.model("HotelEmployee", HotelEmployeeSchema);
