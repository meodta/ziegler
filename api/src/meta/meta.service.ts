import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meta, MetaDocument } from 'schemas/meta.schema';
import { Model } from 'mongoose';

@Injectable()
export class MetaService {
  constructor(@InjectModel(Meta.name) private model: Model<MetaDocument>) {}

  async onModuleInit() {
    const meta = await this.model.findOne().exec();
    if (meta) return;
    await new this.model().save();
  }

  public async isInitialized() {
    const meta = await this.model.findOne().exec();
    return meta?.initialized;
  }

  public async setInitialized(state = true) {
    const meta = await this.model.findOne().exec();
    meta.initialized = state;
    return meta.save();
  }
}
