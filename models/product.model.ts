import mongoose from 'mongoose';
import { IOrganization } from './organization.model';
import { IUser } from './user.model';

export enum ProjectStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

export interface IProject extends mongoose.Document {
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  status: ProjectStatus;
  organization: IOrganization['_id'];
  teamLead: IUser['_id'];
  manager: IUser['_id'];
  employees: Array<IUser['_id']>;
  createdAt?: Date;
  updatedAt?: Date;
}

const projectSchema = new mongoose.Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true, default: Date.now() },
    endDate: { type: Date },
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.NOT_STARTED,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    teamLead: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Project = mongoose.model<IProject>('Project', projectSchema);

export default Project;
