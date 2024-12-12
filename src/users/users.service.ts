import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //get request
  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  //post request
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  //get request
  async getOneUser(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  //delete request
  async removeOneUser(id: number): Promise<User> {
    const user = await this.getOneUser(id);
    if (!user) {
      throw new HttpException('no user found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    return user;
  }

  //patch request
  async updateUser(
    id: number,
    data: Prisma.UserUpdateInput,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
    return user;
  }
}
