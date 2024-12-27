import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Rating } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async getAllRatings() {
    return this.prisma.rating.findMany();
  }

  async getOneRating(id: number): Promise<Rating | null> {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });
    return rating;
  }

  async createRating(data: Prisma.RatingCreateInput): Promise<Rating | null> {
    if (data.ratingValue < 1 || data.ratingValue > 5) {
      throw new HttpException(
        'Rating value must be between 1 and 5',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prisma.rating.create({ data });
  }

  async updateRating(
    id: number,
    updateData: Prisma.RatingUpdateInput,
  ): Promise<Rating | null> {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });
    if (!rating) {
      throw new HttpException('No rating found', HttpStatus.NOT_FOUND);
    }
    if (
      updateData.ratingValue &&
      typeof updateData.ratingValue === 'number' &&
      (updateData.ratingValue < 1 || updateData.ratingValue > 5)
    ) {
      throw new HttpException(
        'Rating value must be between 1 and 5',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prisma.rating.update({
      where: { id },
      data: updateData,
    });
  }

  async removeOneRating(id: number): Promise<Rating | null> {
    const rating = await this.prisma.rating.findUnique({
      where: { id },
    });
    if (!rating) {
      throw new HttpException('No rating found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.rating.delete({
      where: { id },
    });
  }

  async calculateAverageRating(entityId: number): Promise<number> {
    const ratings = await this.prisma.rating.findMany({
      where: { id: entityId },
    });
    if (ratings.length === 0) {
      throw new HttpException(
        'No ratings found for this entity',
        HttpStatus.NOT_FOUND,
      );
    }
    const total = ratings.reduce((sum, rating) => sum + rating.ratingValue, 0);
    return total / ratings.length;
  }
}
