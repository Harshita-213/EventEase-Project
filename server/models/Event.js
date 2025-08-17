import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  type: { type: String, enum: ['free', 'paid'], default: 'free' },
  capacity: { type: Number, default: 100 }
}, { _id: false });

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: 'General' },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  coverImage: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tickets: { type: ticketSchema, default: () => ({}) }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
