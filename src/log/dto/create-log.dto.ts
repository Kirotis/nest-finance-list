import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Log } from '../../repository/log-repository/entities/log.entity';

export class CreateLogDto implements Pick<Log, 'title' | 'money'> {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  readonly categoryId: ObjectId;

  @ApiProperty({
    minimum: 1,
    type: Number,
    default: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly money: number;
}
