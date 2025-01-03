import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
dotenv.config();
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  async SignIn(email: string, pass: string): Promise<any> {
    const users = await this.userService.getAllUsers();
    const user = users.find((user) => user.email === email);
    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };
    console.log(payload);
    return this.generateToken(payload);
  }

  //refresh token generator
  async generateToken(payload: any) {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.REFRESH_JWT_EXPIRED,
    });
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  //refresh token where user send refresh token to get new access token
  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      console.log(payload.sub);
      const user = await this.userService.getOneUser(+payload.sub);
      console.log(user);
      return this.generateToken({
        sub: user.id,
        email: user.email,
        roles: user.roles,
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  //generate impersonated access token
  async generateImpersonationToken(adminId: number, targetUserId: number) {
    const targetUser = await this.prisma.user.findUnique({
      where: {
        id: targetUserId,
      },
    });
    if (!targetUser) {
      throw new UnauthorizedException("User doesn't not exist");
    }
    console.log(targetUser);
    const payload = {
      id: adminId,
      impersonatedUserId: targetUserId,
      roles: ['ADMIN'],
    };
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  //get user impersonate profile
  async getImpersonateProfile(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  }
}
