import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Roles } from 'roles.decorator';
import { PastOrdersService } from './past-orders.service';

@Controller('past-orders')
export class PastOrdersController {
  constructor(private readonly pastOrdersService: PastOrdersService) {}

  @Get()
  @Roles('ADMIN', 'USER')
  async findAllPastOrders() {
    return this.pastOrdersService.findAllPastOrders();
  }

  @Get('/:id')
  @Roles('ADMIN', 'USER')
  async findOnePastOrder(@Param('id') id: number) {
    return this.pastOrdersService.findOnePastOrder(id);
  }

  @Delete('/:id')
  @Roles('ADMIN', 'USER')
  async deletePastOrder(@Param('id') id: number) {
    return this.pastOrdersService.deletePastOrder(id);
  }

  @Patch('/:id')
  @Roles('ADMIN', 'USER')
  async updatePastOrder(
    @Param('id') id: number,
    @Body() data: Prisma.PastOrderUpdateInput,
  ) {
    return this.pastOrdersService.updatePastOrder(id, data);
  }
}
