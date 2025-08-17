import { Link, useNavigate } from 'react-router-dom';
import { me, logout } from '../auth';

export default function NavBar(){
  const user = me();
  const nav = useNavigate();
  return (
    <header>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Link to="/" style={{fontWeight:700, fontSize:20}}>EventEase</Link>
        <nav style={{display:'flex', gap:12, alignItems:'center'}}>
          <Link to="/events">Discover</Link>
          {user && <Link to="/create">Create</Link>}
          {user && <Link to="/dashboard">Dashboard</Link>}
          {user ? (
            <>
              <span className="badge">{user.name}</span>
              <button className="button" onClick={()=>{ logout(); nav('/login'); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
