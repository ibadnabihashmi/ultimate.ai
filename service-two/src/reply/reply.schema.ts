import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReplyDocument = Reply & Document;

@Schema()
export class Reply {
  
  @Prop({
    unique: true,
    required: true
  })
  intent: string;

  @Prop({
    type: Array,
    default: []
  })
  replies: Array<string>;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);