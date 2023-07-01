import { create } from 'zustand';
import axios from '../axios';

const fieldLookup = {
  PARTNER_COMPANY: 'partnerCompanies',
  PARTNER_SCHOOL: 'partnerSchools',
};

const kindLookup = {
  companies: 'PARTNER_COMPANY',
  schools: 'PARTNER_SCHOOL',
};

export const usePartnerStore = create((set, get) => ({
  partnerCompanies: [],
  partnerSchools: [],
  partner: null,
  create: async (company) => {
    const kind = kindLookup[company.kind];
    // Create a new partner, put it in the store (in 'partner' and in the corresponding array),
    // and return the created partner
    const response = await axios.post('/posts', { ...company, kind });
    set({
      partner: response.data,
      [fieldLookup[kind]]: [...get()[fieldLookup[kind]], response.data],
    });
    return response.data;
  },
  fetchOne: async (id) => {
    // Fetch a partner by its id, put it in the store (in 'partner') and return it
    const response = await axios.get(`/posts/${id}`);
    set({ partner: response.data });
    return response.data;
  },
  fetchAll: async (rawKind) => {
    const kind = kindLookup[rawKind];
    // Fetch all companies, put them in the store (in 'partnerCompanies') and return them
    const response = await axios.get(`/posts?kind=${kind}`);
    set({ [fieldLookup[kind]]: response.data });
    return response.data;
  },
  update: async (id, partner) => {
    // Update a partner, update it in the store (put it in 'partner' and update it in the 'articles'
    // array), and return the updated partner
    const response = await axios.patch(`/posts/${id}`, partner);
    const field = fieldLookup[response.data.kind];
    set({
      partner: response.data,
      [field]: get()[field].map((t) => {
        if (t.id === id) return response.data;
        return t;
      }),
    });
    return response.data;
  },
  delete: async (id) => {
    // Delete a partner, remove it from the store
    await axios.delete(`/posts/${id}`);
    set({
      partnerCompanies: get().partnerCompanies.filter((t) => t.id !== id),
      partnerSchools: get().partnerSchools.filter((t) => t.id !== id),
    });
  },
}));
