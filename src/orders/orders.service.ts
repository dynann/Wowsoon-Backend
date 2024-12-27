import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PastOrdersService } from 'src/past-orders/past-orders.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private pastOrder: PastOrdersService,
  ) {}
  async getAllOrders() {
    return this.prisma.order.findMany({
      include: {
        orderItems: true,
        user: true,
        restaurant: true,
      },
    });
  }

  async getOneOrder(id: number): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: true },
    });
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  //create new order
  async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    await this.validateOrderItems(
      Array.isArray(data.orderItems?.create)
        ? (data.orderItems.create as Prisma.OrderItemUncheckedCreateInput[])
        : [],
    );
    const totalPrice = this.calculateTotalPrice(
      Array.isArray(data.orderItems?.create)
        ? (data.orderItems.create as Prisma.OrderItemUncheckedCreateInput[])
        : [],
    );

    const newOrder = await this.prisma.order.create({
      data: {
        ...data,
        totalPrice,
        status: 'PENDING',
      },
      include: { orderItems: true },
    });
    await this.pastOrder.createPastOrder({
      orderId: newOrder.id,
      userId: newOrder.userId,
      restaurantId: newOrder.restaurantId,
    });
    return newOrder;
  }
  async updateOrder(
    id: number,
    updateData: Prisma.OrderUpdateInput,
  ): Promise<Order> {
    const existingOrder = await this.prisma.order.findUnique({ where: { id } });

    if (!existingOrder) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    if (updateData.orderItems?.create) {
      await this.validateOrderItems(
        Array.isArray(updateData.orderItems?.create)
          ? (updateData.orderItems
              .create as Prisma.OrderItemUncheckedCreateInput[])
          : [],
      );
      updateData.totalPrice = this.calculateTotalPrice(
        Array.isArray(updateData.orderItems.create)
          ? (updateData.orderItems
              .create as Prisma.OrderItemUncheckedCreateInput[])
          : [],
      );
    }

    return this.prisma.order.update({
      where: { id },
      data: updateData,
      include: { orderItems: true },
    });
  }

  async removeOneOrder(id: number): Promise<Order> {
    const order = await this.prisma.order.findUnique({ where: { id } });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.order.delete({
      where: { id },
    });
  }

  private calculateTotalPrice(
    orderItems: Prisma.OrderItemUncheckedCreateInput[] = [],
  ): number {
    return orderItems.reduce((total, item) => total + item.subtotal, 0);
  }

  private async validateOrderItems(
    orderItems: Prisma.OrderItemUncheckedCreateInput[] = [],
  ) {
    if (!orderItems || orderItems.length === 0) {
      throw new HttpException(
        'Order must include at least one item',
        HttpStatus.BAD_REQUEST,
      );
    }

    for (const item of orderItems) {
      if (!item.foodId || item.quantity <= 0 || item.subtotal <= 0) {
        throw new HttpException(
          'Each order item must have a valid foodId, quantity, and subtotal',
          HttpStatus.BAD_REQUEST,
        );
      }
      const food = await this.prisma.food.findUnique({
        where: { id: item.foodId },
      });

      if (!food) {
        throw new HttpException(
          `Food item with id ${item.foodId} not found`,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!food.availability) {
        throw new HttpException(
          `Insufficient stock for food item with id ${item.foodId}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
