import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getAllOrders() {
    return this.prisma.order.findMany();
  }
  //getOneOrder
  async getOneOrder(id: number): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    return order;
  }

  //createOrder
  async createOrder(data: Prisma.OrderCreateInput): Promise<Order | null> {
    return this.prisma.order.create({ data });
  }

  //updateOrder
  async updateOrder(
    id: number,
    updateData: Prisma.OrderUpdateInput,
  ): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new HttpException('no rating found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.order.update({
      where: { id },
      data: updateData,
    });
  }

  //removeOrder
  async removeOneOrder(id: number): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      throw new HttpException('no rating is found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
