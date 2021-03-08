import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../controllers/app.controller';
import { AppService } from './app.service';
import { ChatService } from './chat.service';
import { ReplyService } from './reply.service';
import { HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import IntentResponse from 'src/models/intent-response.model';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

describe('ChatService', () => {
  let chatService: ChatService;
  let httpService: HttpService;

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

    chatService = app.get<ChatService>(ChatService);
    httpService = app.get<HttpService>(HttpService);
  });

  it('should return intents for a message', async () => {
    const intents: IntentResponse = {
      intents: [
        {
          confidence: 1,
          name: 'Greeting'
        }
      ],
      entities: []
    };

    const result: AxiosResponse<any> = {
      data: intents,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result))

    expect(await chatService.getIntents('Hello')).toBe(intents);

    expect(httpService.post).toBeCalled();
  });
});
