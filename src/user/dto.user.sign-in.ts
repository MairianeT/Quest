import { ApiProperty } from '@nestjs/swagger';

export class DtoUserSignIn {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;
}
