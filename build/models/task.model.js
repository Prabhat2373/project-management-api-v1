"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var taskSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    status: { type: String },
    priority: { type: Number },
    project: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Project' },
    assignedTo: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    comments: { type: String },
    attachments: [{ type: String }],
    assigner: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
});
var Task = mongoose_1.default.model('Task', taskSchema);
exports.default = Task;
