import { UserModel } from "../models/user.model.js";

export class UsersDAO {
  async createMany(users) {
    return UserModel.insertMany(users, { ordered: true });
  }

  async findAll() {
    return UserModel.find().populate("pets").lean();
  }

  async createOne(user) {
    return UserModel.create(user);
  }

  async pushPetsToUsers(userPets) {
    const ops = userPets.map(({ userId, petIds }) => ({
      updateOne: { filter: { _id: userId }, update: { $push: { pets: { $each: petIds } } } }
    }));
    if (ops.length === 0) return { modifiedCount: 0 };
    return UserModel.bulkWrite(ops);
  }
}
