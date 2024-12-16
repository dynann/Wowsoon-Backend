import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrdersModule } from './orders/orders.module';
import { OfferModule } from './offer/offer.module';
import { FavoriteRestaurantModule } from './favorite-restaurant/favorite-restaurant.module';
import { RatingModule } from './rating/rating.module';
import { OrderItemModule } from './order-item/order-item.module';
import { FoodModule } from './food/food.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from 'roles.guard';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GoogleAuthGuard } from './auth/google-oauth.guard';

@Module({
  imports: [
    UsersModule,
    RestaurantsModule,
    OrdersModule,
    OfferModule,
    FavoriteRestaurantModule,
    RatingModule,
    OrderItemModule,
    FoodModule,
    AuthModule,
    ConfigModule.forRoot(),
    PassportModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: GoogleAuthGuard },
  ],
  exports: [AppService],
})
export class AppModule {}
