import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Animation {
  @IsUUID()
  id: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  animation: string;
}