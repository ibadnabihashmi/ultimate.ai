import { Injectable, HttpService } from '@nestjs/common';
import IntentResponse from '../models/intent-response.model';
import Intent from '../models/intent.model';
import { ChatService } from './chat.service';
import { ReplyService } from './reply.service';

@Injectable()
export class AppService {

  constructor(
    private chatService: ChatService,
    private replyService: ReplyService
  ) {}

  private getIntentWithHighestConfidence(intents: IntentResponse): Intent {
    return (intents.intents.sort(
      (intent1: Intent, intent2: Intent) => {
        return intent1.confidence - intent2.confidence
      }
    ))[0]
  }
  
  async postMessage(message: string): Promise<string> {

    const intents: IntentResponse = await this.chatService.getIntents(message);

    const intent: Intent = this.getIntentWithHighestConfidence(intents);

    const encodedIntent = encodeURIComponent(intent.name);

    const reply: string = await this.replyService.getReplyForIntent(encodedIntent);

    return reply;
  }
}
