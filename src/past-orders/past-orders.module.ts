import { Module } from '@nestjs/common';
import { PastOrdersController } from './past-orders.controller';
import { PastOrdersService } from './past-orders.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'roles.guard';
import { AuthGuardCre } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PastOrdersController],
  providers: [
    PastOrdersService,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuardCre },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [PastOrdersService],
})
export class PastOrdersModule {}
