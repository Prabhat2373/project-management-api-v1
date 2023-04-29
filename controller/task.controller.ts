import { Created } from './../constants/ApiResponses';
import { Request, Response, NextFunction } from 'express';
import { Attachment } from '../models/attatchment.model';

import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import { Api } from '../constants/AppConstant';
import { UploadedFile } from 'express-fileupload';
import {
  IFileUploader,
  IFileUploaderFactory,
} from '../interfaces/AppInterfaces';
import Task from '../models/task.model';
import { CloudinaryFileUploaderFactory } from './user.controller';

export const AssignTask = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
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
    console.log('files', file);

    const fileUploaderFactory: IFileUploaderFactory =
      new CloudinaryFileUploaderFactory();
    const fileUploader: IFileUploader =
      fileUploaderFactory.createFileUploader();

    const attachment = await fileUploader.uploadFile(file);

    console.log('attatchment', attachment.url);
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
      message: Created('Task'),
      data: task,
    });
  }
);
