import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getAllOrders() {
    return this.prisma.order.findMany();
  }

  async getOneOrder(id: number): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    return order;
  }

  async createOrder(data: Prisma.OrderCreateInput): Promise<Order | null> {
    await this.validateOrderData(data);
    data.totalPrice = this.calculateTotalPrice(data);
    return this.prisma.order.create({ data });
  }

  async updateOrder(
    id: number,
    updateData: Prisma.OrderUpdateInput,
  ): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    await this.validateOrderData(updateData);
    updateData.totalPrice = this.calculateTotalPrice(updateData);
    return this.prisma.order.update({
      where: { id },
      data: updateData,
    });
  }

  async removeOneOrder(id: number): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.order.delete({
      where: { id },
    });
  }

  private calculateTotalPrice(
    data: Prisma.OrderCreateInput | Prisma.OrderUpdateInput,
  ): number {
    if ('create' in data.orderItems) {
      if (Array.isArray(data.orderItems.create)) {
        return data.orderItems.create.reduce(
          (total, item) => total + item.subtotal,
          0,
        );
      }
    }
    return 0;
  }

  private async validateOrderData(
    data: Prisma.OrderCreateInput | Prisma.OrderUpdateInput,
  ) {
    if (!data.orderItems) {
      throw new HttpException(
        'Order must have at least one item',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
