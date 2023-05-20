import { authorizeRoles, isAuthenticatedUser } from "./../middlewares/auth";
import {
  AssignTask,
  getAllTasks,
  getTaskByUser,
} from "../controller/task.controller";
import { createProject } from "./../controller/project.controller.";
import express from "express";

const router = express.Router();

router
  .route("/task/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("teamLead", "projectManager"),
    AssignTask
  );

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskByUser);

export const taskRouter = router;
