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
  @MaxLength(32)
  @Matches(/^[a-zA-Z0-9]{4,10}$/, {
    message: 'Building cannot contain special characters',
  })
  building: string;

  @IsNotEmpty()
  @IsString()
  location_name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]{4,10}$/, {
    message: 'Location number cannot contain special characters',
  })
  location_number: string;

  @IsNumber()
  area: number;
}
