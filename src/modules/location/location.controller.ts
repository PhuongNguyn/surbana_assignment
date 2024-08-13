import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateLocationDTO } from './DTO/createLocation.dto';
import { LocationService } from './location.service';
import { UpdateLocationDTO } from './DTO/updateLocation.dto';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/all-location')
  async getLocationFromRoot() {
    return {
      message: 'Hello',
    };
  }

  @Post('/')
  async createLocation(@Body() body: CreateLocationDTO) {
    const newLocation = await this.locationService.createLocation(body);

    return {
      location: newLocation,
    };
  }
  @Patch(':id')
  async updateLocation(
    @Param('id') id: string,
    @Body() body: UpdateLocationDTO,
  ) {
    const result = await this.locationService.updateLocation(id, body);

    return {
      location: result,
    };
  }
}
