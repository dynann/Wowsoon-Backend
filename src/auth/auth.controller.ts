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
import { AuthGuardCre } from './auth.guard';
import { Public } from './constant';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { GoogleAuthGuard } from './google.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private  authService: AuthService,
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


  @Post('refresh')
  @UseGuards(AuthGuardCre)
  async refresh(@Body() body: { refresh_token: string }) {
    console.log(body.refresh_token);
    const token = await this.authService.refreshToken(body.refresh_token);
    return token;
  }


  @Public()
  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {
    console.log('google is triggered');
  }


  @Public()
  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req) {
    console.log('google is triggered');
    return {
      message: 'user from google',
      user: req.user,
    };
  }

  @UseGuards(AuthGuardCre)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
