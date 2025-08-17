import React, { useEffect, useState } from 'react';
import { EventAPI } from '../api';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';

export default function Home(){
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await EventAPI.list({});
        setEvents(data.slice(0,6));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="container">
      <h1>Discover events near you</h1>
      <p>Workshops, meetups, and more. Create or RSVP in seconds.</p>
      <hr />
      {loading ? <p>Loading…</p> : (
        <div className="grid grid-3">
          {events.map(e => <EventCard key={e._id} e={e} />)}
        </div>
      )}
      <div style={{marginTop:16}}>
        <Link to="/events" className="button">Browse all events</Link>
      </div>
    </div>
  );
}
