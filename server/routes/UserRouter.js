import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const router = Router();

router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

router.post("/users", async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: "Username or email already exists" });
  }
});

router.post("/predictions", async (req, res) => {
  const { userId, winnerId, topScorerId } = req.body;

  try {
    const prediction = await prisma.prediction.create({
      data: {
        userId,
        winnerId,
        topScorerId,
      },
    });
    res.status(201).send(prediction);
  } catch (error) {
    res.status(400).send({ error: "Failed to create prediction" });
  }
});

router.get("/leaderboard", async (req, res) => {
  const leaderboard = await prisma.leaderboard.findMany({
    include: {
      user: true,
    },
    orderBy: {
      points: "desc",
    },
  });
  res.send(leaderboard);
});

export { router as UserRouter };
