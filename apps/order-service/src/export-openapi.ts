import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { swaggerConfig, swaggerDocumentOptions } from './swagger.config';

/**
 * Script pour exporter la documentation OpenAPI au format JSON
 * Cela permet de partager la documentation avec d'autres outils ou équipes
 */
async function exportOpenAPI() {
  const app = await NestFactory.create(AppModule);
  
  // Génération du document OpenAPI
  const document = SwaggerModule.createDocument(app, swaggerConfig, swaggerDocumentOptions);
  
  // Sauvegarde du document JSON
  const outputPath = join(process.cwd(), 'openapi-spec.json');
  writeFileSync(outputPath, JSON.stringify(document, null, 2), { encoding: 'utf8' });
  
  console.log(`✅ Documentation OpenAPI exportée vers: ${outputPath}`);
  
  await app.close();
}

exportOpenAPI().catch(err => {
  console.error('❌ Erreur lors de l\'export de la documentation OpenAPI:', err);
  process.exit(1);
}); 