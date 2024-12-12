import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Roles } from 'roles.decorator';
import { Prisma } from '@prisma/client';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Get()
  @Roles('ADMIN')
  async findAllRestaurants() {
    return this.restaurantService.getAllRestaurant();
  }

  @Get('/:id')
  @Roles('ADMIN')
  async findOneRestaurant(@Param('id') id: string) {
    return this.restaurantService.getOneRestaurant(+id);
  }

  @Post()
  @Roles('ADMIN')
  async createOneRestaurant(@Body() data: Prisma.RestaurantCreateInput) {
    return this.restaurantService.createRestaurant(data);
  }

  @Patch('/:id')
  @Roles('ADMIN')
  async updateOneRestaurant(
    @Param('id') id: string,
    @Body() data: Prisma.RestaurantUpdateInput,
  ) {
    return this.restaurantService.updateRestaurant(+id, data);
  }

  @Delete('/:id')
  @Roles('ADMIN')
  async deleteRestaurant(@Param('id') id: string) {
    return this.restaurantService.removeRestaurant(+id);
  }
}
