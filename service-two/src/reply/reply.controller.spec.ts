import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';
import { Reply } from './reply.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('ReplyController', () => {
  let replyController: ReplyController;
  let replyService: ReplyService;

  beforeEach(async () => {
    const mockReplyModel = (dto: any) => {
      this!.data = dto;
      this!.save = () => {
        return this!.data;
      };
    }
    const app: TestingModule = await Test.createTestingModule({
      imports:[
        HttpModule,
        ConfigModule.forRoot()
      ],
      controllers: [ReplyController],
      providers: [
        ReplyService,
        {
          provide: getModelToken('Reply'),
          useValue: mockReplyModel,
        },
      ],
    }).compile();

    replyController = app.get<ReplyController>(ReplyController);

    replyService = app.get<ReplyService>(ReplyService);
  });

  it('should return all replies', async () => {
    const reply: Array<Reply> = [{
      replies: ['hi how are you'],
      intent: 'Greeting'
    }];

    jest.spyOn(replyService, 'getAllReplies').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => {
        resolve(reply)
      })
    });

    expect(await replyController.getAllReplies()).toBe(reply);

    expect(replyService.getAllReplies).toBeCalled();
  });

  it('should return one reply', async () => {
    const reply: Reply = {
      replies: ['hi how are you'],
      intent: 'Greeting'
    };

    jest.spyOn(replyService, 'getReply').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => {
        resolve(reply)
      })
    });

    expect(await replyController.getReply('23231')).toBe(reply);

    expect(replyService.getReply).toBeCalled();
  });

  it('should delete one reply', async () => {
    const reply: Reply = {
      replies: ['hi how are you'],
      intent: 'Greeting'
    };

    const id: string = '1213';

    jest.spyOn(replyService, 'deleteReply').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => {
        resolve(reply)
      })
    });

    await replyController.deleteReply(id);

    expect(replyService.deleteReply).toBeCalledWith(id);    
  });

  it('should update one reply', async () => {
    const reply: Reply = {
      replies: ['hi how are you'],
      intent: 'Greeting'
    };

    const id: string = '12323';

    jest.spyOn(replyService, 'updateReply').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => {
        resolve(reply)
      })
    });

    expect(await replyController.updateReply(id, reply)).toBe(reply);

    expect(replyService.updateReply).toBeCalledWith(id, reply);
  });

  it('should create one reply', async () => {
    const reply: Reply = {
      replies: ['hi how are you'],
      intent: 'Greeting'
    };

    jest.spyOn(replyService, 'createReply').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => {
        resolve(reply)
      })
    });

    expect(await replyController.createReply(reply)).toBe(reply);

    expect(replyService.createReply).toBeCalledWith(reply);
  });

  it('should add one reply', async () => {
    const reply: Reply = {
      replies: ['hi how are you'],
      intent: 'Greeting'
    };

    const id: string = '12312';

    jest.spyOn(replyService, 'addMessageToIntent').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => {
        resolve(reply)
      })
    });

    expect(await replyController.addMessageToIntent(id, {
      reply: 'hello'
    })).toBe(reply);

    expect(replyService.addMessageToIntent).toBeCalledWith(id, 'hello');
  });

  it('should return random message', async () => {
    const intent: string = 'Greeting';

    jest.spyOn(replyService, 'getRandomMessageByIntent').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => {
        resolve("Hello")
      })
    });

    expect(await replyController.getRandomMessageByIntent(intent)).toBe("Hello");

    expect(replyService.getRandomMessageByIntent).toBeCalledWith(intent);
  });

  it('should return reply by intent', async () => {
    const reply: Reply = {
      replies: ['hi how are you'],
      intent: 'Greeting'
    };

    const intent: string = 'Greeting';

    jest.spyOn(replyService, 'getByIntent').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => {
        resolve(reply)
      })
    });

    expect(await replyController.getByIntent(intent)).toBe(reply);

    expect(replyService.getByIntent).toBeCalledWith(intent);
  });
});
