import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from '../axios';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLogged: () => {
        // Check if the user is logged in
        return get().user !== null;
      },
      fetchMe: async () => {
        // Fetch the current user (owning the currently defined cookie), put it in the store (in 'user'), and return it
        try {
          const response = await axios.get('/auth/me');
          set({ user: response.data });
        } catch (error) {
          if (error.response.status === 401) {
            set({ user: null });
          } else {
            throw error;
          }
        }
      },
      login: async ({ email, password }) => {
        // Login a user, put it in the store (in 'user'), and return it
        const response = await axios.post('/auth/login', {
          email,
          password,
        });
        set({ user: response.data });
      },
      logout: async () => {
        // Logout the user, remove it from the store (remove it from 'user')
        try {
          await axios.post('/auth/logout');
          set({ user: null });
        } catch (error) {
          if (error.response.status === 401) {
            set({ user: null });
          } else {
            throw error;
          }
        }
      },
    }),
    {
      name: 'user-storage', // Name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage as the storage (same as localStorage but the data is removed when the tab is closed)
    }
  )
);
