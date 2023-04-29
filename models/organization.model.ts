import mongoose from 'mongoose';

export interface IOrganization extends mongoose.Document {
  name: string;
  email: string;
  address: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const organizationSchema = new mongoose.Schema<IOrganization>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

const Organization = mongoose.model<IOrganization>(
  'Organization',
  organizationSchema
);

export default Organization;
