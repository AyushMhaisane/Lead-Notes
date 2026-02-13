import mongoose, { Schema, Document } from 'mongoose';


export interface INote extends Document {
  userId: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: Schema = new Schema(
  {
    userId: { 
      type: String, 
      required: true, 
      index: true 
    },
    title: { 
      type: String, 
      required: [true, 'Please add a title'], 
      trim: true 
    },
    content: { 
      type: String, 
      required: [true, 'Please add some content'] 
    },
    imageUrl: { 
      type: String 
    },
  },
  { 
    timestamps: true 
  }
);


export default mongoose.model<INote>('Note', NoteSchema);