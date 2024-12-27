import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Roles } from 'roles.decorator';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  @Roles('ADMIN', 'USER')
  async findAllDrivers() {
    return this.driversService.findAllDrivers();
  }

  @Post()
  @Roles('ADMIN')
  async createDriver(@Body() data: Prisma.DriverCreateInput) {
    return this.driversService.createDriver(data);
  }

  @Get('/:id')
  @Roles('ADMIN', 'USER')
  async findOneDriver(@Param('id') id: number) {
    return this.driversService.findOneDriver(id);
  }

  @Delete('/:id')
  @Roles('ADMIN', 'USER')
  async deleteDriver(@Param('id') id: number) {
    return this.driversService.deleteDriver(id);
  }

  @Patch('/:id')
  @Roles('ADMIN', 'USER')
  async updateDriver(
    @Param('id') id: number,
    @Body() data: Prisma.DriverUpdateInput,
  ) {
    return this.driversService.updateDriver(id, data);
  }
}
