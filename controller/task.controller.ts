import { Created, Founded } from "./../constants/ApiResponses";
import { Request, Response, NextFunction } from "express";
import { Attachment } from "../models/attatchment.model";

import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { Api } from "../constants/AppConstant";
import { UploadedFile } from "express-fileupload";
import {
  IFileUploader,
  IFileUploaderFactory,
} from "../interfaces/AppInterfaces";
import Task from "../models/task.model";
import { CloudinaryFileUploaderFactory } from "./user.controller";
import { IUser } from "../models/user.model";

interface ReqType extends Request {
  user: IUser;
  id: string;
}

export const AssignTask = catchAsyncErrors(
  async (req: Request | any, res: Response, next: NextFunction) => {
    const {
      name,
      description,
      startDate,
      endDate,
      status,
      priority,
      project,
      assignedTo,
      comments,
      assigner,
    } = req.body;

    // extract file data from request
    const file = req.files.attachments; // assuming multer middleware is used for file uploads
    console.log("files", file);

    const fileUploaderFactory: IFileUploaderFactory =
      new CloudinaryFileUploaderFactory();
    const fileUploader: IFileUploader =
      fileUploaderFactory.createFileUploader();

    const attachment = await fileUploader.uploadFile(file);

    console.log("attatchment", attachment.url);
    // create new task document with attachment reference
    const task = new Task({
      name,
      description,
      startDate,
      endDate,
      status,
      priority,
      project,
      assignedTo,
      comments,
      attachments: attachment.url, // add attachment ID to attachments array
    });

    // save task document to database
    await task.save();

    res.status(Api.CREATED).json({
      status: Api.CREATED,
      message: Created("Task"),
      data: task,
    });
  }
);

export const getAllTasks = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const Tasks = await Task.find({});
    if(!Task) return {
      status:Api.FAIL,
      message:
    };


    res.status(Api.SUCCESS).json({
      status: Api.SUCCESS,
      message: Founded("Tasks"),
      data: Tasks,
    });
  }
);

export const getTaskByUser = catchAsyncErrors(
  async (req: ReqType, res: Response) => {
    const Tasks = await Task.find({
      assignedTo: req.params.id,
    });

    console.log("tasks", Tasks);

    res.status(Api.SUCCESS).json({
      status: Api.SUCCESS,
      message: Founded("Tasks"),
      data: Tasks,
    });
  }
);
