import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from '../schemas/log.schema';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(Log.name) private logModel: Model<LogDocument>,
  ) {}

  async create(log: Partial<Log>): Promise<Log> {
    const createdLog = new this.logModel({
      ...log,
      timestamp: log.timestamp || new Date(),
    });
    return createdLog.save();
  }

  async findAll(query: { from?: Date; to?: Date; service?: string } = {}): Promise<Log[]> {
    const filter: any = {};
    
    if (query.from || query.to) {
      filter.timestamp = {};
      if (query.from) {
        filter.timestamp.$gte = new Date(query.from);
      }
      if (query.to) {
        filter.timestamp.$lte = new Date(query.to);
      }
    }
    
    if (query.service) {
      filter.service = query.service;
    }
    
    return this.logModel.find(filter).sort({ timestamp: -1 }).exec();
  }

  async update(id: string, updateData: Partial<Log>): Promise<Log> {
    const updatedLog = await this.logModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    
    if (!updatedLog) {
      throw new NotFoundException(`Log with ID "${id}" not found`);
    }
    
    return updatedLog;
  }
} 