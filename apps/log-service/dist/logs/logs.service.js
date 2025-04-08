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
exports.LogsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const log_schema_1 = require("../schemas/log.schema");
let LogsService = class LogsService {
    logModel;
    constructor(logModel) {
        this.logModel = logModel;
    }
    async create(log) {
        const createdLog = new this.logModel({
            ...log,
            timestamp: log.timestamp || new Date(),
        });
        return createdLog.save();
    }
    async findAll(query = {}) {
        const filter = {};
        if (query.from || query.to) {
            filter.timestamp = {};
            if (query.from) {
                filter.timestamp.$gte = new Date(query.from);
            }
            if (query.to) {
                filter.timestamp.$lte = new Date(query.to);
            }
        }
        if (query.service) {
            filter.service = query.service;
        }
        return this.logModel.find(filter).sort({ timestamp: -1 }).exec();
    }
    async update(id, updateData) {
        const updatedLog = await this.logModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .exec();
        if (!updatedLog) {
            throw new common_1.NotFoundException(`Log with ID "${id}" not found`);
        }
        return updatedLog;
    }
};
exports.LogsService = LogsService;
exports.LogsService = LogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(log_schema_1.Log.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LogsService);
//# sourceMappingURL=logs.service.js.map