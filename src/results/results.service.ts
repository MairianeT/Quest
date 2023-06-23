import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Results } from './results.entity';

const prisma = new PrismaClient();

@Injectable()
export class ResultsService {
  async getAll(): Promise<Results[]> {
    return prisma.results.findMany();
  }

  async getBuId(userId: string): Promise<Results> {
    return prisma.results.findUniqueOrThrow({
      where: { userId: userId },
    });
  }

  async update(id: string, time: number): Promise<Results> {
    const oldRes = await prisma.results.findUniqueOrThrow({
      where: { userId: id },
    });
    return prisma.results.update({
      where: { userId: id },
      data: {
        numberOfStations: oldRes.numberOfStations + 1,
        time: oldRes.time + time,
      },
    });
  }
}
