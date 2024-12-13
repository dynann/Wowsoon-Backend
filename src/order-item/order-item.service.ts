import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderItem, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemService {
  constructor(private prisma: PrismaService) {}

  async getAllOrdersItem() {
    return this.prisma.orderItem.findMany();
  }
  //getOneOrderItem
  async getOneOrderItem(id: number): Promise<OrderItem | null> {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id },
    });
    return orderItem;
  }

  //createOrderItem
  async createOrderItem(
    data: Prisma.OrderItemCreateInput,
  ): Promise<OrderItem | null> {
    return this.prisma.orderItem.create({ data });
  }

  //updateOrder
  async updateOrderItem(
    id: number,
    updateData: Prisma.OrderItemUpdateInput,
  ): Promise<OrderItem | null> {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id },
    });
    if (!orderItem) {
      throw new HttpException('no rating found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.orderItem.update({
      where: { id },
      data: updateData,
    });
  }

  //removeOrderItem
  async removeOneOrderItem(id: number): Promise<OrderItem | null> {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id },
    });
    if (!orderItem) {
      throw new HttpException('no rating is found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.orderItem.delete({
      where: { id },
    });
  }
}
