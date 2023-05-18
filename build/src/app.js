"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var task_route_1 = require("./../routes/task.route");
var organization_route_1 = require("./../routes/organization.route");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var error_1 = require("../middlewares/error");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var user_routes_1 = require("../routes/user.routes");
var project_route_1 = require("../routes/project.route");
var app = (0, express_1.default)();
// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({ path: './.env' });
}
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
}));
app.use('/api/v1', user_routes_1.userRouter);
app.use('/api/v1', organization_route_1.organizationRouter);
app.use('/api/v1', project_route_1.projectRouter);
app.use('/api/v1', task_route_1.taskRouter);
app.get('/', function (req, res) {
    res.status(200).json({
        status: 'success',
        message: 'connecttion success!',
    });
});
// Setup socket connection
app.get('*', function (req, res) {
    res.status(404).json({
        success: false,
        message: 'NO ROUTE FOUND!',
    });
});
app.use(error_1.ErrorMiddleware);
exports.default = app;
