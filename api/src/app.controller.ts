import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import {Request} from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request): any {

    // console.log(`${req.protocol}://${req.get('Host')}${req.originalUrl}`);

    return this.appService.getHello();
  }
}
