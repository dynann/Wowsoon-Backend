import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  //write this method that allow only admin reputation to
  //retrieve admin users role

  //get admins
  async getAllAdmin() {
    const admins = [];
    const users = await this.prisma.user.findMany();
    users.map((user) => {
      if (user.roles === 'ADMIN') {
        admins.push(user);
      }
    });
    return admins;
  }

  //getAdminById
  async getOneAdmin(id: number): Promise<User | null> {
    const admin = await this.prisma.user.findUnique({
      where: { id },
    });
    return admin;
  }
}
