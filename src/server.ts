import express, { Application, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import * as cloudinary from 'cloudinary';

import Connect from '../config/connect';
import app from './app';

const PORT = 8001 || process.env.PORT;

// Handling Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const db = 'mongodb://127.0.0.1:27017/PMT';
Connect(db);

const server1 = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server1.close(() => {
    process.exit(1); // for exiting process or closing server
  });
});

