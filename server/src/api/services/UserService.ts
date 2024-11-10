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

export async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function updateUser(
  id: number,
  data: {
    username?: string;
    password?: string;
  }
) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: { id },
  });
}
