import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  contentType: { type: String, required: true },
  content: { type: Buffer, required: true },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
});

const Attachment = mongoose.model('Attatchment', attachmentSchema);
