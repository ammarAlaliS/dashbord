import create from 'zustand';
import { fetchAuthor } from '../utils/Api.js'; 

const useAuthorsStore = create((set) => ({
  authors: {},
  status: 'idle',
  error: null,
  fetchAuthorById: async (userId) => {
    try {
      set({ status: 'loading' });
      const author = await fetchAuthor(userId);
      set((state) => ({
        authors: {
          ...state.authors,
          [author._id]: author,
        },
        status: 'succeeded',
      }));
    } catch (error) {
      set({ status: 'failed', error: error.message });
    }
  },
}));

export default useAuthorsStore;
