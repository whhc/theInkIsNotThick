import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.String })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String })
  password: string;

  @Prop(Number)
  age: number;

  @Prop()
  gender: string;

  @Prop({ type: mongoose.Schema.Types.String })
  inviteCode: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
