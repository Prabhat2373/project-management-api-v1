import { taskRouter } from './../routes/task.route';
import { organizationRouter } from './../routes/organization.route';
import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import http from 'http';
import { ErrorMiddleware } from '../middlewares/error';
import cookieParser from 'cookie-parser';
import { userRouter } from '../routes/user.routes';
import { projectRouter } from '../routes/project.route';
const app: Application = express();

// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: './.env' });
}

app.use(
  cors({
    origin: '*',
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use('/api/v1', userRouter);
app.use('/api/v1', organizationRouter);
app.use('/api/v1', projectRouter);
app.use('/api/v1', taskRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'connecttion success!',
  });
});
// Setup socket connection

app.get('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'NO ROUTE FOUND!',
  });
});

app.use(ErrorMiddleware);

export default app;
