import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { LogsService } from './logs.service';
import { Log } from '../schemas/log.schema';
import { UpdateLogDto } from './dto/update-log.dto';

@ApiTags('logs')
@Controller('api/v1/logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau log' })
  @ApiBody({ type: Log, description: 'Données du log à créer' })
  @ApiResponse({ status: 201, description: 'Log créé avec succès', type: Log })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async create(@Body() logData: Partial<Log>) {
    return this.logsService.create(logData);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les logs avec filtrage optionnel' })
  @ApiResponse({ status: 200, description: 'Liste des logs', type: [Log] })
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
  @ApiOperation({ summary: 'Exporter les logs avec filtrage optionnel' })
  @ApiResponse({ status: 200, description: 'Liste des logs exportés', type: [Log] })
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

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un log par ID' })
  @ApiParam({ name: 'id', description: 'ID du log à mettre à jour' })
  @ApiBody({ type: UpdateLogDto, description: 'Données à mettre à jour' })
  @ApiResponse({ status: 200, description: 'Log mis à jour avec succès', type: Log })
  @ApiResponse({ status: 404, description: 'Log non trouvé' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async update(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
    try {
      return await this.logsService.update(id, updateLogDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw error;
    }
  }
} 