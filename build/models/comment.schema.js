"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var commentSchema = new mongoose_1.default.Schema({
    text: { type: String, required: true },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    task: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Task' },
    createdAt: { type: Date, default: Date.now },
});
exports.Comment = mongoose_1.default.model('Comment', commentSchema);
