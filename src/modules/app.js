import { writable } from 'svelte/store';
// import API from './api';

// const api = new API('http://localhost:4000');
export const adminLoggedIn = writable(false);
export const cart = writable([]);

// export default api;
