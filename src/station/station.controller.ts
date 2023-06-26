import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StationService } from './station.service';
import { Station } from './station.entity';
import { StationDto } from './dto.station';
import { AuthGuard } from '../auth/guard.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('stations')
@Controller('api/stations')
export class StationController {
  constructor(private stationService: StationService) {}
  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async Update(@Param('id') id: string, @Query('text') text: string) {
    return this.stationService.update(id, text);
  }

  @Post('results')
  async uploadResult(
    @Query('name') name: string,
    @Query('station') station: string,
  ) {
    return await this.stationService.logResult(name, station);
  }

  @Post('upload')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any): Promise<string> {
    return await this.stationService.uploadFile(file);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    return this.stationService.delete(id);
  }
}
