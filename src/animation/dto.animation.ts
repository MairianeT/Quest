import { ApiProperty } from '@nestjs/swagger';

export class AnimationDto {
  @ApiProperty()
  coordinates: number[];

  @ApiProperty()
  animation: string;
}
