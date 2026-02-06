import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },      // requerido por consigna
    name: { type: String },
    age: { type: Number },
    specie: { type: String },

    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export const PetModel = mongoose.model("Pet", petSchema);
