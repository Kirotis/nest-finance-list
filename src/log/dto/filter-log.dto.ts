import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';

export type SortModeValues = 'asc' | 'desc';

export class FilterLog {
  @ApiProperty()
  @IsArray()
  categoryFilter: string[];

  @ApiProperty({
    description: 'asc/desc',
    default: 'desc',
  })
  @IsNotEmpty()
  sort: SortModeValues;

  @ApiProperty()
  @IsString()
  search?: string;

  @ApiProperty()
  @IsDate()
  startDate?: Date;

  @ApiProperty()
  @IsDate()
  endDate?: Date;
}
