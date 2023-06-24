import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, Put, Query, UseGuards } from "@nestjs/common";
import { Results } from './results.entity';
import { ResultsService } from './results.service';
import { AuthGuard } from '../auth/guard.service';
import { DtoResults } from "./dto.results";

@ApiTags('results')
@Controller('api/results')
export class ResultsController {
  constructor(private resultsService: ResultsService) {}
  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'The found record', type: [Results] })
  @ApiBadRequestResponse({
    description: 'Unable to get results',
  })
  async findAll(): Promise<Results[]> {
    return this.resultsService.getAll();
  }
  @Get(':userId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async GetResByUserId(@Param('userId') id: string, @Body() resDto: DtoResults) {
    return this.resultsService.update(id, resDto);
  }
}
