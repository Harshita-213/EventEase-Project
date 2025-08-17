import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import RSVP from '../models/RSVP.js';
import Event from '../models/Event.js';
import crypto from 'crypto';

const router = Router();

// RSVP to an event (one per user)
router.post('/:eventId', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const ticketCode = `EVT-${event._id.toString().slice(-6)}-${crypto.randomBytes(3).toString('hex')}`.toUpperCase();

    const rsvp = await RSVP.create({ eventId: event._id, userId: req.user.id, ticketCode });
    req.io.emit('rsvp:created', { eventId: event._id, userId: req.user.id });
    res.status(201).json(rsvp);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'Already RSVP’d' });
    res.status(500).json({ message: err.message });
  }
});

// Get my RSVPs
router.get('/me/list', auth, async (req, res) => {
  try {
    const list = await RSVP.find({ userId: req.user.id }).populate('eventId');
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
