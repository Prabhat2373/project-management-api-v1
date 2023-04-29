import { AssignTask } from '../controller/task.controller';
import { createProject } from './../controller/project.controller.';
import express from 'express';

const router = express.Router();

router.route('/task/new').post(AssignTask);

export const taskRouter = router;
