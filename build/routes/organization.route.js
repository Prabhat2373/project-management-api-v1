"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationRouter = void 0;
var organization_controller_1 = require("./../controller/organization.controller");
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.route('/organization/new').post(organization_controller_1.registerOrganization);
exports.organizationRouter = router;
