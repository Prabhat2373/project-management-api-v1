"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatus = exports.ProjectStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["EMPLOYEE"] = "employee";
    UserRole["TEAM_LEAD"] = "team_lead";
    UserRole["PROJECT_MANAGER"] = "project_manager";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["NOT_STARTED"] = "not_started";
    ProjectStatus["IN_PROGRESS"] = "in_progress";
    ProjectStatus["COMPLETED"] = "completed";
})(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["NOT_STARTED"] = "not_started";
    TaskStatus["IN_PROGRESS"] = "in_progress";
    TaskStatus["COMPLETED"] = "completed";
})(TaskStatus = exports.TaskStatus || (exports.TaskStatus = {}));
