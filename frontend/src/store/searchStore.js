import { create } from 'zustand';

const useSearchStore = create((set) => ({
    query: '', // Arama sorgusu
    setQuery: (query) => set({ query }),
    filteredPosts: [], // Filtrelenmiş gönderiler
    setFilteredPosts: (posts) => set({ filteredPosts: posts }),
}));

export default useSearchStore;
