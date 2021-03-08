import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';

@Injectable()
export class ReplyService {

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  async getReplyForIntent(intent: string): Promise<string> {
    const response: AxiosResponse = await this.httpService.get(
      `${this.configService.get<string>('SERVICE_TWO')}/reply/intent/${intent}/message`
    ).toPromise();

    return response.data;
  }
}
