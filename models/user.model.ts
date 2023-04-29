import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

enum UserRole {
  Employee = 'employee',
  TeamLead = 'teamLead',
  ProjectManager = 'projectManager',
}

export interface IUser extends Document {
  [x: string]: any;
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string;
  role?: UserRole;
  teamLead?: mongoose.Types.ObjectId;
  projectManager?: mongoose.Types.ObjectId;
  organization: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  getJWTToken: () => string;
  comparePassword: (password: string) => Promise<boolean>;
  getResetPasswordToken: () => string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
  findByEmail(email: string): Promise<IUserDocument | null>;
}
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
    },
    projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    teamLead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Generate JWT token
UserSchema.methods.getJWTToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  });
};

// Compare password
UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Generate password reset token
UserSchema.methods.getResetPasswordToken = function (): string {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash and add resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);

  return resetToken;
};

export const User = mongoose.model<IUser>('User', UserSchema);
