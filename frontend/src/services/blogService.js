// src/services/blogService.js
import axios from "axios";
import { API_BASE_URL } from "../lib/api";

// Blog listesini getir
export const getAllBlogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs`);
    return response.data;
  } catch (error) {
    console.error("Blogları getirme hatası:", error);
    throw error;
  }
};

// Blog detayı getir
export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Blog detayı getirme hatası:", error);
    throw error;
  }
};

// Yeni blog oluştur (admin token gerektirir)
export const createBlog = async (blogData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/blogs`, blogData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Blog oluşturma hatası:", error);
    throw error;
  }
};

// Blog güncelle (admin token gerektirir)
export const updateBlog = async (id, blogData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/blogs/${id}`, blogData, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Blog güncelleme hatası:", error);
    throw error;
  }
};

// Blog sil (admin token gerektirir)
export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/blogs/${id}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Blog silme hatası:", error);
    throw error;
  }
};

// Kategorileri getir
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs/categories`);
    return response.data;
  } catch (error) {
    console.error("Kategorileri getirme hatası:", error);
    throw error;
  }
};
