"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueController = void 0;
const common_1 = require("@nestjs/common");
const queue_service_1 = require("./queue.service");
let QueueController = exports.QueueController = class QueueController {
    constructor(queueService) {
        this.queueService = queueService;
    }
    async createQueue(queueName) {
        await this.queueService.createQueue(queueName);
        return { message: `Queue '${queueName}' created successfully.` };
    }
    async addMessageToQueue(queueName, message) {
        await this.queueService.addMessageToQueue(queueName, message);
        return { message: `Message added to queue '${queueName}' successfully.` };
    }
    async getMessageCount(queueName) {
        const count = await this.queueService.getMessageCount(queueName);
        return { count };
    }
    async getLastMessage(queueName) {
        const lastMessage = await this.queueService.getLastMessage(queueName);
        return { lastMessage };
    }
    async getFirstMessage(queueName) {
        const firstMessage = await this.queueService.getFirstMessage(queueName);
        return { firstMessage };
    }
    async getAllMessages(queueName) {
        const allMessages = await this.queueService.getAllMessages(queueName);
        return { allMessages };
    }
    async deleteQueue(queueName) {
        await this.queueService.deleteQueue(queueName);
        return { message: `Queue '${queueName}' deleted successfully.` };
    }
    async getAllQueues() {
        const allQueues = await this.queueService.getAllQueues();
        return { allQueues };
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('queueName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "createQueue", null);
__decorate([
    (0, common_1.Post)(':queueName/add'),
    __param(0, (0, common_1.Param)('queueName')),
    __param(1, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "addMessageToQueue", null);
__decorate([
    (0, common_1.Get)(':queueName/count'),
    __param(0, (0, common_1.Param)('queueName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "getMessageCount", null);
__decorate([
    (0, common_1.Get)(':queueName/last'),
    __param(0, (0, common_1.Param)('queueName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "getLastMessage", null);
__decorate([
    (0, common_1.Get)(':queueName/first'),
    __param(0, (0, common_1.Param)('queueName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "getFirstMessage", null);
__decorate([
    (0, common_1.Get)(':queueName/all'),
    __param(0, (0, common_1.Param)('queueName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "getAllMessages", null);
__decorate([
    (0, common_1.Delete)(':queueName'),
    __param(0, (0, common_1.Param)('queueName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "deleteQueue", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QueueController.prototype, "getAllQueues", null);
exports.QueueController = QueueController = __decorate([
    (0, common_1.Controller)('queue'),
    __metadata("design:paramtypes", [queue_service_1.QueueService])
], QueueController);
//# sourceMappingURL=queue.controller.js.map