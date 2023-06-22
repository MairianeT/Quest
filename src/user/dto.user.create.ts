import { ApiProperty } from '@nestjs/swagger';

export class DtoUserCreate {
  @ApiProperty()
  name: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  isAdmin: boolean;
}
