import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { Prisma } from '@prisma/client';
import { Roles } from 'roles.decorator';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  @Roles('ADMIN')
  async findAllFood() {
    return this.foodService.getAllFood();
  }

  @Get('/:id')
  @Roles('ADMIN')
  async findOneFood(@Param('id') id: string) {
    return this.foodService.getOneFood(+id);
  }

  @Post()
  @Roles('ADMIN')
  async createFood(@Body() orderItemData: Prisma.FoodCreateInput) {
    return this.foodService.createFood(orderItemData);
  }

  @Patch('/:id')
  @Roles('ADMIN')
  async updateOneFood(
    @Param('id') id: string,
    @Body() updatedData: Prisma.FoodUpdateInput,
  ) {
    return this.foodService.updateFood(+id, updatedData);
  }

  @Delete('/:id')
  @Roles('ADMIN')
  async deleteFood(@Param('id') id: string) {
    return this.foodService.removeOneFood(+id);
  }
}
