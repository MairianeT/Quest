import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Animation {
  @IsUUID()
  id: string;

  @ApiProperty()
  coordinates: number[];

  @ApiProperty()
  animation: string;
}