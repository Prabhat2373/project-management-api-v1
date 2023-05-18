"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var cloudinary = __importStar(require("cloudinary"));
var connect_1 = __importDefault(require("../config/connect"));
var app_1 = __importDefault(require("./app"));
var PORT = 8001 || process.env.PORT;
// Handling Uncaught Exception
process.on('uncaughtException', function (err) {
    console.log("Error: ".concat(err.message));
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
});
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
var db = 'mongodb://127.0.0.1:27017/PMT';
(0, connect_1.default)(db);
var server1 = app_1.default.listen(PORT, function () {
    console.log("http://localhost:".concat(PORT));
});
// Unhandled Promise Rejection
process.on('unhandledRejection', function (err) {
    console.log("Error: ".concat(err.message));
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server1.close(function () {
        process.exit(1); // for exiting process or closing server
    });
});
