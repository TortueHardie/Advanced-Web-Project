import { LogsService } from './logs.service';
import { Log } from '../schemas/log.schema';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
    create(logData: Partial<Log>): Promise<Log>;
    findAll(from?: string, to?: string, service?: string): Promise<Log[]>;
    exportLogs(from?: string, to?: string): Promise<Log[]>;
}
