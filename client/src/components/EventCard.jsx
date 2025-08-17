import { Link } from 'react-router-dom';

export default function EventCard({ e }){
  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3 style={{margin:0}}>{e.title}</h3>
        <span className="badge">{new Date(e.date).toLocaleString()}</span>
      </div>
      <p style={{opacity:.9}}>{e.description?.slice(0,120)}{e.description && e.description.length>120 ? '…' : ''}</p>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span className="badge">{e.category || 'General'}</span>
        <Link to={`/events/${e._id}`} className="button">View</Link>
      </div>
    </div>
  );
}
