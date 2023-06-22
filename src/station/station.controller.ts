import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { StationService } from './station.service';
import { Station } from './station.entity';
import { StationDto } from './dto.station';

@ApiTags('stations')
@Controller('api/stations')
export class StationController {
  constructor(private stationService: StationService) {}
  @Post()
  @ApiCreatedResponse({
    description: 'The station has been successfully added.',
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(@Body() stationDto: StationDto): Promise<Station> {
    return this.stationService.create(stationDto);
  }

  @Get()
  @ApiOkResponse({ description: 'The found record', type: [Station] })
  @ApiBadRequestResponse({
    description: 'Unable to get station',
  })
  async findAll(): Promise<Station[]> {
    return this.stationService.getAll();
  }
  @Get(':id')
  @ApiNotFoundResponse({ description: 'No station found' })
  @ApiOkResponse({
    description: 'The found record',
    type: Station,
  })
  @ApiBadRequestResponse({
    description: 'Unable to get station',
  })
  async find(@Param('id') id: string): Promise<Station> {
    return this.stationService.getBuId(id);
  }

  @Put(':id')
  async addVolunteers(@Param('userId') id: string, @Query() text: string) {
    return this.stationService.update(id, text);
  }
}
