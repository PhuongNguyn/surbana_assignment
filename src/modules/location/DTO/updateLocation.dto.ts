import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateLocationDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @MaxLength(32)
  building: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  location_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      "Location Number should contain it's parent location and it's location name and seperate by '-' (ex: 'A-breakroom-bathroom')",
    required: false,
  })
  location_number: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  area: number;
}
