import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface ServiceInfo {
  name: string;
  url: string;
  swaggerUrl?: string;
}

@Injectable()
export class DiscoveryService {
  private services: Map<string, ServiceInfo> = new Map();

  async registerService(serviceInfo: ServiceInfo): Promise<void> {
    this.services.set(serviceInfo.name, serviceInfo);
    console.log(`Service ${serviceInfo.name} enregistré avec succès`);
  }

  getService(name: string): ServiceInfo | undefined {
    return this.services.get(name);
  }

  getAllServices(): ServiceInfo[] {
    return Array.from(this.services.values());
  }
} 