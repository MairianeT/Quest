import { PrismaClient } from '@prisma/client';
import { Injectable, UploadedFile } from '@nestjs/common';
import { Station } from './station.entity';
import { StationDto } from './dto.station';
import { createWriteStream, unlink } from 'fs';
import { promisify } from 'util';
import * as fs from 'fs';

const prisma = new PrismaClient();

@Injectable()
export class StationService {
  async create(stationDto: StationDto): Promise<Station> {
    const existingStation = await prisma.station.findFirst({
      where: {
        markerName: stationDto.markerName,
      },
    });

    if (!existingStation) {
      return prisma.station.create({
        data: stationDto,
      });
    } else return null;
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

  async uploadFile(@UploadedFile() file: any): Promise<string> {
    const filePath = `./public/data/${file.originalname}`;
    const res = `/data/${file.originalname}`;
    const writeStream = createWriteStream(filePath);
    writeStream.write(file.buffer);
    writeStream.end();

    return res;
  }

  async delete(id: string) {
    const station = await prisma.station.findUniqueOrThrow({
      where: { id: id },
      select: { markerPath: true },
    });

    const filePath = `./public${station.markerPath}`;

    const unlinkAsync = promisify(unlink);

    try {
      // Удаление файла с сервера
      await unlinkAsync(filePath);

      await prisma.station.delete({ where: { id } });
      return;
    } catch (error) {
      console.error('Ошибка при удалении файла:', error);
      throw error;
    }
  }

  async logResult(name: string, station: string) {
    const date = new Date();
    const time = date.toLocaleTimeString();

    const data = `${name}, ${station}, ${time}\n`;
    fs.appendFile('public/data/results.txt', data, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Data has been written to file.');
      }
    });
  }
}
