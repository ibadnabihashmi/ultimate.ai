import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule } from '@nestjs/config';
import { ChatService } from './services/chat.service';
import { ReplyService } from './services/reply.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ChatService,
    ReplyService
  ],
})
export class AppModule {}
