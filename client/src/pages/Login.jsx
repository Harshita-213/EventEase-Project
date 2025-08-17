import React, { useState } from 'react';
import { AuthAPI } from '../api';
import { saveAuth } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await AuthAPI.login({ email, password });
      saveAuth(data);
      nav('/');
    } catch (e) {
      alert(e?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form className="card" onSubmit={submit}>
        <label>Email</label>
        <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label>Password</label>
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
}
