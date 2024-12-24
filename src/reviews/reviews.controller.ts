import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Roles } from 'roles.decorator';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Roles('USER', 'ADMIN')
  async createReview(@Body() data: Prisma.ReviewCreateInput) {
    return this.reviewsService.createReview(data);
  }

  @Get()
  @Roles('USER', 'ADMIN')
  async getAllReviews() {
    return this.reviewsService.findAllReviews();
  }

  @Get('/:id')
  @Roles('USER', 'ADMIN')
  async getOneReview(@Param('id') id: string) {
    return this.reviewsService.findOneReview(+id);
  }

  @Patch('/:id')
  @Roles('USER', 'ADMIN')
  async updateReview(
    @Param('id') id: string,
    @Body() data: Prisma.ReviewUpdateInput,
  ) {
    return this.reviewsService.updateReview(+id, data);
  }

  @Delete('/:id')
  @Roles('USER', 'ADMIN')
  async deleteReview(@Param('id') id: string) {
    return this.reviewsService.deleteReview(+id);
  }
}
