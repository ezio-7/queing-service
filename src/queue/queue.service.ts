// queue.service.ts
import { Injectable } from '@nestjs/common';
import { connect, Connection, Channel, Message } from 'amqplib';
import axios from 'axios';

@Injectable()
export class QueueService {
  private connection: Connection;
  private channel: Channel;

  async createQueue(queueName: string): Promise<void> {
    if (!this.connection) {
      this.connection = await connect('amqp://localhost'); // Replace 'localhost' with your RabbitMQ server's hostname
      this.channel = await this.connection.createChannel();
    }

    await this.channel.assertQueue(queueName);
  }

  async addMessageToQueue(queueName: string, message: string): Promise<void> {
    if (!this.connection) {
      this.connection = await connect('amqp://localhost'); // Replace 'localhost' with your RabbitMQ server's hostname
      this.channel = await this.connection.createChannel();
    }

    // Publish the message to the queue
    this.channel.sendToQueue(queueName, Buffer.from(message));
  }

  async getMessageCount(queueName: string): Promise<number> {
    if (!this.connection) {
      this.connection = await connect('amqp://localhost'); // Replace 'localhost' with your RabbitMQ server's hostname
      this.channel = await this.connection.createChannel();
    }

    const queueInfo = await this.channel.assertQueue(queueName);
    return queueInfo.messageCount;
  }

  async getLastMessage(queueName: string): Promise<string> {
    if (!this.connection) {
      this.connection = await connect('amqp://localhost'); // Replace 'localhost' with your RabbitMQ server's hostname
      this.channel = await this.connection.createChannel();
    }

    // Get the last message from the queue
    const message: Message | false = await this.channel.get(queueName, {
      noAck: true,
    });
    return message ? message.content.toString() : null;
  }

  async getFirstMessage(queueName: string): Promise<string> {
    if (!this.connection) {
      this.connection = await connect('amqp://localhost'); // Replace 'localhost' with your RabbitMQ server's hostname
      this.channel = await this.connection.createChannel();
    }

    // Consume the first message from the queue
    const message: Message | false = await this.channel.get(queueName, {
      noAck: false,
    });
    if (message) {
      this.channel.ack(message); // Acknowledge the message to remove it from the queue
      return message.content.toString();
    } else {
      return null;
    }
  }

  async getAllMessages(queueName: string): Promise<string[]> {
    if (!this.connection) {
      this.connection = await connect('amqp://localhost'); // Replace 'localhost' with your RabbitMQ server's hostname
      this.channel = await this.connection.createChannel();
    }

    const messages: string[] = [];
    let message: Message | false;

    while ((message = await this.channel.get(queueName, { noAck: true }))) {
      messages.push(message.content.toString());
    }

    return messages;
  }

  async deleteQueue(queueName: string): Promise<void> {
    if (!this.connection) {
      this.connection = await connect('amqp://localhost'); // Replace 'localhost' with your RabbitMQ server's hostname
      this.channel = await this.connection.createChannel();
    }

    await this.channel.deleteQueue(queueName);
  }

  async getAllQueues(): Promise<string[]> {
    if (!this.connection) {
      this.connection = await connect('amqp://localhost'); // Replace 'localhost' with your RabbitMQ server's hostname
      this.channel = await this.connection.createChannel();
    }

    const apiUrl = 'http://localhost:15672/api/queues'; // Replace with the RabbitMQ Management API URL
    const auth = { username: 'guest', password: 'guest' }; // Replace with your RabbitMQ Management API credentials

    try {
      const response = await axios.get(apiUrl, { auth });
      const queueList: string[] = response.data.map(
        (queueInfo) => queueInfo.name,
      );
      return queueList;
    } catch (error) {
      console.error('Error fetching queues:', error.message);
      return [];
    }
  }
}
