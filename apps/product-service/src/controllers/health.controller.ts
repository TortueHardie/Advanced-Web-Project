import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Vérifier l\'état du service' })
  @ApiResponse({ 
    status: 200, 
    description: 'Le service est opérationnel',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'ok'
        },
        timestamp: {
          type: 'string',
          example: '2024-04-04T12:00:00Z'
        }
      }
    }
  })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString()
    };
  }
} 