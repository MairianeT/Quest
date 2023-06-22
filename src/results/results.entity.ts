import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Results {
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  numberOfStations: number;

  @ApiProperty()
  time: number;
}
