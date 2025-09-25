import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title.'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a short description.'],
    maxlength: [200, 'Description cannot be more than 200 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content.'],
  },
  tags: {
    type: [String],
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);