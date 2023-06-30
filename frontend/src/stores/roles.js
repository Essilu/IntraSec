import axios from '../axios';
import { create } from 'zustand';

export const useRoleStore = create((set, get) => ({
  roles: [],
  role: null,
  create: async (role) => {
    // Create a new role, put it in the store (in 'role' and in the 'roles' array),
    // and return the created role
    const response = await axios.post('/roles', role);
    set({
      role: response.data,
      roles: [...get().roles, response.data],
    });
    return response.data;
  },
  fetchOne: async (id) => {
    // Fetch a role by its id, put it in the store (in 'role') and return it
    const response = await axios.get(`/roles/${id}`);
    set({ role: response.data });
    return response.data;
  },
  fetchAll: async () => {
    // Fetch all roles, put them in the store (in 'roles') and return them
    const response = await axios.get('/roles');
    set({ roles: response.data });
    return response.data;
  },
  update: async (id, role) => {
    // Update a role, update it in the store (put it in 'role' and update it in the 'roles'
    // array), and return the updated role
    const response = await axios.patch(`/roles/${id}`, role);
    set({
      role: response.data,
      roles: get().roles.map((t) => {
        if (t.id === id) return response.data;
        return t;
      }),
    });
    return response.data;
  },
  delete: async (id) => {
    // Delete a role, remove it from the store (remove it from the 'roles' array)
    await axios.delete(`/roles/${id}`);
    set({
      roles: get().roles.filter((t) => t.id !== id),
    });
  },
}));
