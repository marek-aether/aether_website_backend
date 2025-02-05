import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  ContestApplication,
  ContestApplicationSchema,
} from './application.schema';

export enum Interests {
  CONTEST = 'contest',
  EXHIBITIONS = 'exhibitions',
  EVENTS = 'events',
  TECHNOLOGIES = 'technologies',
  INVESTING = 'investing',
}

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  hasDiscount: boolean;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  birthDate: string;

  @Prop()
  username: string;

  @Prop()
  artisticNickname: string;

  @Prop()
  citizenship: string;

  @Prop()
  address: string;

  @Prop()
  postalCode: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  isArtist: boolean;

  @Prop()
  portfolioUrl: string;

  @Prop()
  instagramUrl: string;

  @Prop()
  twitterUrl: string;

  @Prop()
  facebookUrl: string;

  @Prop({ type: [String], enum: Interests })
  interestedList: Interests[];

  @Prop({ default: 100 })
  applicationPrice: number;

  @Prop({ type: [ContestApplicationSchema] })
  applications: ContestApplication[];
}

export const UserSchema = SchemaFactory.createForClass(User);
