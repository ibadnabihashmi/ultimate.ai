import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../controllers/app.controller';
import { AppService } from './app.service';
import { ChatService } from './chat.service';
import { ReplyService } from './reply.service';
import { HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

describe('ReplyService', () => {
  let replyService: ReplyService;
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

    replyService = app.get<ReplyService>(ReplyService);
    httpService = app.get<HttpService>(HttpService);
  });

  it('should return reply for a message', async () => {
    const message: string = 'Hi How are you';

    const result: AxiosResponse<any> = {
      data: message,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result))

    expect(await replyService.getReplyForIntent('Hello')).toBe(message);

    expect(httpService.get).toBeCalled();
  });
});
