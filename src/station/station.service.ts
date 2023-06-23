import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Station } from './station.entity';
import { StationDto } from './dto.station';

const prisma = new PrismaClient();

@Injectable()
export class StationService {
  async create(stationDto: StationDto): Promise<Station> {
    return prisma.station.create({
      data: stationDto,
    });
  }

  async getAll(): Promise<Station[]> {
    return prisma.station.findMany();
  }

  async getBuId(id: string): Promise<Station> {
    return prisma.station.findUniqueOrThrow({
      where: { id: id },
    });
  }

  async update(id: string, text: string): Promise<Station> {
    return prisma.station.update({
      where: { id: id },
      data: {
        text: text,
      },
    });
  }
}
