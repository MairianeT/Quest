import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Station {
  @IsUUID()
  id: string;

  @ApiProperty()
  markerName: string;

  @ApiProperty()
  markerPath: string;

  @ApiProperty()
  text: string;
}
