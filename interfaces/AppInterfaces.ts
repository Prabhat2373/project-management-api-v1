import { UploadedFile } from 'express-fileupload';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: UserRole;
  createdAt: Date;
  
  updatedAt: Date;
}

export interface IEmployee extends IUser {
  designation: string;
}

export interface ITeamLead extends IEmployee {
  team: string;
}

export interface IProjectManager extends IEmployee {
  projects: string[];
}

export interface IOrganization {
  _id: string;
  name: string;
  address: string;
  description?: string;
  employees: IEmployee[];
  teams: ITeam[];
  projects: IProject[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITeam {
  _id: string;
  name: string;
  description?: string;
  members: string[]; // employee IDs
  manager: string; // team lead ID
  projects: string[]; // project IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface IProject {
  _id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  status: ProjectStatus;
  teamLead: string; // team lead ID
  projectManager: string; // project manager ID
  team: string; // team ID
  tasks: ITask[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITask {
  _id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  status: TaskStatus;
  priority: number;
  project: string; // project ID
  assignedTo: string; // employee ID
  comments: string[]; // comment IDs
  attachments: string[]; // attachment IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  _id: string;
  content: string;
  author: string; // employee ID
  task: string; // task ID
  createdAt: Date;
  updatedAt: Date;
}

export interface IAttachment {
  _id: string;
  filename: string;
  url: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFileUploader {
  uploadFile(file: UploadedFile): Promise<IAttachment>;
}

export interface IFileUploaderFactory {
  createFileUploader(): IFileUploader;
}

export interface IUploadResult {
  secure_url: string;
}

export enum UserRole {
  EMPLOYEE = 'employee',
  TEAM_LEAD = 'team_lead',
  PROJECT_MANAGER = 'project_manager',
}

export enum ProjectStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export enum TaskStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}
