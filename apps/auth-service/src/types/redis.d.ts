import { Redis } from 'ioredis';

declare module 'ioredis' {
  interface Redis {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, mode?: string, duration?: number): Promise<'OK'>;
  }
} 