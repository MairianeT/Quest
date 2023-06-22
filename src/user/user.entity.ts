import { IsUUID, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'User name',
    example: 'Иван',
    type: String,
  })
  @MinLength(2, {
    message: 'Name is too short',
  })
  name: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  isAdmin: boolean;
}
