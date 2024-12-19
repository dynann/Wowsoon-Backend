import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { RolesGuard } from 'roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuardCre } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FoodController],
  providers: [
    FoodService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuardCre },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [FoodService],
})
export class FoodModule {}
