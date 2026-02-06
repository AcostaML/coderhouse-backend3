import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    password: { type: String, required: true }, // hasheada
    role: { type: String, enum: ["user", "admin"], required: true },
    pets: { type: [mongoose.Schema.Types.ObjectId], ref: "Pet", default: [] }, // array vacío por defecto
    email: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", userSchema);
