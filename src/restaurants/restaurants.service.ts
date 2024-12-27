import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Food, Prisma, Restaurant } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  //getAllRestaurant
  async getAllRestaurant(): Promise<Restaurant[]> {
    const restaurant = await this.prisma.restaurant.findMany();
    console.log(restaurant);
    return restaurant;
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

  async calculateAverageRating(restaurantId: number): Promise<number> {
    const ratings = await this.prisma.rating.findMany({
      where: { restaurantId },
    });
    if (ratings.length === 0) {
      throw new HttpException(
        'No ratings found for this restaurant',
        HttpStatus.NOT_FOUND,
      );
    }
    const total = ratings.reduce((sum, rating) => sum + rating.ratingValue, 0);
    return total / ratings.length;
  }

  //get foods from restaurant
  async getItems(restaurantId: number): Promise<Food[]> {
    const foods = await this.prisma.food.findMany({
      where: { restaurantId },
    });
    return foods;
  }
}
