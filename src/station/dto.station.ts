import { ApiProperty } from '@nestjs/swagger';

export class StationDto {
  @ApiProperty()
  markerName: string;

  @ApiProperty()
  markerPath: string;

  @ApiProperty()
  text: string;
}
