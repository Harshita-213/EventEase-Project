import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ticketCode: { type: String, required: true, unique: true }
}, { timestamps: true });

rsvpSchema.index({ eventId: 1, userId: 1 }, { unique: true });

export default mongoose.model('RSVP', rsvpSchema);
