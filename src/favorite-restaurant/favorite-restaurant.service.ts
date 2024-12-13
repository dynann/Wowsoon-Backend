import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavoriteRestaurant, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteRestaurantService {
  constructor(private prisma: PrismaService) {}

  async getAllFavoriteRestaurants() {
    return this.prisma.favoriteRestaurant.findMany();
  }
  //getOffer
  async getOneFavoriteRestaurants(
    id: number,
  ): Promise<FavoriteRestaurant | null> {
    const favRes = await this.prisma.favoriteRestaurant.findUnique({
      where: { id },
    });
    return favRes;
  }

  //createOffer
  async createFavoriteRestaurant(
    data: Prisma.FavoriteRestaurantCreateInput,
  ): Promise<FavoriteRestaurant | null> {
    return this.prisma.favoriteRestaurant.create({ data });
  }

  //updateOffer
  async updateFavoriteRestaurant(
    id: number,
    updateData: Prisma.FavoriteRestaurantUpdateInput,
  ): Promise<FavoriteRestaurant | null> {
    const favRes = await this.prisma.food.findUnique({
      where: { id },
    });
    if (!favRes) {
      throw new HttpException('no fav res found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.favoriteRestaurant.update({
      where: { id },
      data: updateData,
    });
  }

  //removeOffer
  async removeFavoriteRestaurants(
    id: number,
  ): Promise<FavoriteRestaurant | null> {
    const food = await this.prisma.favoriteRestaurant.findUnique({
      where: { id },
    });
    if (!food) {
      throw new HttpException('no rating is found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.favoriteRestaurant.delete({
      where: { id },
    });
  }
}
