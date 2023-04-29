import { Document, ObjectId, Types } from 'mongoose';
import { Response } from 'express';
import { IUser } from '../models/user.model';

// import { IUser } from '../models/User.model';

// type SendTokenOptions = {
//   //   OPT: any;
//   user:
//     | (Document<unknown, {}, IUser> &
//         Omit<
//           IUser & {
//             _id: Types.ObjectId;
//           },
//           never
//         >)
//     | null;
//   statusCode: number;
//   res: Response;
//   options?: SendTokenOptions;
// };

const sendToken = (
  user: Document<unknown, {}, IUser> & Omit<IUser & { _id: ObjectId }, never>,
  statusCode: number,
  res: Response
  // options?: SendTokenOptions
): void => {
  let token;
  if (user) {
    token = user.getJWTToken();
  }

  // options for cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    SameSite: 'none',
  };

  res.status(statusCode).cookie('token', token, cookieOptions).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
