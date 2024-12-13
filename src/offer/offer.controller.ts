import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { Prisma } from '@prisma/client';
import { Roles } from 'roles.decorator';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get()
  @Roles('ADMIN')
  async findAllOffers() {
    return this.offerService.getAllOffers();
  }

  @Get('/:id')
  @Roles('ADMIN')
  async findOneOffer(@Param('id') id: string) {
    return this.offerService.getOneOffer(+id);
  }

  @Post()
  @Roles('ADMIN')
  async createOffer(@Body() orderItemData: Prisma.OfferCreateInput) {
    return this.offerService.createOffer(orderItemData);
  }

  @Patch('/:id')
  @Roles('ADMIN')
  async updateOneOffer(
    @Param('id') id: string,
    @Body() updatedData: Prisma.OfferUpdateInput,
  ) {
    return this.offerService.updateOffer(+id, updatedData);
  }

  @Delete('/:id')
  @Roles('ADMIN')
  async deleteOffer(@Param('id') id: string) {
    return this.offerService.removeOneOffer(+id);
  }
}
