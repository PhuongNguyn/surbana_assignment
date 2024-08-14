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

    return this.locationEntity.save({
      ...location,
      path: locationData.location_number.replaceAll('-', '.'),
    });
  }
}
