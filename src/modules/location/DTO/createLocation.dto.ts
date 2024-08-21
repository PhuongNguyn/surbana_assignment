import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { IsLocationNumerExist } from '../customDecorator/isExistLocation';

export class CreateLocationDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  building: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location_name: string;

  @ApiProperty({
    description:
      "Location Number should contain it's parent location and it's location name and seperate by '-' (ex: 'A-breakroom-bathroom')",
  })
  @IsNotEmpty()
  @IsString()
  @IsLocationNumerExist()
  location_number: string;

  @ApiProperty()
  @IsNumber()
  area: number;
}
