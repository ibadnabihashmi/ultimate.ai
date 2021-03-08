import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpModule, HttpService } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../src/controllers/app.controller';
import { AppService } from '../src/services/app.service';
import { ChatService } from '../src/services/chat.service';
import { ReplyService } from '../src/services/reply.service';
import IntentResponse from '../src/models/intent-response.model';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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

    httpService = moduleFixture.get<HttpService>(HttpService);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/message (POST)', () => {
    const message: string = 'Hi How are you';

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of({
      data: message,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    } as AxiosResponse<any>));

    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of({
      data: {
        intents: [
          {
            confidence: 1,
            name: 'Greeting'
          }
        ],
        entities: []
      } as IntentResponse,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    } as AxiosResponse<any>))

    return request(app.getHttpServer())
      .post('/api/message')
      .send({
        message: 'Hello'
      })
      .expect(201)
      .expect(message);
  });
});
