import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Food, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}

  async getAllFood() {
    return this.prisma.food.findMany();
  }
  //getOffer
  async getOneFood(id: number): Promise<Food | null> {
    const food = await this.prisma.food.findUnique({
      where: { id },
    });
    return food;
  }

  //createOffer
  async createFood(data: Prisma.FoodCreateInput): Promise<Food | null> {
    return this.prisma.food.create({ data });
  }

  //updateOffer
  async updateFood(
    id: number,
    updateData: Prisma.FoodUpdateInput,
  ): Promise<Food | null> {
    const food = await this.prisma.food.findUnique({
      where: { id },
    });
    if (!food) {
      throw new HttpException('no rating found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.food.update({
      where: { id },
      data: updateData,
    });
  }

  //removeOffer
  async removeOneFood(id: number): Promise<Food | null> {
    const food = await this.prisma.food.findUnique({
      where: { id },
    });
    if (!food) {
      throw new HttpException('no rating is found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.food.delete({
      where: { id },
    });
  }
}
