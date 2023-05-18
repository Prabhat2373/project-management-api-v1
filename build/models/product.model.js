"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectStatus = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["NOT_STARTED"] = "Not Started";
    ProjectStatus["IN_PROGRESS"] = "In Progress";
    ProjectStatus["COMPLETED"] = "Completed";
})(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
var projectSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true, default: Date.now() },
    endDate: { type: Date },
    status: {
        type: String,
        enum: Object.values(ProjectStatus),
        default: ProjectStatus.NOT_STARTED,
    },
    organization: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    teamLead: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    manager: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    employees: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
var Project = mongoose_1.default.model('Project', projectSchema);
exports.default = Project;
