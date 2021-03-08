import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ReplyModule } from './reply/reply.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ReplyModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION)
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
