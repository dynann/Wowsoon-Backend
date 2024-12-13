import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { Prisma } from '@prisma/client';
import { Roles } from 'roles.decorator';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  @Roles('ADMIN')
  async findAllOrderItem() {
    return this.orderItemService.getAllOrdersItem();
  }

  @Get('/:id')
  @Roles('ADMIN')
  async findOneOrderItem(@Param('id') id: string) {
    return this.orderItemService.getOneOrderItem(+id);
  }

  @Post()
  @Roles('ADMIN')
  async createOrder(@Body() orderItemData: Prisma.OrderItemCreateInput) {
    return this.orderItemService.createOrderItem(orderItemData);
  }

  @Patch('/:id')
  @Roles('ADMIN')
  async updateOneOrderItem(
    @Param('id') id: string,
    @Body() updatedData: Prisma.OrderItemUpdateInput,
  ) {
    return this.orderItemService.updateOrderItem(+id, updatedData);
  }

  @Delete('/:id')
  @Roles('ADMIN')
  async deleteOrderItem(@Param('id') id: string) {
    return this.orderItemService.removeOneOrderItem(+id);
  }
}
