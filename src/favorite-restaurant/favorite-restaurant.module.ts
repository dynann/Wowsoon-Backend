import { Module } from '@nestjs/common';
import { FavoriteRestaurantController } from './favorite-restaurant.controller';
import { FavoriteRestaurantService } from './favorite-restaurant.service';

@Module({
  controllers: [FavoriteRestaurantController],
  providers: [FavoriteRestaurantService]
})
export class FavoriteRestaurantModule {}
