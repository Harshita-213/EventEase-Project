import React, { useState } from 'react';
import { EventAPI } from '../api';

export default function CreateEvent(){
  const [form, setForm] = useState({
    title: '', description: '', category: 'General',
    date: '', location: '', coverImage: '', tickets: { type: 'free', capacity: 100 }
  });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, date: new Date(form.date) };
      await EventAPI.create(payload);
      alert('Event created! Go to Discover to see it.');
      setForm({ title:'', description:'', category:'General', date:'', location:'', coverImage:'', tickets:{ type:'free', capacity:100 } });
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to create');
    } finally { setLoading(false); }
  };

  return (
    <div className="container">
      <h2>Create Event</h2>
      <form className="card" onSubmit={submit}>
        <label>Title</label>
        <input className="input" value={form.title} onChange={e=>set('title', e.target.value)} required />
        <label>Description</label>
        <textarea className="textarea" rows="5" value={form.description} onChange={e=>set('description', e.target.value)} required />
        <label>Category</label>
        <select className="select" value={form.category} onChange={e=>set('category', e.target.value)}>
          <option>General</option><option>Tech</option><option>Education</option><option>Arts</option><option>Sports</option>
        </select>
        <label>Date & Time</label>
        <input className="input" type="datetime-local" value={form.date} onChange={e=>set('date', e.target.value)} required />
        <label>Location</label>
        <input className="input" value={form.location} onChange={e=>set('location', e.target.value)} required />
        <label>Ticket Type</label>
        <select className="select" value={form.tickets.type} onChange={e=>set('tickets', { ...form.tickets, type: e.target.value })}>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
        <label>Capacity</label>
        <input className="input" type="number" min="1" value={form.tickets.capacity}
               onChange={e=>set('tickets', { ...form.tickets, capacity: Number(e.target.value) })} />
        <button className="button" type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create Event'}</button>
      </form>
    </div>
  );
}
