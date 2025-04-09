import { LogsService } from './logs.service';
import { Log } from '../schemas/log.schema';
import { UpdateLogDto } from './dto/update-log.dto';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
    create(logData: Partial<Log>): Promise<Log>;
    findAll(from?: string, to?: string, service?: string): Promise<Log[]>;
    exportLogs(from?: string, to?: string): Promise<Log[]>;
    update(id: string, updateLogDto: UpdateLogDto): Promise<Log>;
}
