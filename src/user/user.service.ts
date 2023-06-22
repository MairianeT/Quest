import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async create(name: string): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: name,
      },
    });
    await prisma.results.create({
      data: {
        userId: user.id,
        numberOfStations: 0,
        time: 0,
      },
    });
    return user;
  }

  async getAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async getBuId(id: string): Promise<User> {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: id },
    });

    return user;
  }
}
