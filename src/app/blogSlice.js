import create from 'zustand';
import { fetchBlogs } from '../utils/Api.js'; 

const useBlogsStore = create((set) => ({
  blogs: [],
  status: 'idle',
  error: null, 
  fetchBlogs: async () => {
    try {
      set({ status: 'loading' }); 
      const blogs = await fetchBlogs();
      set({ blogs, status: 'succeeded' });
    } catch (error) {
      set({ status: 'failed', error: error.message });
    }
  },
}));

export default useBlogsStore;

