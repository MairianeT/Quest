import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Results } from './results.entity';
import { DtoResults } from "./dto.results";

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

  async update(id: string, resDto: DtoResults): Promise<Results> {
    return prisma.results.update({
      where: { userId: id },
      data: {
        numberOfStations: resDto.numberOfStations,
        time: resDto.time,
      },
    });
  }
}
