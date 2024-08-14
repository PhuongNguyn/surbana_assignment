import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateLocationDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MaxLength(32)
  building: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  location_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description:
      "Location Number should contain it's parent location and it's location name and seperate by '-' (ex: 'A-breakroom-bathroom')",
  })
  location_number: string;

  @IsNumber()
  @ApiProperty()
  area: number;
}
