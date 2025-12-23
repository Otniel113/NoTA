import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type NoteDocument = Note & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'edited_at' } })
export class Note {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ required: true, maxlength: 100 })
  title: string;

  @Prop({ required: true, maxlength: 1000 })
  content: string;

  @Prop({ required: true, enum: ['public', 'member'], default: 'public' })
  visibility: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
