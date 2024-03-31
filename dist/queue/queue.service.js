"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const common_1 = require("@nestjs/common");
const amqplib_1 = require("amqplib");
const axios_1 = require("axios");
let QueueService = exports.QueueService = class QueueService {
    async createQueue(queueName) {
        if (!this.connection) {
            this.connection = await (0, amqplib_1.connect)('amqp://localhost');
            this.channel = await this.connection.createChannel();
        }
        await this.channel.assertQueue(queueName);
    }
    async addMessageToQueue(queueName, message) {
        if (!this.connection) {
            this.connection = await (0, amqplib_1.connect)('amqp://localhost');
            this.channel = await this.connection.createChannel();
        }
        this.channel.sendToQueue(queueName, Buffer.from(message));
    }
    async getMessageCount(queueName) {
        if (!this.connection) {
            this.connection = await (0, amqplib_1.connect)('amqp://localhost');
            this.channel = await this.connection.createChannel();
        }
        const queueInfo = await this.channel.assertQueue(queueName);
        return queueInfo.messageCount;
    }
    async getLastMessage(queueName) {
        if (!this.connection) {
            this.connection = await (0, amqplib_1.connect)('amqp://localhost');
            this.channel = await this.connection.createChannel();
        }
        const message = await this.channel.get(queueName, {
            noAck: true,
        });
        return message ? message.content.toString() : null;
    }
    async getFirstMessage(queueName) {
        if (!this.connection) {
            this.connection = await (0, amqplib_1.connect)('amqp://localhost');
            this.channel = await this.connection.createChannel();
        }
        const message = await this.channel.get(queueName, {
            noAck: false,
        });
        if (message) {
            this.channel.ack(message);
            return message.content.toString();
        }
        else {
            return null;
        }
    }
    async getAllMessages(queueName) {
        if (!this.connection) {
            this.connection = await (0, amqplib_1.connect)('amqp://localhost');
            this.channel = await this.connection.createChannel();
        }
        const messages = [];
        let message;
        while ((message = await this.channel.get(queueName, { noAck: true }))) {
            messages.push(message.content.toString());
        }
        return messages;
    }
    async deleteQueue(queueName) {
        if (!this.connection) {
            this.connection = await (0, amqplib_1.connect)('amqp://localhost');
            this.channel = await this.connection.createChannel();
        }
        await this.channel.deleteQueue(queueName);
    }
    async getAllQueues() {
        if (!this.connection) {
            this.connection = await (0, amqplib_1.connect)('amqp://localhost');
            this.channel = await this.connection.createChannel();
        }
        const apiUrl = 'http://localhost:15672/api/queues';
        const auth = { username: 'guest', password: 'guest' };
        try {
            const response = await axios_1.default.get(apiUrl, { auth });
            const queueList = response.data.map((queueInfo) => queueInfo.name);
            return queueList;
        }
        catch (error) {
            console.error('Error fetching queues:', error.message);
            return [];
        }
    }
};
exports.QueueService = QueueService = __decorate([
    (0, common_1.Injectable)()
], QueueService);
//# sourceMappingURL=queue.service.js.map