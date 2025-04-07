import { Log } from '../../schemas/log.schema';
export declare class UpdateLogDto implements Partial<Log> {
    timestamp?: Date;
    method?: string;
    path?: string;
    status?: number;
    ip?: string;
    userId?: string;
    service?: string;
}
