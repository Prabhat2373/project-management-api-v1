import { Created } from './../constants/ApiResponses';
import { NextFunction, Request, Response } from 'express';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import Organization from '../models/organization.model';
import { Api } from '../constants/AppConstant';

export const registerOrganization = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const newOrganization = await Organization.create(req.body);

    res.status(Api.CREATED).json({
      status: Api.CREATED,
      message: Created('Organization'),
      data: newOrganization,
    });
  }
);
