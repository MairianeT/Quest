import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AnimationService } from './animation.service';
import { AnimationDto } from './dto.animation';
import { Animation } from './animation.entity';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles';
import { AuthGuard } from '../auth/guard.service';

@ApiTags('animations')
@Controller('api/animations')
export class AnimationController {
  constructor(private animationService: AnimationService) {}
  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiCreatedResponse({
    description: 'The animation has been successfully added.',
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(@Body() animationDto: AnimationDto): Promise<Animation> {
    return this.animationService.create(animationDto);
  }

  @Get()
  @ApiOkResponse({ description: 'The found record', type: [Animation] })
  @ApiBadRequestResponse({
    description: 'Unable to get animation',
  })
  async findAll(): Promise<Animation[]> {
    return this.animationService.getAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'No animation found' })
  @ApiOkResponse({
    description: 'The found record',
    type: Animation,
  })
  @ApiBadRequestResponse({
    description: 'Unable to get animation',
  })
  async find(@Param('id') id: string): Promise<Animation> {
    return this.animationService.getBuId(id);
  }
}
