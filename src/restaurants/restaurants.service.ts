import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Restaurant } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  //getAllRestaurant
  async getAllRestaurant() {
    return this.prisma.restaurant.findMany();
  }

  //getOneUser
  async getOneRestaurant(id: number): Promise<Restaurant> {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        id: id,
      },
    });
    return restaurant;
  }
  //create restaurant
  async createRestaurant(
    data: Prisma.RestaurantCreateInput,
  ): Promise<Restaurant | null> {
    const restaurant = await this.prisma.restaurant.create({ data });
    return restaurant;
  }

  //updateRestaurant
  async updateRestaurant(
    id: number,
    data: Prisma.RestaurantUpdateInput,
  ): Promise<Restaurant> {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: {
        id: id,
      },
    });
    if (!restaurant) {
      throw new HttpException('no restaurant was found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.restaurant.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  //deleteOneRestaurant
  async removeRestaurant(id: number) {
    return this.prisma.restaurant.delete({
      where: { id },
    });
  }
}
