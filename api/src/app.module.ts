import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientModule } from './ingredient/ingredient.module';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { RecipeModule } from './recipe/recipe.module';
import { MetaModule } from './meta/meta.module';

const DB_URL = `mongodb://${process.env.MONGO_URL}`;
const isProduction = process.env.NODE_ENV === 'production';

console.log('Database URL: ', DB_URL);
console.log('isProduction: ', isProduction);

@Module({
  imports: [
    ConfigModule.forRoot(),
    MetaModule,
    MongooseModule.forRoot(DB_URL, {
      dbName: process.env.DB_NAME,
      user: process.env.MONGO_USERNAME,
      pass: process.env.MONGO_PASSWORD,
    }),
    IngredientModule,
    BootstrapModule,
    RecipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
