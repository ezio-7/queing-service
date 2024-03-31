// rabbitmq.module.ts
import { Module, Global } from '@nestjs/common';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';

@Global() // Add Global decorator to make the module global
@Module({
  providers: [AmqpConnection],
  exports: [AmqpConnection],
})
export class RabbitmqModule {
  static forRoot: any;
}
