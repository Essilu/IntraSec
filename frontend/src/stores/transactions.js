import axios from '../axios';
import { create } from 'zustand';

export const useTransactionStore = create((set, get) => ({
  transactions: [],
  transaction: null,
  create: async (transaction) => {
    // Create a new transaction, put it in the store (in 'transaction' and in the 'transactions' array),
    // and return the created transaction
    const response = await axios.post('/transactions', transaction);
    set({
      transaction: response.data,
      transactions: [...get().transactions, response.data],
    });
    return response.data;
  },
  fetchOne: async (id) => {
    // Fetch a transaction by its id, put it in the store (in 'transaction') and return it
    const response = await axios.get(`/transactions/${id}`);
    set({ transaction: response.data });
    return response.data;
  },
  fetchAll: async () => {
    // Fetch all transactions, put them in the store (in 'transactions') and return them
    const response = await axios.get('/transactions');
    set({ transactions: response.data });
    return response.data;
  },
  update: async (id, transaction) => {
    // Update a transaction, update it in the store (put it in 'transaction' and update it in the 'transactions'
    // array), and return the updated transaction
    const response = await axios.put(`/transactions/${id}`, transaction);
    set({
      transaction: response.data,
      transactions: get().transactions.map((t) => {
        if (t.id === id) return response.data;
        return t;
      }),
    });
    return response.data;
  },
  delete: async (id) => {
    // Delete a transaction, remove it from the store (remove it from the 'transactions' array)
    await axios.delete(`/transactions/${id}`);
    set({
      transactions: get().transactions.filter((t) => t.id !== id),
    });
  },
}));
