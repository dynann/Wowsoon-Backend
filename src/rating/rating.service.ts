import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Rating } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async getAllRatings() {
    return this.prisma.rating.findMany();
  }
  //getOneRating
  async getOneRating(id: number): Promise<Rating | null> {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });
    return rating;
  }

  //createRating
  async createRating(data: Prisma.RatingCreateInput): Promise<Rating | null> {
    return this.prisma.rating.create({ data });
  }

  //updateRating
  async updateRating(
    id: number,
    updateData: Prisma.RatingUpdateInput,
  ): Promise<Rating | null> {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });
    if (!rating) {
      throw new HttpException('no rating found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.rating.update({
      where: { id },
      data: updateData,
    });
  }

  //remove rating
  async removeOneRating(id: number): Promise<Rating | null> {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });
    if (!rating) {
      throw new HttpException('no rating is found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.rating.delete({
      where: { id },
    });
  }
}
