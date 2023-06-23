import { create } from 'zustand';
import axios from '../axios';

export const useAuthStore = create((set, get) => ({
  user: null,
  isLogged: () => {
    // Check if the user is logged in
    return get().user !== null
  },
  fetchMe: async () => {
    // Fetch the current user (owning the currently defined cookie), put it in the store (in 'user'), and return it
    const response = await axios.get('/auth/me');
    set({ user: response.data });
  },
  login: async ({ email, password }) => {
    // Login a user, put it in the store (in 'user'), and return it
    const response = await axios.post('/auth/login', {
      email,
      password
    });
    set({ user: response.data });
  },
  logout: async () => {
    // Logout the user, remove it from the store (remove it from 'user')
    await axios.post('/auth/logout');
    set({ user: null });
  },
}));
