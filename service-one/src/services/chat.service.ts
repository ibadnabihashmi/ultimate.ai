import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import IntentResponse from '../models/intent-response.model';
import { AxiosResponse } from 'axios';

@Injectable()
export class ChatService {

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  async getIntents(message: string): Promise<IntentResponse> {
    const response: AxiosResponse = await this.httpService.post(
      this.configService.get<string>('CHAT_API'),
      {
        botId: this.configService.get<string>('BOT_ID'),
        message: message,
        conversationId: this.configService.get<string>('CONV_ID'),
      }, {
        headers: {
          'accept': 'application/json',
          'authorization': this.configService.get<string>('CHAT_API_KEY'),
          'Content-Type': 'application/json'
      }
    }).toPromise();

    return response.data;
  }
}
