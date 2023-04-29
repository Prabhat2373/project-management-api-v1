import mongoose, { Document, Model, Schema } from 'mongoose';
import { ProjectStatus } from './product.model';

export interface ITask extends Document {
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  status?: ProjectStatus;
  priority?: number;
  project: mongoose.Schema.Types.ObjectId;
  assignedTo: mongoose.Schema.Types.ObjectId;
  comments?: mongoose.Schema.Types.ObjectId[];
  attachments?: mongoose.Schema.Types.ObjectId[];
  assigner?: mongoose.Schema.Types.ObjectId;
}

const taskSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { type: String },
  priority: { type: Number },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: { type: String },
  attachments: [{ type: String }],
  assigner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Task: Model<ITask> = mongoose.model<ITask>('Task', taskSchema);

export default Task;
