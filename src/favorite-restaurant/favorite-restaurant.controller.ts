import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FavoriteRestaurantService } from './favorite-restaurant.service';
import { Prisma } from '@prisma/client';
import { Roles } from 'roles.decorator';

@Controller('favorite-restaurant')
export class FavoriteRestaurantController {
  constructor(private readonly favService: FavoriteRestaurantService) {}

  @Get()
  @Roles('ADMIN')
  async findAllFood() {
    return this.favService.getAllFavoriteRestaurants();
  }

  @Get('/:id')
  @Roles('ADMIN')
  async findOneFood(@Param('id') id: string) {
    return this.favService.getOneFavoriteRestaurants(+id);
  }

  @Post()
  @Roles('ADMIN')
  async createFood(@Body() favData: Prisma.FavoriteRestaurantCreateInput) {
    return this.favService.createFavoriteRestaurant(favData);
  }

  @Patch('/:id')
  @Roles('ADMIN')
  async updateOneFood(
    @Param('id') id: string,
    @Body() updatedData: Prisma.FavoriteRestaurantUpdateInput,
  ) {
    return this.favService.updateFavoriteRestaurant(+id, updatedData);
  }

  @Delete('/:id')
  @Roles('ADMIN')
  async deleteFood(@Param('id') id: string) {
    return this.favService.removeFavoriteRestaurants(+id);
  }
}
