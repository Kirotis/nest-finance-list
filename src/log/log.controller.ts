import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Types } from 'mongoose';
import { FilterLog } from './dto/filter-log.dto';
import { LogRepositoryService } from 'src/repository';
import { ApiTags } from '@nestjs/swagger';
import { PaginationLog } from './dto/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('log')
@Controller('api/log')
export class LogController {
  constructor(private readonly logService: LogRepositoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logService.create(createLogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.logService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('filter')
  findWithFilter(@Body() filter: FilterLog) {
    return this.logService.findWithFilter(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Post('pagination')
  findWithPagination(
    @Body() { skipItems, takeItems, ...filter }: PaginationLog,
  ) {
    return this.logService.findWithPagination(skipItems, takeItems, filter);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId) {
    return this.logService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: Types.ObjectId, @Body() updateLogDto: UpdateLogDto) {
    return this.logService.update(id, updateLogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId) {
    return this.logService.remove(id);
  }
}
