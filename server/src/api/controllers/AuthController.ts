import { Request, Response } from "express";
import * as AuthService from "../services/AuthService.js";

export async function register(req: Request, res: Response) {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const token = await AuthService.login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

export async function refreshToken(req: Request, res: Response) {
  try {
    const newToken = await AuthService.refreshToken(req.body);
    res.status(200).json({ token: newToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const result = await AuthService.logout(req.body.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
