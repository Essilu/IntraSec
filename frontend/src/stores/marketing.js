import axios from '../axios';
import { create } from 'zustand';

export const useMarketingStore = create((set, get) => ({
  articles: [],
  article: null,
  create: async (article) => {
    // Create a new article, put it in the store (in 'article' and in the 'articles' array),
    // and return the created article
    const response = await axios.post('/posts', article);
    set({
      article: response.data,
      articles: [...get().articles, response.data],
    });
    return response.data;
  },
  fetchOne: async (id) => {
    // Fetch a article by its id, put it in the store (in 'article') and return it
    const response = await axios.get(`/posts/${id}`);
    set({ article: response.data });
    return response.data;
  },
  fetchAll: async () => {
    // Fetch all articles, put them in the store (in 'articles') and return them
    const response = await axios.get('/posts?kind=MARKETING_POST');
    set({ articles: response.data });
    return response.data;
  },
  update: async (id, article) => {
    // Update a article, update it in the store (put it in 'article' and update it in the 'articles'
    // array), and return the updated article
    const response = await axios.patch(`/posts/${id}`, article);
    set({
      article: response.data,
      articles: get().articles.map((t) => {
        if (t.id === id) return response.data;
        return t;
      }),
    });
    return response.data;
  },
  delete: async (id) => {
    // Delete a article, remove it from the store (remove it from the 'articles' array)
    await axios.delete(`/posts/${id}`);
    set({
      articles: get().articles.filter((t) => t.id !== id),
    });
  },
}));
