import { createProject } from './../controller/project.controller.';
import express from 'express';

const router = express.Router();

router.route('/project/new').post(createProject);

export const projectRouter = router;
