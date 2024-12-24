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
import { PaymentMethodsService } from './payment-methods.service';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Get()
  @Roles('USER')
  async findAllPaymentMethods() {
    return this.paymentMethodsService.findAllPaymentMethods();
  }

  @Get('/:id')
  @Roles('USER')
  async findOnePaymentMethod(@Param('id') id: number) {
    return this.paymentMethodsService.findOnePaymentMethod(id);
  }

  @Delete('/:id')
  @Roles('USER')
  async deletePaymentMethod(@Param('id') id: number) {
    return this.paymentMethodsService.deletePaymentMethod(id);
  }

  @Patch('/:id')
  @Roles('USER')
  async updatePaymentMethod(
    @Param('id') id: number,
    @Body() data: Prisma.PaymentMethodUpdateInput,
  ) {
    return this.paymentMethodsService.updatePaymentMethod(id, data);
  }

  @Post()
  @Roles('USER')
  async createPaymentMethod(@Body() data: Prisma.PaymentMethodCreateInput) {
    return this.paymentMethodsService.createPaymentMethod(data);
  }
}
