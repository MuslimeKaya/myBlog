// frontend/src/store/blogStore.js
import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL } from "../lib/api";

const useBlogStore = create((set, get) => ({
  // State
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,

  // Tüm blog yazılarını getir
  // store/blogStore.js - fetchBlogs fonksiyonu
  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      console.log("Blogları getirme isteği gönderiliyor...");
      const response = await axios.get(API_BASE_URL);
      console.log("API yanıtı:", response.data);
      set({ blogs: response.data || [], loading: false });
    } catch (error) {
      console.error("Blog yazıları getirilirken hata:", error);
      console.error("Hata detayı:", error.response?.data || error.message);
      set({
        error: "Blog yazıları yüklenirken bir sorun oluştu.",
        loading: false,
        blogs: [], // Boş bir dizi ayarlayın
      });
    }
  },
  // ID'ye göre blog yazısını getir
  fetchBlogById: async (id) => {
    set({ loading: true, error: null });
    try {
      console.log(`Blog detayı getiriliyor, ID: ${id}`);
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      console.log("Blog detayı alındı:", response.data);
      set({ currentBlog: response.data, loading: false });
    } catch (error) {
      console.error("Blog detayı getirilirken hata:", error);
      console.error("Hata yanıtı:", error.response?.data);
      set({
        error: "Blog yazısı yüklenirken bir sorun oluştu.",
        loading: false,
      });
    }
  },
  // Yeni blog yazısı oluştur
  createBlog: async (blogData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(API_BASE_URL, blogData);
      set({
        blogs: [response.data, ...get().blogs],
        loading: false,
      });
      return response.data;
    } catch (error) {
      console.error("Blog oluşturulurken hata:", error);
      set({
        error: "Blog yazısı oluşturulurken bir sorun oluştu.",
        loading: false,
      });
      return null;
    }
  },

  // Blog yazısını güncelle
  updateBlog: async (id, blogData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, blogData);

      // Blog listesini güncelle
      const updatedBlogs = get().blogs.map((blog) =>
        blog.id === id ? { ...blog, ...blogData } : blog
      );

      set({
        blogs: updatedBlogs,
        currentBlog: response.data,
        loading: false,
      });

      return response.data;
    } catch (error) {
      console.error("Blog güncellenirken hata:", error);
      set({
        error: "Blog yazısı güncellenirken bir sorun oluştu.",
        loading: false,
      });
      return null;
    }
  },

  // Blog yazısını sil
  deleteBlog: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);

      // Silinen blog yazısını listeden kaldır
      const filteredBlogs = get().blogs.filter((blog) => blog.id !== id);

      set({
        blogs: filteredBlogs,
        loading: false,
      });

      return true;
    } catch (error) {
      console.error("Blog silinirken hata:", error);
      set({
        error: "Blog yazısı silinirken bir sorun oluştu.",
        loading: false,
      });
      return false;
    }
  },

  // State'i temizle
  clearCurrentBlog: () => set({ currentBlog: null }),
  clearError: () => set({ error: null }),
}));

export default useBlogStore;
