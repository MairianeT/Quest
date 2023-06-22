import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DtoUserCreate {
  @ApiProperty()
  name: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;

  @ApiPropertyOptional()
  isAdmin: boolean;
}
