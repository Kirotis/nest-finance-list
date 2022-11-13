import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  Min,
  IsEnum,
  IsArray,
  MinDate,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { Plan, PlanType } from 'src/repository';

export class CreatePlanDto implements Omit<Plan, 'createDate'> {
  @ApiProperty({ minimum: 0, type: Number })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  moneySubject: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @MinDate(new Date())
  endDate: Date;

  @ApiProperty()
  @IsEnum({ object: PlanType })
  type: PlanType;

  @ApiProperty()
  @IsArray()
  categories: ObjectId[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
