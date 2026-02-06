import bcrypt from "bcrypt";
import { UsersService } from "../services/users.service.js";

const usersService = new UsersService();
const SALT_ROUNDS = 10;

export class UsersController {
  static async getAll(req, res) {
    try {
      const users = await usersService.getAll();
      return res.json({ status: "success", payload: users });
    } catch (err) {
      return res.status(500).json({ status: "error", message: "Failed to fetch users", error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { email, role } = req.body;

      if (!email) return res.status(400).json({ status: "error", message: "email is required" });

      const password = await bcrypt.hash("coder123", SALT_ROUNDS);

      const created = await usersService.create({
        email,
        role: role === "admin" ? "admin" : "user",
        password,
        pets: []
      });

      return res.status(201).json({ status: "success", message: "User created", payload: created });
    } catch (err) {
      // error típico: duplicado por unique email
      if (err.code === 11000) {
        return res.status(409).json({ status: "error", message: "Email already exists" });
      }
      return res.status(500).json({ status: "error", message: "Failed to create user", error: err.message });
    }
  }
}
