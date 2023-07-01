import { create } from 'zustand';
import axios from '../axios';

export const useUserStore = create((set, get) => ({
  users: [],
  user: null,
  create: async (users) => {
    // Create a new user, put it in the store (in 'user' and in the 'user' array),
    // and return the created user
    const response = await axios.post('/users', users);
    set({
      user: response.data,
      users: [...get().users, response.data],
    });
    return response.data;
  },
  fetchOne: async (id) => {
    // Fetch one user by id, put it in the store (in 'user') and return it
    const response = await axios.get(`/users/${id}`);
    set({ user: response.data });
    return response.data;
  },
  fetchAll: async () => {
    // Fetch all users, put them in the store (in 'users') and return them
    const response = await axios.get('/users');
    set({ users: response.data });
    return response.data;
  },
  update: async (id, user) => {
    // Update a user, update it in the store (put it in 'user' and update it in the 'users'
    // array), and return the updated user
    const response = await axios.patch(`/users/${id}`, user);

    set({
      user: response.data,
      users: get().users.map((t) => {
        if (t.id === id) return response.data;
        return t;
      }),
    });
    return response.data;
  },
  delete: async (id) => {
    // Delete a user, remove it from the store (remove it from the 'users' array)
    await axios.delete(`/users/${id}`);
    set({
      user: null,
      users: get().users.filter((t) => t.id !== id),
    });
  },
  addRoles: async (id, roleIds) => {
    // Add roles to a user, update it in the store (put it in 'user' and update it in the 'users'
    // array), and return the updated user
    const response = await axios.post(`/users/${id}/roles`, { roles: roleIds });
    set({
      user: response.data,
      users: get().users.map((t) => {
        if (t.id === id) return response.data;
        return t;
      }),
    });
    return response.data;
  },
  removeRoles: async (id, roleIds) => {
    // Remove roles from a user, update it in the store (put it in 'user' and update it in the 'users'
    // array), and return the updated user
    const response = await axios.delete(`/users/${id}/roles`, {
      data: { roles: roleIds },
    });
    set({
      user: response.data,
      users: get().users.map((t) => {
        if (t.id === id) return response.data;
        return t;
      }),
    });
    return response.data;
  },
}));
