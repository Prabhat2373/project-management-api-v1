"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
var auth_1 = require("../middlewares/auth");
var project_controller_1 = require("./../controller/project.controller.");
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.route('/project/new').post(auth_1.isAuthenticatedUser, project_controller_1.createProject);
exports.projectRouter = router;
