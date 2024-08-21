import { registerDecorator, ValidationOptions } from 'class-validator';
import { LocationExistRule } from '.';

export function IsLocationNumerExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'LocationExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: LocationExistRule,
    });
  };
}
