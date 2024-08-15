import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateLocationDTO } from './DTO/createLocation.dto';
import { LocationService } from './location.service';
import { UpdateLocationDTO } from './DTO/updateLocation.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/get-all-locations')
  @ApiOperation({
    summary: 'This API can be used to get all of the location',
  })
  async getAllLocation() {
    const result = await this.locationService.getAllLocations();

    return {
      locations: result,
    };
  }

  @Get('/get-child-location-by-location-number/:location_number')
  @ApiOperation({
    summary:
      "This API can be used to get location and it's child by location number",
  })
  async getChildLocationByLocationNumber(
    @Param('location_number') location_number: string,
  ) {
    const searchPath = `${location_number.replace(/\-/g, '.')}`;

    console.log(searchPath);
    const result =
      await this.locationService.getChildLocationByLocationPath(searchPath);

    return {
      locations: result,
    };
  }

  @Post('/')
  @ApiOperation({ summary: 'This API can be used to create new location' })
  async createLocation(@Body() body: CreateLocationDTO) {
    const newLocation = await this.locationService.createLocation(body);

    return {
      location: newLocation,
    };
  }
  @Patch(':id')
  @ApiOperation({
    summary:
      "This API can be used to update new location, if you update the location all it's chill will change the path and the location number",
  })
  async updateLocation(
    @Param('id') id: string,
    @Body() body: UpdateLocationDTO,
  ) {
    const result = await this.locationService.updateLocation(id, body);

    return result;
  }

  @Delete(':id')
  @ApiOperation({
    summary:
      "This API can be used to delete location, and also delete it's child location",
  })
  async deleteLocation(@Param('id') id: string) {
    const result = await this.locationService.deleteLocation(id);

    return result;
  }
}
