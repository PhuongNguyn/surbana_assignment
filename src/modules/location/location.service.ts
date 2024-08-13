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

  async createLocation(data: CreateLocationDTO) {
    const newLocation = this.locationEntity.create({
      ...data,
      path: data.location_number?.replaceAll('-', '.'),
    });
    return this.locationEntity.save(newLocation);
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
