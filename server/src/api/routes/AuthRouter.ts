import { Router } from "express";

import {
  login,
  register,
  logout,
  refreshToken,
} from "../controllers/AuthController.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", refreshToken);

export default router;
