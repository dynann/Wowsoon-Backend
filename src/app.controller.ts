import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from 'roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
