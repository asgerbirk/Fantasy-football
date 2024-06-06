import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
export const router = Router();

router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

router.post("/users", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: "Username already exists" });
  }
});

export { router as UserRouter };
