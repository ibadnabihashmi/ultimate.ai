import { Controller, Get, Delete, Put, Post, Body, Param, Patch } from '@nestjs/common';
import { ReplyService } from './reply.service';
import CreateReplyDto from './dto/create-reply.dto';
import { Reply } from './reply.schema';
import {
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import AddReplyDto from './dto/add-reply.dto';

@ApiTags('api/reply')
@Controller('api/reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @ApiResponse({
    status: 200,
    description:'Returns all replies in database',
    type: [CreateReplyDto]
  })
  @Get()
  getAllReplies(): Promise<Array<Reply>> {
    return this.replyService.getAllReplies();
  }

  @ApiResponse({
    status: 200,
    description:'Returns one reply object for an :id',
    type: CreateReplyDto
  })
  @Get(':id')
  getReply(@Param('id') id: string): Promise<Reply> {
    return this.replyService.getReply(id);
  }

  @ApiResponse({
    status: 200,
    description:'Deletes one reply object for an :id'
  })
  @Delete(':id')
  deleteReply(@Param('id') id: string): Promise<any> {
    return this.replyService.deleteReply(id);
  }

  @ApiResponse({
    status: 200,
    description:'Updates one reply object for an :id',
    type: CreateReplyDto
  })
  @Put(':id')
  updateReply(@Param('id') id: string, @Body() updateReply: CreateReplyDto): Promise<Reply> {
    return this.replyService.updateReply(id, updateReply);
  }

  @ApiResponse({
    status: 200,
    description:'Create one reply object',
    type: CreateReplyDto
  })
  @Post()
  createReply(@Body() createReply: CreateReplyDto): Promise<Reply> {
    return this.replyService.createReply(createReply);
  }

  @ApiResponse({
    status: 200,
    description:'Adds a reply against intent',
    type: CreateReplyDto
  })
  @Patch('/:id/intent')
  addMessageToIntent(@Param('id') id: string, @Body() replyDto: AddReplyDto): Promise<Reply> {
    return this.replyService.addMessageToIntent(id, replyDto.reply);
  }

  @ApiResponse({
    status: 200,
    description:'Returns a random message for a given intent',
    type: 'string'
  })
  @Get('/intent/:intent/message')
  getRandomMessageByIntent(@Param('intent') intent: string): Promise<string> {
    return this.replyService.getRandomMessageByIntent(intent);
  }

  @ApiResponse({
    status: 200,
    description:'Returns a reply object by intent',
    type: CreateReplyDto
  })
  @Get('/intent/:intent')
  getByIntent(@Param('intent') intent: string): Promise<Reply> {
    return this.replyService.getByIntent(intent);
  }
}
