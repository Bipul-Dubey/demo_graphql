import { Schema, model, Document, Types } from "mongoose";

/** What a post document looks like in TypeScript */
export interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId; // User reference
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

/* Make sure latest posts appear first */
postSchema.index({ createdAt: -1 });

export const Post = model<IPost>("Post", postSchema);
