import { Document } from 'mongoose';
export type LogDocument = Log & Document;
export declare class Log {
    timestamp: Date;
    method: string;
    path: string;
    status: number;
    ip: string;
    userId?: string;
    service?: string;
}
export declare const LogSchema: import("mongoose").Schema<Log, import("mongoose").Model<Log, any, any, any, Document<unknown, any, Log> & Log & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Log, Document<unknown, {}, import("mongoose").FlatRecord<Log>> & import("mongoose").FlatRecord<Log> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
