import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
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
