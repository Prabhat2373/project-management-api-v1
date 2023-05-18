import { UploadedFile } from "express-fileupload";
import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler";
import sendToken from "../utils/jwtToken";
import { User } from "../models/user.model";
import { Api } from "../constants/AppConstant";

// Abstract factory for file upload
interface IFileUploader {
  uploadFile(file: UploadedFile): Promise<any>;
}

// Factory for cloudinary file uploader
export class CloudinaryFileUploader implements IFileUploader {
  async uploadFile(file: UploadedFile): Promise<any> {
    return await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
  }
}

// Factory for local file uploader
class LocalFileUploader implements IFileUploader {
  async uploadFile(file: UploadedFile): Promise<any> {
    // Perform local file upload
    return {};
  }
}

// Abstract factory for creating file uploaders
interface IFileUploaderFactory {
  createFileUploader(): IFileUploader;
}

// Cloudinary file uploader factory
export class CloudinaryFileUploaderFactory implements IFileUploaderFactory {
  createFileUploader(): IFileUploader {
    return new CloudinaryFileUploader();
  }
}

// Local file uploader factory
export class LocalFileUploaderFactory implements IFileUploaderFactory {
  createFileUploader(): IFileUploader {
    return new LocalFileUploader();
  }
}

// Register controller
export const register = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("register route");
    console.log("BODY", req.body);
    const image: UploadedFile | any = req.files?.avatar;
    const fileUploaderFactory: IFileUploaderFactory =
      new CloudinaryFileUploaderFactory();
    const fileUploader: IFileUploader =
      fileUploaderFactory.createFileUploader();
    const myCloud = await fileUploader.uploadFile(image);
    const user = await User.create({
      ...req.body,
      avatar: myCloud.secure_url,
    });

    sendToken(user, Api.CREATED, res);
  }
);

// Login controller
export const login = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    console.log("login route");
    // checking if user has given password and email both

    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, Api.SUCCESS, res);
  }
);
