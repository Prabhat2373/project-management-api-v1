import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { type: String },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export const Project = mongoose.model('Project', projectSchema);
