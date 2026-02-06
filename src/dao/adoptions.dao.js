import { AdoptionModel } from "../models/adoption.model.js";

export class AdoptionsDAO {
  findAll() {
    return AdoptionModel.find().populate("user").populate("pet").lean();
  }

  findById(id) {
    return AdoptionModel.findById(id).populate("user").populate("pet").lean();
  }

  createOne(doc) {
    return AdoptionModel.create(doc);
  }

  deleteById(id) {
    return AdoptionModel.findByIdAndDelete(id).lean();
  }
}
