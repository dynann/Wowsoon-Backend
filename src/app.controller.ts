import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from 'roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  @Roles('ADMIN')
  async getOneAdmin(@Param('id') id: string) {
    return this.appService.getOneAdmin(+id);
  }

  @Get()
  @Roles('ADMIN')
  async getAllAdmin(@Param('ADMIN') id: string) {
    return this.appService.getOneAdmin(+id);
  }
}
