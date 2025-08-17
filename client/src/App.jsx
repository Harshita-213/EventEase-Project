import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

export default function App(){
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:5000', { transports: ['websocket'] });
    socket.on('event:created', (p) => setToast(`New event: ${p.title}`));
    socket.on('event:updated', (p) => setToast(`Updated: ${p.title}`));
    socket.on('event:deleted', () => setToast('An event was deleted'));
    socket.on('rsvp:created', () => setToast('New RSVP'));
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
