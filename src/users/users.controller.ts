import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { Public } from 'src/auth/constant';
import { Roles } from 'roles.decorator';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  @Roles('USER', 'ADMIN')
  async findAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get('/:id')
  @Roles('USER', 'ADMIN')
  async findOneUser(@Param('id') id: string) {
    return this.userService.getOneUser(+id);
  }

  @Get('/:id/past-order')
  @Roles('USER', 'ADMIN')
  async getPastOrders(@Param('id') id: number) {
    return this.userService.getPastOrder(+id);
  }

  @Delete('/:id')
  @Roles('USER', 'ADMIN')
  async deleteOneUser(@Param('id') id: string) {
    return this.userService.removeOneUser(+id);
  }

  //patch request
  @Patch('/:id')
  @Roles('USER', 'ADMIN')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserInput: Prisma.UserUpdateInput,
  ) {
    return this.userService.updateUser(+id, updateUserInput);
  }
  //public everyone can create account
  @Public()
  @Post('/create-account')
  async createUser(@Body() userData: Prisma.UserCreateInput) {
    return this.userService.createUser(userData);
  }
}
