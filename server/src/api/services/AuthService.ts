import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_EXPIRATION = "1h";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
const REFRESH_TOKEN_EXPIRATION = "3d";

export function validateUsername(username: string) {
  if (!username || username.trim().length < 3) {
    throw new Error("Username must contain at least 3 non-space characters");
  }

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (!usernameRegex.test(username)) {
    throw new Error("Username must contain only alphanumeric characters");
  }

  return true;
}

export function validatePassword(password: string) {
  if (!password || password.trim() === "") {
    throw new Error("Password is required");
  }

  return true;
}

export async function register(data: { username: string; password: string }) {
  validateUsername(data.username);
  validatePassword(data.password);

  const existingUser = await prisma.user.findUnique({
    where: { username: data.username },
  });

  if (existingUser) {
    throw new Error("Username already taken");
  }

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      username: data.username,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    username: user.username,
  };
}

export async function login(data: { username: string; password: string }) {
  const user = await prisma.user.findUnique({
    where: { username: data.username },
  });

  if (!user) {
    throw new Error("Invalid username");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const accessToken = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRATION,
    }
  );

  const refreshToken = jwt.sign(
    { userId: user.id, username: user.username },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    }
  );
  return { accessToken, refreshToken };
}

export async function refreshToken(data: { token: string }) {
  try {
    const payload = jwt.verify(data.token, REFRESH_TOKEN_SECRET) as {
      userId: number;
      username: string;
    };

    const newAccessToken = jwt.sign(
      { userId: payload.userId, username: payload.username },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION,
      }
    );

    return {
      accessToken: newAccessToken,
    };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
}

export async function logout(userId: number) {
  return { message: "Logout successful" };
}
