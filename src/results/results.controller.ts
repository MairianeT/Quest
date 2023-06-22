import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param, Put, Query } from '@nestjs/common';
import { Results } from './results.entity';
import { ResultsService } from './results.service';

@ApiTags('results')
@Controller('api/results')
export class ResultsController {
  constructor(private resultsService: ResultsService) {}
  @Get()
  @ApiOkResponse({ description: 'The found record', type: [Results] })
  @ApiBadRequestResponse({
    description: 'Unable to get results',
  })
  async findAll(): Promise<Results[]> {
    return this.resultsService.getAll();
  }
  @Get(':userId')
  @ApiNotFoundResponse({ description: 'No result found' })
  @ApiOkResponse({
    description: 'The found record',
    type: Results,
  })
  @ApiBadRequestResponse({
    description: 'Unable to get station',
  })
  async find(@Param('userId') id: string): Promise<Results> {
    return this.resultsService.getBuId(id);
  }

  @Put(':userId')
  async addVolunteers(@Param('userId') id: string, @Query() time: number) {
    return this.resultsService.update(id, time);
  }
}
