import { Created } from './../constants/ApiResponses';
import { NextFunction, Request, Response } from 'express';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import Project from '../models/product.model';
import { Api } from '../constants/AppConstant';

export const createProject = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const newProject = await Project.create({
      description: req.body.description,
      endDate: req.body.endDate,
      name: req.body.name,
      users: req.body.users,
      startDate: req.body.startDate,
      status: req.body.status,
      organization: req.body.organization,
      teamLead: req.body.teamLead,
      projectManager: req.body.projectManager,
      employees: req.body.employees,
    });

    res.status(Api.CREATED).json({
      status: Api.CREATED,
      message: Created('Project'),
      data: newProject,
    });
  }
);
