import { Request, Response } from "express";
import * as UserService from "../services/UserService.js";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    if (!Number(id)) {
      res.status(400).send({ error: "Invalid ID" });
      return;
    }

    const user = await UserService.getUserById(Number(id));
    if (!user) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve user" });
  }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    if (!Number(id)) {
      res.status(400).send({ error: "Invalid  ID" });
      return;
    }

    const updatedUser = await UserService.updateUser(Number(id), req.body);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ error: error.message || "Failed to update user" });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    if (!Number(id)) {
      res.status(400).send({ error: "Invalid  ID" });
      return;
    }

    await UserService.deleteUser(Number(id));
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete user" });
  }
}
