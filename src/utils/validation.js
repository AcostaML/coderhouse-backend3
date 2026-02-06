import mongoose from "mongoose";

export function assertObjectId(id) {
  if (!mongoose.isValidObjectId(id)) {
    const err = new Error("El id no es un ObjectId valido");
    err.statusCode = 400;
    throw err;
  }
}
