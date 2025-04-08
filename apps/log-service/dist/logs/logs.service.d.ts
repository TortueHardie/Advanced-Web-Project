import { Model } from 'mongoose';
import { Log, LogDocument } from '../schemas/log.schema';
export declare class LogsService {
    private logModel;
    constructor(logModel: Model<LogDocument>);
    create(log: Partial<Log>): Promise<Log>;
    findAll(query?: {
        from?: Date;
        to?: Date;
        service?: string;
    }): Promise<Log[]>;
    update(id: string, updateData: Partial<Log>): Promise<Log>;
}
