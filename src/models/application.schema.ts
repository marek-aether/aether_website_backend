import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ArtCategory {
  PAINTING = 'painting',
  GRAPHICS = 'graphics',
  MIXED = 'mixed',
}

@Schema()
export class Artwork {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  technique: string;

  @Prop({ required: true, type: Object })
  size: {
    width: string;
    length: string;
    height: string;
  };

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  isAuthor: boolean;

  @Prop()
  image?: string;
}

export const ArtworkSchema = SchemaFactory.createForClass(Artwork);

@Schema()
export class Consents {
  @Prop({ required: true })
  regulations: boolean;

  @Prop({ required: true })
  personalData: boolean;

  @Prop({ required: true })
  image: boolean;
}

export const ConsentsSchema = SchemaFactory.createForClass(Consents);

@Schema()
export class ContestApplication extends Document {
  @Prop({ type: ArtworkSchema, required: true })
  artwork: Artwork;

  @Prop({ type: ConsentsSchema, required: true })
  consents: Consents;

  @Prop({ required: true })
  paymentStatus: string;

  @Prop({ required: true })
  paymentPrice: number;
}

export const ContestApplicationSchema =
  SchemaFactory.createForClass(ContestApplication);
