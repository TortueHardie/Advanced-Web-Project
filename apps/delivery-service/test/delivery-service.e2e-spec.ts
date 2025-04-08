import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/filters/http-exception.filter';

describe('DeliveryService (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
    }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Health Check', () => {
    it('/health (GET)', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect({ status: 'ok' });
    });
  });

  describe('Available Deliveries', () => {
    it('/delivery/available (GET) - 401 sans authentification', () => {
      return request(app.getHttpServer())
        .get('/delivery/available')
        .expect(401);
    });
  });

  describe('Accept Delivery', () => {
    it('/delivery/:orderId/accept (PATCH) - 401 sans authentification', () => {
      const orderId = '00000000-0000-0000-0000-000000000000';
      return request(app.getHttpServer())
        .patch(`/delivery/${orderId}/accept`)
        .expect(401);
    });
  });

  describe('Update Delivery Status', () => {
    it('/delivery/:orderId/status (PATCH) - 401 sans authentification', () => {
      const orderId = '00000000-0000-0000-0000-000000000000';
      return request(app.getHttpServer())
        .patch(`/delivery/${orderId}/status`)
        .send({ status: 'IN_PROGRESS' })
        .expect(401);
    });
  });

  describe('My Deliveries', () => {
    it('/delivery/me (GET) - 401 sans authentification', () => {
      return request(app.getHttpServer())
        .get('/delivery/me')
        .expect(401);
    });
  });
}); 