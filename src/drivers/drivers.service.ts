import { Injectable } from '@nestjs/common';
import { Driver, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async findAllDrivers(): Promise<Driver[]> {
    return this.prisma.driver.findMany();
  }

  async findOneDriver(id: number): Promise<Driver> {
    return this.prisma.driver.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deleteDriver(id: number): Promise<Driver> {
    return this.prisma.driver.delete({
      where: {
        id: id,
      },
    });
  }

  async updateDriver(
    id: number,
    data: Prisma.DriverUpdateInput,
  ): Promise<Driver> {
    return this.prisma.driver.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async createDriver(data: Prisma.DriverCreateInput): Promise<Driver> {
    return this.prisma.driver.create({ data });
  }
}
