import { ApiProperty } from "@nestjs/swagger";

export class DtoResults {
  @ApiProperty()
  numberOfStations: number;

  @ApiProperty()
  time: number;
}
