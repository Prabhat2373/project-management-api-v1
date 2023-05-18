"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskByUser = exports.getAllTasks = exports.AssignTask = void 0;
var ApiResponses_1 = require("./../constants/ApiResponses");
var catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
var AppConstant_1 = require("../constants/AppConstant");
var task_model_1 = __importDefault(require("../models/task.model"));
var user_controller_1 = require("./user.controller");
exports.AssignTask = (0, catchAsyncErrors_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, description, startDate, endDate, status, priority, project, assignedTo, comments, assigner, file, fileUploaderFactory, fileUploader, attachment, task;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, description = _a.description, startDate = _a.startDate, endDate = _a.endDate, status = _a.status, priority = _a.priority, project = _a.project, assignedTo = _a.assignedTo, comments = _a.comments, assigner = _a.assigner;
                file = req.files.attachments;
                console.log("files", file);
                fileUploaderFactory = new user_controller_1.CloudinaryFileUploaderFactory();
                fileUploader = fileUploaderFactory.createFileUploader();
                return [4 /*yield*/, fileUploader.uploadFile(file)];
            case 1:
                attachment = _b.sent();
                console.log("attatchment", attachment.url);
                task = new task_model_1.default({
                    name: name,
                    description: description,
                    startDate: startDate,
                    endDate: endDate,
                    status: status,
                    priority: priority,
                    project: project,
                    assignedTo: assignedTo,
                    comments: comments,
                    attachments: attachment.url, // add attachment ID to attachments array
                });
                // save task document to database
                return [4 /*yield*/, task.save()];
            case 2:
                // save task document to database
                _b.sent();
                res.status(AppConstant_1.Api.CREATED).json({
                    status: AppConstant_1.Api.CREATED,
                    message: (0, ApiResponses_1.Created)("Task"),
                    data: task,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getAllTasks = (0, catchAsyncErrors_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Tasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, task_model_1.default.find({})];
            case 1:
                Tasks = _a.sent();
                res.status(AppConstant_1.Api.SUCCESS).json({
                    status: AppConstant_1.Api.SUCCESS,
                    message: (0, ApiResponses_1.Founded)("Tasks"),
                    data: Tasks,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.getTaskByUser = (0, catchAsyncErrors_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Tasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, task_model_1.default.find({
                    assignedTo: req.params.id,
                })];
            case 1:
                Tasks = _a.sent();
                console.log("tasks", Tasks);
                res.status(AppConstant_1.Api.SUCCESS).json({
                    status: AppConstant_1.Api.SUCCESS,
                    message: (0, ApiResponses_1.Founded)("Tasks"),
                    data: Tasks,
                });
                return [2 /*return*/];
        }
    });
}); });
