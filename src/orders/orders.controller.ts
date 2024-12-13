import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Roles } from 'roles.decorator';
import { Prisma } from '@prisma/client';
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}
  @Get()
  @Roles('ADMIN')
  async findAllOrder() {
    return this.orderService.getAllOrders();
  }

  @Get('/:id')
  @Roles('ADMIN')
  async findOneRating(@Param('id') id: string) {
    return this.orderService.getOneOrder(+id);
  }

  @Post()
  @Roles('ADMIN')
  async createOrder(@Body() orderData: Prisma.OrderCreateInput) {
    return this.orderService.createOrder(orderData);
  }

  @Patch('/:id')
  @Roles('ADMIN')
  async updateOneOrder(
    @Param('id') id: string,
    @Body() updatedData: Prisma.OrderUpdateInput,
  ) {
    return this.orderService.updateOrder(+id, updatedData);
  }

  @Delete('/:id')
  @Roles('ADMIN')
  async deleteOrder(@Param('id') id: string) {
    return this.orderService.removeOneOrder(+id);
  }
}
