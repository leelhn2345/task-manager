import mongoose, { Schema, Document } from "mongoose";

const TaskSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

interface ITask extends Document {
  [key: string]: any;
  description: string;
  completed?: boolean;
  owner: Schema.Types.ObjectId;
}

const Task = mongoose.model<ITask>("Task", TaskSchema);

export { Task as default };
export type { ITask };
