"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attachment = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var attachmentSchema = new mongoose_1.default.Schema({
    fileName: { type: String, required: true },
    contentType: { type: String, required: true },
    content: { type: Buffer, required: true },
    task: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Task' },
});
exports.Attachment = mongoose_1.default.model('Attatchment', attachmentSchema);
