import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogDocument = Log & Document;

@Schema()
export class Log {
  @Prop({ required: true })
  timestamp: Date;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  status: number;

  @Prop({ required: true })
  ip: string;

  @Prop()
  userId?: string;

  @Prop()
  service?: string;
}

export const LogSchema = SchemaFactory.createForClass(Log); 