import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { DtoUserCreate } from './dto.user.create';

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @ApiCreatedResponse({ description: 'The user has been successfully added.' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(@Body() createUserDto: DtoUserCreate): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ description: 'The found record', type: [User] })
  @ApiBadRequestResponse({
    description: 'Unable to get user',
  })
  async findAll(): Promise<User[]> {
    return this.userService.getAll();
  }
  @Get(':id')
  @ApiNotFoundResponse({ description: 'No user found' })
  @ApiOkResponse({
    description: 'The found record',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Unable to get user',
  })
  async find(@Param('id') id: string): Promise<User> {
    return this.userService.getBuId(id);
  }
}
