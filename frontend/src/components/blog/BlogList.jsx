// components/blog/BlogList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard.jsx";
import useBlogStore from "../../store/blogStore.js";

const BlogList = ({ categoryId }) => {
  // Zustand store'dan verileri alın
  const { blogs, loading, error, fetchBlogs } = useBlogStore();
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Blog verilerini getir
  useEffect(() => {
    console.log("BlogList bileşeni yükleniyor");

    const loadBlogs = async () => {
      try {
        await fetchBlogs();
        console.log("Bloglar başarıyla getirildi");
      } catch (err) {
        console.error("Blog getirme hatası:", err);
      } finally {
        setHasLoadedOnce(true);
      }
    };

    loadBlogs();
  }, [fetchBlogs]);

  // Kategoriye göre filtreleme
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      if (categoryId) {
        // Belirli bir kategoriye göre filtrele
        setFilteredBlogs(
          blogs.filter((blog) => blog.categoryId === categoryId)
        );
      } else {
        // Tüm blogları göster
        setFilteredBlogs(blogs);
      }
    } else {
      setFilteredBlogs([]);
    }
  }, [blogs, categoryId]);

  console.log("Mevcut blog durumu:", {
    blogsCount: blogs?.length,
    filteredCount: filteredBlogs.length,
    loading,
    error,
    hasLoadedOnce,
    activeCategory: categoryId,
  });

  // Yükleme durumu - ilk kez yükleniyorsa loading göster
  if (loading && !hasLoadedOnce) {
    return (
      <div className="blogs-container">
        <div className="loading-container">
          <div className="loading">Bloglar yükleniyor...</div>
        </div>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="blogs-container">
        <div className="error-container">
          <div className="error-message">
            <h2>Bir hata oluştu</h2>
            <p>{error}</p>
            <button onClick={() => fetchBlogs()} className="retry-button">
              Yeniden Dene
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blogs-container">
      {/* Kategoriye göre filtreleme UI'ı buraya eklenebilir */}

      {filteredBlogs.length === 0 ? (
        <div className="no-blogs">
          <p>
            {categoryId
              ? "Bu kategoride henüz blog yazısı bulunmuyor."
              : "Henüz hiç blog yazısı bulunmuyor."}
          </p>
          <Link to="/blog/create" className="create-blog-button">
            {categoryId
              ? "Bu Kategoriye Blog Yazısı Ekle"
              : "İlk Blog Yazısını Oluştur"}
          </Link>
        </div>
      ) : (
        <>
          {loading && hasLoadedOnce && (
            <div className="refreshing-indicator">Yenileniyor...</div>
          )}

          <div className="blog-grid">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          <div className="blog-actions">
            <Link to="/blog/create" className="create-blog-button">
              Yeni Blog Yazısı
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogList;
