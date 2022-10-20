import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Types } from 'mongoose';
import { FilterLog } from './dto/filter-log.dto';
import { LogRepositoryService } from 'src/repository';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('log')
@Controller('api/log')
export class LogController {
  constructor(private readonly logService: LogRepositoryService) {}

  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logService.create(createLogDto);
  }

  @Get()
  findAll() {
    return this.logService.findAll();
  }

  @Post('filter')
  findWithFilter(@Body() filter: FilterLog) {
    return this.logService.findWithFilter(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.logService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: Types.ObjectId, @Body() updateLogDto: UpdateLogDto) {
    return this.logService.update(id, updateLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.logService.remove(id);
  }
}
