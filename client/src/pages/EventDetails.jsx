import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventAPI, RSVPAPI } from '../api';
import { me } from '../auth';
import TicketQR from '../components/TicketQR';

export default function EventDetails(){
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvp, setRsvp] = useState(null);
  const user = me();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await EventAPI.one(id);
        setEvent(data);
      } catch (e) { console.error(e); }
    })();
  }, [id]);

  const handleRSVP = async () => {
    try {
      const { data } = await RSVPAPI.rsvp(id);
      setRsvp(data);
    } catch (e) {
      alert(e?.response?.data?.message || 'RSVP failed');
    }
  };

  if (!event) return <div className="container"><p>Loading…</p></div>;

  return (
    <div className="container">
      <div className="card">
        <h2>{event.title}</h2>
        <p className="badge">{new Date(event.date).toLocaleString()} • {event.location}</p>
        <p>{event.description}</p>
        <p><b>Category:</b> {event.category}</p>
        <p><b>Organizer:</b> {event.createdBy?.name}</p>
        {user ? (
          <button className="button" onClick={handleRSVP} disabled={!!rsvp}>
            {rsvp ? 'RSVP’d' : 'RSVP'}
          </button>
        ) : (
          <p>Login to RSVP.</p>
        )}
      </div>
      {rsvp && <TicketQR code={rsvp.ticketCode} />}
    </div>
  );
}
