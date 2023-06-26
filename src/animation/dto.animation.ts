import { ApiProperty } from '@nestjs/swagger';

export class AnimationDto {
  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  animation: string;
}
