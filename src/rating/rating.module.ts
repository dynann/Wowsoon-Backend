import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuardCre } from 'src/auth/auth.guard';
import { RolesGuard } from 'roles.guard';

@Module({
  controllers: [RatingController],
  providers: [
    RatingService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuardCre },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [RatingService],
})
export class RatingModule {}
