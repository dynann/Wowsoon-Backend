import { Module } from '@nestjs/common';
import { FavoriteRestaurantController } from './favorite-restaurant.controller';
import { FavoriteRestaurantService } from './favorite-restaurant.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FavoriteRestaurantController],
  providers: [
    FavoriteRestaurantService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [FavoriteRestaurantService],
})
export class FavoriteRestaurantModule {}
