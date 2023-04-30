import jwt from 'jsonwebtoken';
import catchAsyncErrors from './catchAsyncErrors';
import ErrorHandler from '../utils/errorHandler';
import { NextFunction, Request, Response } from 'express';
import { Document, Types } from 'mongoose';
import { IUser, User } from '../models/user.model';

interface RequestType extends Request {
  cookies: {
    token: string;
  };
  user: (Document & Omit<IUser & { _id: Types.ObjectId }, '_id'>) | null;
}

export const isAuthenticatedUser = catchAsyncErrors(
  async (req: RequestType, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    console.log('HAS TOKEN', token);

    if (!token) {
      console.log('NOT TOKEN');
      return next(
        new ErrorHandler('Please Login to access this resource', 401)
      );
    }
    console.log('-------');

    const decodedData: { id: string } | null = jwt.verify(
      token,
      process.env.JWT_SECRET ?? ''
    ) as { id: string } | null;

    req.user = (await User.findById(decodedData?.id)) as RequestType['user'];
    // console.log('user', req.user._id)

    next();
  }
);

export const authorizeRoles = (...roles: any[]) => {
  return (req: RequestType, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
