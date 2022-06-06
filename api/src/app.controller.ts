import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { Ok, Err, Result } from 'ts-results';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  async healthCheck() {
    return { ok: true };
  }
}
