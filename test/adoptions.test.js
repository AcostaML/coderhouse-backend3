import { expect } from "chai";
import request from "supertest";
import dotenv from "dotenv";
import { connectDB } from "../src/config/db.js";
import { buildApp } from "../src/app.js";

import { UserModel } from "../src/models/user.model.js";
import { PetModel } from "../src/models/pet.model.js";
import { AdoptionModel } from "../src/models/adoption.model.js";
import bcrypt from "bcrypt";

dotenv.config();

describe("Functional tests - adoption.router.js", function () {
  let app;
  let server;
  let base;

  let userId;
  let petId;
  let adoptionId;

  before(async function () {
    await connectDB();
    app = buildApp();
    server = app.listen(0); // puerto random
    base = request(server);

    // limpiar colecciones para test
    await AdoptionModel.deleteMany({});
    await PetModel.deleteMany({});
    await UserModel.deleteMany({});

    const password = await bcrypt.hash("coder123", 10);
    const user = await UserModel.create({ email: "test@mail.com", role: "user", password, pets: [] });
    userId = String(user._id);

    // pet necesita owner
    const pet = await PetModel.create({ type: "dog", owner: user._id, name: "Firulais" });
    petId = String(pet._id);
  });

  after(async function () {
    await AdoptionModel.deleteMany({});
    await PetModel.deleteMany({});
    await UserModel.deleteMany({});
    await server.close();
  });

  it("GET /api/adoptions -> success", async function () {
    const res = await base.get("/api/adoptions");
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload).to.be.an("array");
  });

  it("POST /api/adoptions -> error (missing fields)", async function () {
    const res = await base.post("/api/adoptions").send({});
    expect(res.status).to.equal(400);
    expect(res.body.status).to.equal("error");
  });

  it("POST /api/adoptions -> error (invalid ObjectId)", async function () {
    const res = await base.post("/api/adoptions").send({ userId: "123", petId: "456" });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("El id no es un ObjectId valido");
  });

  it("POST /api/adoptions -> success", async function () {
    const res = await base.post("/api/adoptions").send({ userId, petId });
    expect(res.status).to.equal(201);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload).to.have.property("_id");
    adoptionId = res.body.payload._id;
  });

  it("GET /api/adoptions/:id -> error (invalid ObjectId)", async function () {
    const res = await base.get("/api/adoptions/xxx");
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal("El id no es un ObjectId valido");
  });

  it("GET /api/adoptions/:id -> success", async function () {
    const res = await base.get(`/api/adoptions/${adoptionId}`);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload).to.have.property("_id");
  });

  it("GET /api/adoptions/:id -> not found", async function () {
    const fakeId = "000000000000000000000000";
    const res = await base.get(`/api/adoptions/${fakeId}`);
    expect(res.status).to.equal(404);
    expect(res.body.status).to.equal("error");
  });

  it("DELETE /api/adoptions/:id -> success", async function () {
    const res = await base.delete(`/api/adoptions/${adoptionId}`);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
  });

  it("DELETE /api/adoptions/:id -> not found", async function () {
    const fakeId = "000000000000000000000000";
    const res = await base.delete(`/api/adoptions/${fakeId}`);
    expect(res.status).to.equal(404);
    expect(res.body.status).to.equal("error");
  });
});
