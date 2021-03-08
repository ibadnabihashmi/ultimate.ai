import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from '../services/app.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import MessageDto from '../dto/message.dto';

@ApiTags('chat')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ 
    summary: 'Get reply for a message'
  })
  @ApiResponse({
    status: 200,
    description: 'reply for the message'
  })
  @Post('/message')
  postMessage(@Body() messageDto: MessageDto): Promise<string> {
    return this.appService.postMessage(messageDto.message);
  }
}
