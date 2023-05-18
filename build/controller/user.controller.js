"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.login = exports.register = exports.LocalFileUploaderFactory = exports.CloudinaryFileUploaderFactory = exports.CloudinaryFileUploader = void 0;
var catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
var cloudinary_1 = __importDefault(require("cloudinary"));
var errorHandler_1 = __importDefault(require("../utils/errorHandler"));
var jwtToken_1 = __importDefault(require("../utils/jwtToken"));
var user_model_1 = require("../models/user.model");
var AppConstant_1 = require("../constants/AppConstant");
// Factory for cloudinary file uploader
var CloudinaryFileUploader = /** @class */ (function () {
    function CloudinaryFileUploader() {
    }
    CloudinaryFileUploader.prototype.uploadFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cloudinary_1.default.v2.uploader.upload(file.tempFilePath, {
                            folder: "avatars",
                            width: 150,
                            crop: "scale",
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return CloudinaryFileUploader;
}());
exports.CloudinaryFileUploader = CloudinaryFileUploader;
// Factory for local file uploader
var LocalFileUploader = /** @class */ (function () {
    function LocalFileUploader() {
    }
    LocalFileUploader.prototype.uploadFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Perform local file upload
                return [2 /*return*/, {}];
            });
        });
    };
    return LocalFileUploader;
}());
// Cloudinary file uploader factory
var CloudinaryFileUploaderFactory = /** @class */ (function () {
    function CloudinaryFileUploaderFactory() {
    }
    CloudinaryFileUploaderFactory.prototype.createFileUploader = function () {
        return new CloudinaryFileUploader();
    };
    return CloudinaryFileUploaderFactory;
}());
exports.CloudinaryFileUploaderFactory = CloudinaryFileUploaderFactory;
// Local file uploader factory
var LocalFileUploaderFactory = /** @class */ (function () {
    function LocalFileUploaderFactory() {
    }
    LocalFileUploaderFactory.prototype.createFileUploader = function () {
        return new LocalFileUploader();
    };
    return LocalFileUploaderFactory;
}());
exports.LocalFileUploaderFactory = LocalFileUploaderFactory;
// Register controller
exports.register = (0, catchAsyncErrors_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var image, fileUploaderFactory, fileUploader, myCloud, user;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("register route");
                console.log("BODY", req.body);
                image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.avatar;
                fileUploaderFactory = new CloudinaryFileUploaderFactory();
                fileUploader = fileUploaderFactory.createFileUploader();
                return [4 /*yield*/, fileUploader.uploadFile(image)];
            case 1:
                myCloud = _b.sent();
                return [4 /*yield*/, user_model_1.User.create(__assign(__assign({}, req.body), { avatar: myCloud.secure_url }))];
            case 2:
                user = _b.sent();
                (0, jwtToken_1.default)(user, AppConstant_1.Api.CREATED, res);
                return [2 /*return*/];
        }
    });
}); });
// Login controller
exports.login = (0, catchAsyncErrors_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isPasswordMatched;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                console.log("login route");
                // checking if user has given password and email both
                if (!email || !password) {
                    return [2 /*return*/, next(new errorHandler_1.default("Please Enter Email & Password", 400))];
                }
                return [4 /*yield*/, user_model_1.User.findOne({ email: email }).select("+password")];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, next(new errorHandler_1.default("Invalid email or password", 401))];
                }
                return [4 /*yield*/, user.comparePassword(password)];
            case 2:
                isPasswordMatched = _b.sent();
                if (!isPasswordMatched) {
                    return [2 /*return*/, next(new errorHandler_1.default("Invalid email or password", 401))];
                }
                (0, jwtToken_1.default)(user, AppConstant_1.Api.SUCCESS, res);
                return [2 /*return*/];
        }
    });
}); });
