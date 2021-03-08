import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ChatService } from '../services/chat.service';
import { ReplyService } from '../services/reply.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import IntentResponse from 'src/models/intent-response.model';

describe('AppService', () => {
  let appService: AppService;
  let chatService: ChatService;
  let replyService: ReplyService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports:[
        HttpModule,
        ConfigModule.forRoot()
      ],
      controllers: [AppController],
      providers: [
        AppService,
        ChatService,
        ReplyService
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
    chatService = app.get<ChatService>(ChatService);
    replyService = app.get<ReplyService>(ReplyService);
  });

  it('should return reply for a message', async () => {
    const reply: string = 'Hi how are you';
    const intents: IntentResponse = {
      intents: [
        {
          confidence: 1,
          name: 'Greeting'
        }
      ],
      entities: []
    };

    jest.spyOn(chatService, 'getIntents').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(intents)
      })
    });

    jest.spyOn(replyService, 'getReplyForIntent').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(reply)
      })
    });

    expect(await appService.postMessage('Hello')).toBe(reply);

    expect(chatService.getIntents).toBeCalled();
    expect(replyService.getReplyForIntent).toBeCalled();
  });
});
