import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Offer, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async getAllOffers() {
    return this.prisma.offer.findMany();
  }
  //getOffer
  async getOneOffer(id: number): Promise<Offer | null> {
    const offer = await this.prisma.offer.findUnique({
      where: { id },
    });
    return offer;
  }

  //createOffer
  async createOffer(data: Prisma.OfferCreateInput): Promise<Offer | null> {
    return this.prisma.offer.create({ data });
  }

  //updateOffer
  async updateOffer(
    id: number,
    updateData: Prisma.OfferUpdateInput,
  ): Promise<Offer | null> {
    const offer = await this.prisma.offer.findUnique({
      where: { id },
    });
    if (!offer) {
      throw new HttpException('no rating found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.offer.update({
      where: { id },
      data: updateData,
    });
  }

  //removeOffer
  async removeOneOffer(id: number): Promise<Offer | null> {
    const offer = await this.prisma.offer.findUnique({
      where: { id },
    });
    if (!offer) {
      throw new HttpException('no rating is found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.offer.delete({
      where: { id },
    });
  }
}
