"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
var auth_1 = require("./../middlewares/auth");
var task_controller_1 = require("../controller/task.controller");
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router
    .route('/task/new')
    .post(auth_1.isAuthenticatedUser, (0, auth_1.authorizeRoles)('teamLead', 'projectManager'), task_controller_1.AssignTask);
router.get('/tasks', task_controller_1.getAllTasks);
router.get('/tasks/:id', task_controller_1.getTaskByUser);
exports.taskRouter = router;
