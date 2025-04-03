import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LogsService } from './logs.service';
import { Log } from '../schemas/log.schema';

@Controller('api/v1/logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  async create(@Body() logData: Partial<Log>) {
    return this.logsService.create(logData);
  }

  @Get()
  async findAll(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('service') service?: string,
  ) {
    const query: any = {};

    if (from) {
      query.from = new Date(from);
    }

    if (to) {
      query.to = new Date(to);
    }

    if (service) {
      query.service = service;
    }

    return this.logsService.findAll(query);
  }

  @Get('export')
  async exportLogs(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const query: any = {};

    if (from) {
      query.from = new Date(from);
    }

    if (to) {
      query.to = new Date(to);
    }

    return this.logsService.findAll(query);
  }
} 