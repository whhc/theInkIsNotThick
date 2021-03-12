import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  // @Prop({ required: true })
  @Prop()
  title: string;

  @Prop()
  date: string;

  // @Prop([String])
  // tags: string[];

  @Prop()
  content: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
