import React, { useEffect, useState } from 'react';
import { EventAPI } from '../api';
import EventCard from '../components/EventCard';

export default function EventList(){
  const [events, setEvents] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    setLoading(true);
    try {
      const { data } = await EventAPI.list({ q, category });
      setEvents(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchList(); }, []);

  return (
    <div className="container">
      <h2>All Events</h2>
      <div className="card" style={{display:'grid', gap:12}}>
        <input className="input" placeholder="Search by title…" value={q} onChange={e=>setQ(e.target.value)} />
        <select className="select" value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="">All categories</option>
          <option>Tech</option>
          <option>Education</option>
          <option>Arts</option>
          <option>Sports</option>
          <option>General</option>
        </select>
        <button className="button" onClick={fetchList}>Search</button>
      </div>
      <div className="grid grid-3" style={{marginTop:16}}>
        {loading ? <p>Loading…</p> : events.map(e => <EventCard key={e._id} e={e} />)}
      </div>
    </div>
  );
}
