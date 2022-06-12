import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Meta, MetaSchema } from 'schemas/meta.schema';
import { MetaService } from 'src/meta/meta.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meta.name, schema: MetaSchema }]),
  ],
  providers: [MetaService],
  exports: [MetaService],
})
export class MetaModule {}
