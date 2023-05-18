import { isAuthenticatedUser } from '../middlewares/auth';
import { createProject } from './../controller/project.controller.';
import express from 'express';

const router = express.Router();

router.route('/project/new').post(isAuthenticatedUser, createProject);

export const projectRouter = router;
