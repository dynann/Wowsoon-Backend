import { Injectable } from '@nestjs/common';
import { PaymentMethod, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentMethodsService {
  constructor(private prisma: PrismaService) {}

  async createPaymentMethod(
    data: Prisma.PaymentMethodCreateInput,
  ): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.create({ data });
  }

  async findAllPaymentMethods() {
    return this.prisma.paymentMethod.findMany();
  }

  async findOnePaymentMethod(id: number): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deletePaymentMethod(id: number): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.delete({
      where: {
        id: id,
      },
    });
  }

  async updatePaymentMethod(
    id: number,
    data: Prisma.PaymentMethodUpdateInput,
  ): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.update({
      where: {
        id: id,
      },
      data: data,
    });
  }
}
