import { Request, Response } from "express";
import * as UserService from "../services/UserService.js";

export async function createUser(req: Request, res: Response) {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
}
