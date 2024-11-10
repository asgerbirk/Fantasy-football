import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();

router.get("/", authenticateToken, getUsers);

router.get("/:id", authenticateToken, getUserById);

router.put("/:id", authenticateToken, updateUser);

router.delete("/:id", authenticateToken, deleteUser);

export default router;
