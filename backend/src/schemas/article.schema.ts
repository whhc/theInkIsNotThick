import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ type: mongoose.Schema.Types.String, minlength: 4 })
  title: string;

  @Prop({ type: mongoose.Schema.Types.String })
  date: string;

  @Prop([String])
  tags: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.String, minlength: 8 })
  content: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
