import { create } from 'zustand';
import axios from 'axios';

const usePhotoStore = create((set) => ({
  photos: [],
  loading: false,
  error: null,

  fetchPhotos: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/photos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ photos: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default usePhotoStore;
