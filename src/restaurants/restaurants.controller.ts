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
  @Roles('USER', 'ADMIN')
  async findAllRestaurants() {
    return this.restaurantService.getAllRestaurant();
  }

  @Get('/:id')
  @Roles('USER')
  async findOneRestaurant(@Param('id') id: string) {
    return this.restaurantService.getOneRestaurant(+id);
  }

  @Post()
  @Roles('USER')
  async createOneRestaurant(@Body() data: Prisma.RestaurantCreateInput) {
    console.log('create');
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

  @Get('/average-rating/:id')
  @Roles('ADMIN')
  async getAverageRating(@Param('id') id: string) {
    return this.restaurantService.calculateAverageRating(+id);
  }

  @Get('/:id/items')
  @Roles('ADMIN')
  async getItems(@Param('id') id: string) {
    const items = await this.restaurantService.getItems(+id);
    return items;
  }
}
