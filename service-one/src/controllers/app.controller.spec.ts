import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '../services/app.service';
import { ChatService } from '../services/chat.service';
import { ReplyService } from '../services/reply.service';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import IntentResponse from 'src/models/intent-response.model';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

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

    appController = app.get<AppController>(AppController);

    appService = app.get<AppService>(AppService);
  });

  it('should return reply for a message', async () => {
    const reply: string = 'Hi how are you';

    jest.spyOn(appService, 'postMessage').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(reply)
      })
    });

    expect(await appController.postMessage({
      message: 'Hello'
    })).toBe(reply);

    expect(appService.postMessage).toBeCalled();
  });
});
