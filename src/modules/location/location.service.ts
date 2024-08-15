import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from './localtion.entity';
import { Repository } from 'typeorm';
import { CreateLocationDTO } from './DTO/createLocation.dto';
import { UpdateLocationDTO } from './DTO/updateLocation.dto';
@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationEntity: Repository<LocationEntity>,
  ) {}

  async getChildLocationByLocationPath(locationPath: string) {
    const location = await this.locationEntity.query(`
      SELECT *
      FROM locations
      WHERE path <@ '${locationPath}'
      ORDER BY path DESC
    `);

    return location;
  }

  async createLocation(data: CreateLocationDTO) {
    const newLocation = await this.locationEntity.save({
      ...data,
      path: data.location_number?.replaceAll('-', '.'),
    });
    return newLocation;
  }

  async updateLocation(id: string, locationData: UpdateLocationDTO) {
    const location = await this.locationEntity.findOneBy({ id });
    if (!location) {
      throw new Error('Location not found');
    }
    const updatedLocation = await this.locationEntity
      .createQueryBuilder()
      .update({
        ...location,
        ...locationData,
        path: locationData.location_number
          ? locationData.location_number.replaceAll('-', '.')
          : location.path,
      })
      .where('locations.id = :id', { id: location.id })
      .returning(['id', 'location_number', 'location_name'])
      .execute();
    if (
      locationData.location_number &&
      location.location_number != locationData.location_number
    ) {
      const locations = await this.getChildLocationByLocationPath(
        location.path,
      );
      // The locations return on the above function will contain also the parent location, so we have to filter it.
      const childLocations = locations.filter((item) => item.id != location.id);
      // Update the location_number and the ltree path of child location
      const updatedChildLocations = await Promise.all(
        childLocations.map(async (item) => {
          const updateLocationNumber = item.location_number.replace(
            item.location_number,
            updatedLocation.raw[0]?.location_number,
          );
          const childLocationToUpdate = {
            ...item,
            location_number: updateLocationNumber,
            path: updateLocationNumber.replaceAll('-', '.'),
          };
          const updatedChildLocation = await this.locationEntity
            .createQueryBuilder()
            .update({ ...childLocationToUpdate })
            .where('locations.id = :id', { id: item.id })
            .returning(['id', 'location_number', 'location_name'])
            .execute();
          return { updatedChildLocation: updatedChildLocation.raw };
        }),
      );

      return {
        updatedLocation: updatedLocation.raw,
        updatedChildLocation: updatedChildLocations,
      };
    }
    return {
      updatedLocation: updatedLocation.raw,
      updatedChildLocation: [],
    };
  }
}
