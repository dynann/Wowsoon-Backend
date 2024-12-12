import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}
  @Get()
  async getAllOrder() {
    return this.orderService.getAllOrders();
  }
}
