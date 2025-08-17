import axios from 'axios';

const API = axios.create({ baseURL: 'https://eventease-project-s94w.onrender.com' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const AuthAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
};

export const EventAPI = {
  list: (params) => API.get('/events', { params }),
  one: (id) => API.get(`/events/${id}`),
  create: (data) => API.post('/events', data),
  update: (id, data) => API.put(`/events/${id}`, data),
  remove: (id) => API.delete(`/events/${id}`),
};

export const RSVPAPI = {
  rsvp: (eventId) => API.post(`/rsvp/${eventId}`),
  mine: () => API.get('/rsvp/me/list'),
};
