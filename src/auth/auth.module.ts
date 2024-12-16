import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { PassportModule } from '@nestjs/passport';
@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, GoogleStrategy],
  exports: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1600s' },
    }),
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
})
export class AuthModule {}
