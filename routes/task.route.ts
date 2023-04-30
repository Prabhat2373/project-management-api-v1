import { authorizeRoles, isAuthenticatedUser } from './../middlewares/auth';
import { AssignTask } from '../controller/task.controller';
import { createProject } from './../controller/project.controller.';
import express from 'express';

const router = express.Router();

router
  .route('/task/new')
  .post(
    isAuthenticatedUser,
    authorizeRoles('teamLead', 'projectManager'),
    AssignTask
  );

export const taskRouter = router;
