// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { QueueService } from './queue/queue.service';
import { QueueController } from './queue/queue.controller';

@Module({
  imports: [RabbitmqModule], // Remove the '.forRoot()' function call
  controllers: [AppController, QueueController],
  providers: [AppService, QueueService],
})
export class AppModule {}
