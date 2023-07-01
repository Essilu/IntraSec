import { create } from 'zustand';
import axios from '../axios';

export const useTicketStore = create((set, get) => ({
  tickets: [],
  ticket: null,
  create: async (ticket) => {
    // Create a new ticket, put it in the store (in 'ticket' and in the 'tickets' array),
    // and return the created ticket
    const response = await axios.post('/posts', {
      ...ticket,
      kind: 'SUPPORT_TICKET',
    });
    set({
      ticket: response.data,
      tickets: [...get().tickets, response.data],
    });
    return response.data;
  },
  fetchOne: async (id) => {
    // Fetch a ticket by its id, put it in the store (in 'ticket') and return it
    const response = await axios.get(`/posts/${id}`);
    set({ ticket: response.data });
    return response.data;
  },
  fetchAll: async () => {
    // Fetch all tickets, put them in the store (in 'tickets') and return them
    const response = await axios.get('/posts?kind=SUPPORT_TICKET');
    set({ tickets: response.data });
    return response.data;
  },
  update: async (id, ticket) => {
    // Update a ticket, update it in the store (put it in 'ticket' and update it in the 'tickets'
    // array), and return the updated ticket
    const response = await axios.patch(`/posts/${id}`, ticket);
    set({
      ticket: response.data,
      tickets: get().tickets.map((t) => {
        if (t.id === id) return response.data;
        return t;
      }),
    });
    return response.data;
  },
  delete: async (id) => {
    // Delete a ticket, remove it from the store (remove it from the 'tickets' array)
    await axios.delete(`/posts/${id}`);
    set({
      tickets: get().tickets.filter((t) => t.id !== id),
    });
  },
}));
