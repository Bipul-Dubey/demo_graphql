import { Schema, model, Document, Types } from "mongoose";

/** What a chat message document looks like in TypeScript */
export interface IMessage extends Document {
  content: string;
  author: Types.ObjectId; // User reference
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10_000,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

/* Latest messages first when querying */
messageSchema.index({ createdAt: -1 });

export const Message = model<IMessage>("Message", messageSchema);
