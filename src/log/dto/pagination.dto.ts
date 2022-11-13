import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { FilterLog } from './filter-log.dto';

export class PaginationLog extends FilterLog {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  skipItems: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  takeItems: number;
}
