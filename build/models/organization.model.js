"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var organizationSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    phone: { type: String },
}, { timestamps: true });
var Organization = mongoose_1.default.model('Organization', organizationSchema);
exports.default = Organization;
