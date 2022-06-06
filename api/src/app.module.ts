import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const DB_URL = `mongodb://${process.env.MONGO_URL}`;
const isProduction = process.env.NODE_ENV === 'production';

console.log('Database URL: ', DB_URL);
console.log('isProduction: ', isProduction);

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(DB_URL, {
      dbName: process.env.DB_NAME,
      user: process.env.MONGO_USERNAME,
      pass: process.env.MONGO_PASSWORD,
    }),
    MongooseModule.forFeature([
      // PUT MODELS HERE
      // { name: MODEL.name, schema: MODELSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
