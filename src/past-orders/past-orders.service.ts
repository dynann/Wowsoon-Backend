import { Injectable } from '@nestjs/common';
import { PastOrder, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PastOrdersService {
  constructor(private prisma: PrismaService) {}

  async findAllPastOrders(): Promise<PastOrder[]> {
    return this.prisma.pastOrder.findMany();
  }

  async findOnePastOrder(id: number): Promise<PastOrder> {
    return this.prisma.pastOrder.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deletePastOrder(id: number): Promise<PastOrder> {
    return this.prisma.pastOrder.delete({
      where: {
        id: id,
      },
    });
  }

  async updatePastOrder(
    id: number,
    data: Prisma.PastOrderUpdateInput,
  ): Promise<PastOrder> {
    return this.prisma.pastOrder.update({
      where: {
        id: id,
      },
      data: data,
    });
  }
}
