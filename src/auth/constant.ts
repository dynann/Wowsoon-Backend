import { SetMetadata } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  refreshSecret: process.env.REFRESH_JWT_SECRET,
};
