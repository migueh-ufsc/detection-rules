import { SchemaOptions } from 'mongoose';

export const schemaOptions: SchemaOptions = {
  versionKey: false,
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
};
