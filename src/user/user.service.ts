import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { DtoUserCreate } from './dto.user.create';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async create(createUserDto: DtoUserCreate): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(createUserDto.password, salt);
    const user = await prisma.user.create({
      data: {
        name: createUserDto.name,
        login: createUserDto.login,
        password: password,
        isAdmin: createUserDto.isAdmin || false,
      },
    });

    if (!createUserDto.isAdmin) {
      await prisma.results.create({
        data: {
          userId: user.id,
          numberOfStations: 0,
          time: 0,
        },
      });
    }

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

  async findOneByLogin(login: string) {
    const findUser = await prisma.user.findFirst({
      where: {
        login: login,
      },
      select: {
        id: true,
        isAdmin: true,
        login: true,
        password: true,
      },
    });

    if (!findUser) {
      return null;
    }

    return findUser;
  }
}
