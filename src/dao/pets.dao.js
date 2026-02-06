import { PetModel } from "../models/pet.model.js";

export class PetsDAO {
  async createMany(pets) {
    return PetModel.insertMany(pets, { ordered: true });
  }

  async findAll() {
    return PetModel.find().populate("owner").lean();
  }

  async findById(id) {
    return PetModel.findById(id).populate("owner").lean();
  }

  async createOne(pet) {
    return PetModel.create(pet);
  }

  async updateById(id, update) {
    return PetModel.findByIdAndUpdate(id, update, { new: true }).populate("owner").lean();
  }

  async deleteById(id) {
    return PetModel.findByIdAndDelete(id).lean();
  }
}
