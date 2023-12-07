import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    serviceType: { type: Object, required: true },
    serviceName: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
