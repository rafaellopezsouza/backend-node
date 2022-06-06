import e from "express";
import prismaClient from "../../prisma";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!email) {
      throw new Error("Email incorreto.");
    }
    const userAlreadyUserExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userAlreadyUserExists) {
      throw new Error("Usuário já cadastrado.");
    }
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
