import { ITest } from 'contracts/entities/ITest';
import { model, Schema } from 'mongoose';
import { schemaOptions } from '../SchemaOptions';

export const TestSchema = new Schema<ITest>(
  {
    value: {
      type: Number,
      default: 0,
    },
    word: {
      type: String,
      required: true,
    },
    isItTrue: {
      type: Boolean,
    },
  },
  schemaOptions,
);

export const TestModel = model<ITest>('Test', TestSchema);
