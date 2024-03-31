// queue.controller.ts
import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  async createQueue(@Body('queueName') queueName: string) {
    await this.queueService.createQueue(queueName);
    return { message: `Queue '${queueName}' created successfully.` };
  }

  @Post(':queueName/add')
  async addMessageToQueue(
    @Param('queueName') queueName: string,
    @Body('message') message: string,
  ) {
    await this.queueService.addMessageToQueue(queueName, message);
    return { message: `Message added to queue '${queueName}' successfully.` };
  }

  @Get(':queueName/count')
  async getMessageCount(@Param('queueName') queueName: string) {
    const count = await this.queueService.getMessageCount(queueName);
    return { count };
  }

  @Get(':queueName/last')
  async getLastMessage(@Param('queueName') queueName: string) {
    const lastMessage = await this.queueService.getLastMessage(queueName);
    return { lastMessage };
  }

  @Get(':queueName/first')
  async getFirstMessage(@Param('queueName') queueName: string) {
    const firstMessage = await this.queueService.getFirstMessage(queueName);
    return { firstMessage };
  }

  @Get(':queueName/all')
  async getAllMessages(@Param('queueName') queueName: string) {
    const allMessages = await this.queueService.getAllMessages(queueName);
    return { allMessages };
  }

  @Delete(':queueName')
  async deleteQueue(@Param('queueName') queueName: string) {
    await this.queueService.deleteQueue(queueName);
    return { message: `Queue '${queueName}' deleted successfully.` };
  }

  @Get('all')
  async getAllQueues() {
    const allQueues = await this.queueService.getAllQueues();
    return { allQueues };
  }
}
