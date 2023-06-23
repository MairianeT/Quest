import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { AnimationDto } from './dto.animation';
import { Animation } from './animation.entity';

const prisma = new PrismaClient();

@Injectable()
export class AnimationService {
  async create(animationDto: AnimationDto): Promise<Animation> {
    return prisma.animation.create({
      data: animationDto,
    });
  }

  async getAll(): Promise<Animation[]> {
    return prisma.animation.findMany();
  }

  async getBuId(id: string): Promise<Animation> {
    return prisma.animation.findUniqueOrThrow({
      where: { id: id },
    });
  }
}
