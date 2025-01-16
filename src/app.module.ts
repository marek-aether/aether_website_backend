import { Module } from '@nestjs/common';
import { AuthModule } from './routes/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HybridAuthModule } from '@nestjs-hybrid-auth/all';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    HybridAuthModule.forRoot({
      facebook: {
        clientID: process.env.INSTAGRAM_CLIENT_ID,
        clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
        callbackURL: process.env.INSTAGRAM_CALLBACK_URL,
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
