import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Get,
  HttpException,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './constant';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    console.log(signInDto);
    const { password, username } = signInDto;
    //find user
    const user = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
    console.log(user);
    if (!user) {
      throw new HttpException('account does not exist', HttpStatus.NOT_FOUND);
    }
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return this.authService.SignIn(signInDto.username, user.password);
    } else {
      throw new HttpException('wrong credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  @Public()
  @Get('google')
  googleAuth() {}

  @Public()
  @Get('google/redirect')
  googleAuthRedirect(@Req() req) {
    return {
      message: 'user from google',
      user: req.user,
    };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
