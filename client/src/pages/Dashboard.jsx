import React, { useEffect, useState } from 'react';
import { RSVPAPI } from '../api';

export default function Dashboard(){
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await RSVPAPI.mine();
        setList(data);
      } catch (e) { console.error(e); }
    })();
  }, []);

  return (
    <div className="container">
      <h2>My RSVPs</h2>
      <div className="grid">
        {list.map(item => (
          <div className="card" key={item._id}>
            <h3>{item.eventId?.title}</h3>
            <p className="badge">{new Date(item.eventId?.date).toLocaleString()}</p>
            <p>Ticket: <b>{item.ticketCode}</b></p>
          </div>
        ))}
        {list.length===0 && <p>No RSVPs yet.</p>}
      </div>
    </div>
  );
}
