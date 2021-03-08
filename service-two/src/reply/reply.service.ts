import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateReplyDto from './dto/create-reply.dto';
import { Reply, ReplyDocument } from './reply.schema';

@Injectable()
export class ReplyService {

  private readonly DEFAULT_REPLY="Please wait someone will be with you shortly";

  constructor(
    @InjectModel(Reply.name) private readonly replyModel: Model<ReplyDocument>,
  ) {}
  
  async getAllReplies(): Promise<Array<Reply>> {
    return this.replyModel.find().exec();
  }

  async getReply(id: string): Promise<Reply> {
    return this.replyModel.findById(id).exec();
  }

  async deleteReply(id: string): Promise<any> {
    return this.replyModel.deleteOne({
      _id: id
    }).exec();
  }

  async updateReply(id: string, updateReply: CreateReplyDto): Promise<Reply> {
    await this.replyModel.updateOne({
      _id: id
    }, updateReply).exec();
    return this.replyModel.findById(id);
  }

  async createReply(createReply: CreateReplyDto): Promise<Reply> {
    const reply = await this.replyModel.create(createReply);
    return reply.save();
  }

  async getByIntent(intent: string): Promise<Reply> {
    return this.replyModel.findOne({
      intent: intent
    }).exec();
  }

  async addMessageToIntent(id: string, message: string): Promise<Reply> {
    const reply: Reply = await this.replyModel.findById(id).exec();
    reply.replies.push(message);
    this.replyModel.findByIdAndUpdate(id, reply).exec();
    return reply;
  }

  async getRandomMessageByIntent(intent: string): Promise<string> {
    const reply: Reply = await this.replyModel.findOne({
      intent: intent
    }).exec();

    if (reply) {
      return reply.replies[Math.floor(Math.random() * reply.replies.length)]
    } else {
      return this.DEFAULT_REPLY;
    }
  }
}
