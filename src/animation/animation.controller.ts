import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
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

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async Update(@Param('id') id: string, @Query('latitude') latitude: string ,@Query('longitude') longitude: string) {
    const parsedLatitude = parseFloat(latitude);
    const parsedLongitude = parseFloat(longitude);
    return this.animationService.update(id, parsedLatitude, parsedLongitude);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    return this.animationService.delete(id);
  }
}
