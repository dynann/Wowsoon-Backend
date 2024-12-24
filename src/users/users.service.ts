import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as validator from 'validator';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //get request
  async getAllUsers() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      console.log(error);
      throw new HttpException('no user found', HttpStatus.NOT_FOUND);
    }
  }

  //post request
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    //validate email using validator library
    if (!validator.isEmail(data.email)) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    console.log(existingUser);
    if (existingUser) {
      throw new HttpException('email already exists', HttpStatus.CONFLICT);
    }

    if (
      typeof data.password === 'string' &&
      !this.isPasswordStrong(data.password)
    ) {
      throw new HttpException('Password is too weak', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    data.password = hashPassword;
    console.log('successfully created account');
    return this.prisma.user.create({
      data,
    });
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

    //find existing email first
    if (data.email && data.email !== user.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: typeof data.email === 'string' ? data.email : '' },
      });
      if (existingUser) {
        throw new HttpException('email does not exist', HttpStatus.CONFLICT);
      }
    }

    if (data.password) {
      if (
        typeof data.password === 'string' &&
        !this.isPasswordStrong(data.password)
      ) {
        throw new HttpException('Password is too weak', HttpStatus.BAD_REQUEST);
      }
      data.password =
        typeof data.password === 'string'
          ? await bcrypt.hash(data.password, 10)
          : data.password;
    }

    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
    return user;
  }

  private isPasswordStrong(password: string): boolean {
    return password.length >= 8;
  }
}
