import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { Roles } from 'roles.decorator';
import { Prisma } from '@prisma/client';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get()
  @Roles('ADMIN')
  async findAllRatings() {
    return this.ratingService.getAllRatings();
  }

  @Get('/:id')
  @Roles('ADMIN')
  async findOneRatings(@Param('id') id: string) {
    return this.ratingService.getOneRating(+id);
  }

  @Post()
  @Roles('ADMIN')
  async createRating(@Body() ratingData: Prisma.RatingCreateInput) {
    return this.ratingService.createRating(ratingData);
  }

  @Patch('/:id')
  @Roles('ADMIN')
  async updateOneRating(
    @Param('id') id: string,
    @Body() updatedData: Prisma.RatingUpdateInput,
  ) {
    return this.ratingService.updateRating(+id, updatedData);
  }

  @Delete('/:id')
  @Roles('ADMIN')
  async deleteRating(@Param('id') id: string) {
    return this.ratingService.removeOneRating(+id);
  }
}
