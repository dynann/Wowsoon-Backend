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
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuardCre } from './auth.guard';
import { Public } from './constant';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { GoogleAuthGuard } from './google.guard';
import { Roles } from 'roles.decorator';
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
    const { password, email } = signInDto;
    //find user
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
    console.log(user);
    if (!user) {
      throw new HttpException('account does not exist', HttpStatus.NOT_FOUND);
    }
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return this.authService.SignIn(signInDto.email, user.password);
    } else {
      throw new HttpException('wrong credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  //refresh token
  @Post('refresh')
  @UseGuards(AuthGuardCre)
  async refresh(@Body() body: { refresh_token: string }) {
    console.log(body.refresh_token);
    const token = await this.authService.refreshToken(body.refresh_token);
    return token;
  }

  //impersonate token
  @Post('impersonate/:userId')
  @UseGuards(AuthGuardCre)
  @Roles('ADMIN')
  async impersonate(@Param('userId') userId: string, @Req() req: any) {
    const adminId = req.user.id;
    return {
      token: await this.authService.generateImpersonationToken(
        +adminId,
        +userId,
      ),
    };
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

  //get user impersonate profile
  @UseGuards(AuthGuardCre)
  @Get('profile')
  getImpersonateProfile(@Request() req) {
    return this.authService.getImpersonateProfile(req.user.id);
  }
}
