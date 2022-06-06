import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ok, Err, Result } from 'ts-results';

@Injectable()
export class AppService {
  constructor() {}
}
