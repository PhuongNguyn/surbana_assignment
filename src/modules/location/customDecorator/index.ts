import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { LocationService } from '../location.service';

@ValidatorConstraint({ name: 'LocationExists', async: true })
@Injectable()
export class LocationExistRule implements ValidatorConstraintInterface {
  constructor(private readonly locationService: LocationService) {}

  async validate(value: string) {
    try {
      const location =
        await this.locationService.getLocationByLocationNumber(value);

      if (location) {
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Location is existed`;
  }
}
