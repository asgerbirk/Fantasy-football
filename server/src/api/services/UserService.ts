import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(data: {
  name: string;
  email: string;
  username: string;
  password: string;
  test: string;
}) {
  return await prisma.user.create({ data });
}

export async function getAllUsers() {
  return await prisma.user.findMany();
}
