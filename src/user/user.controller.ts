import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @ApiCreatedResponse({ description: 'The user has been successfully added.' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(@Query('name') name: string): Promise<User> {
    return this.userService.create(name);
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
