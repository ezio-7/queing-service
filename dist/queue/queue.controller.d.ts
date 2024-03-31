import { QueueService } from './queue.service';
export declare class QueueController {
    private readonly queueService;
    constructor(queueService: QueueService);
    createQueue(queueName: string): Promise<{
        message: string;
    }>;
    addMessageToQueue(queueName: string, message: string): Promise<{
        message: string;
    }>;
    getMessageCount(queueName: string): Promise<{
        count: number;
    }>;
    getLastMessage(queueName: string): Promise<{
        lastMessage: string;
    }>;
    getFirstMessage(queueName: string): Promise<{
        firstMessage: string;
    }>;
    getAllMessages(queueName: string): Promise<{
        allMessages: string[];
    }>;
    deleteQueue(queueName: string): Promise<{
        message: string;
    }>;
    getAllQueues(): Promise<{
        allQueues: string[];
    }>;
}
