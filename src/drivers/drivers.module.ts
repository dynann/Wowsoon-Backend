import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'roles.guard';
import { AuthGuardCre } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DriversController],
  providers: [
    DriversService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuardCre },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [DriversService],
})
export class DriversModule {}
