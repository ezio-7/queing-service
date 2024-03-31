export declare class QueueService {
    private connection;
    private channel;
    createQueue(queueName: string): Promise<void>;
    addMessageToQueue(queueName: string, message: string): Promise<void>;
    getMessageCount(queueName: string): Promise<number>;
    getLastMessage(queueName: string): Promise<string>;
    getFirstMessage(queueName: string): Promise<string>;
    getAllMessages(queueName: string): Promise<string[]>;
    deleteQueue(queueName: string): Promise<void>;
    getAllQueues(): Promise<string[]>;
}
