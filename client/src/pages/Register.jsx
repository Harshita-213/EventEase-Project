import React, { useState } from 'react';
import { AuthAPI } from '../api';
import { saveAuth } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('attendee');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await AuthAPI.register({ name, email, password, role });
      saveAuth(data);
      nav('/');
    } catch (e) {
      alert(e?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form className="card" onSubmit={submit}>
        <label>Name</label>
        <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
        <label>Email</label>
        <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label>Password</label>
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <label>Role</label>
        <select className="select" value={role} onChange={e=>setRole(e.target.value)}>
          <option value="attendee">Attendee</option>
          <option value="organizer">Organizer</option>
        </select>
        <button className="button" type="submit">Create Account</button>
      </form>
    </div>
  );
}
