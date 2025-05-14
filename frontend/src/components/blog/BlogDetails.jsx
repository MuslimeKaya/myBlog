// components/blog/BlogDetails.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useBlogStore from "../../store/blogStore.js";

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Zustand store'dan verileri ve fonksiyonları al
  const { currentBlog, loading, error, fetchBlogById, clearCurrentBlog } = useBlogStore();

  // Component yüklendiğinde blog detayını getir
  useEffect(() => {
    fetchBlogById(slug);
    
    // Component unmount olduğunda temizlik yap
    return () => clearCurrentBlog();
  }, [slug, fetchBlogById, clearCurrentBlog]);

  // Yükleme ve hata durumlarını işle
  if (loading) return <div className="loading">Yükleniyor...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!currentBlog) return <div className="not-found">Blog yazısı bulunamadı.</div>;

  // Tarih formatını düzenle
  const formatDate = (timestamp) => {
    if (!timestamp) {
      return "Tarih bilgisi yok";
    }
    
    try {
      // timestamp bir Firestore Timestamp objesi, bir string, veya başka bir formatta olabilir
      let date;
      if (timestamp._seconds) {
        // Firestore Timestamp objesi
        date = new Date(timestamp._seconds * 1000);
      } else if (typeof timestamp === 'string') {
        // ISO string
        date = new Date(timestamp);
      } else {
        // Diğer durumlarda doğrudan Date objesine çevirmeyi dene
        date = new Date(timestamp);
      }
      
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (err) {
      console.error("Tarih biçimlendirme hatası:", err);
      return "Tarih bilgisi yok";
    }
  };

  return (
    <div className="blog-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Geri
      </button>
      
      <h1>{currentBlog.title}</h1>
      
      <div className="blog-meta">
        {currentBlog.createdAt && (
          <p>
            Yayınlanma Tarihi: {formatDate(currentBlog.createdAt)}
          </p>
        )}
        
        {currentBlog.updatedAt && currentBlog.createdAt && 
         JSON.stringify(currentBlog.updatedAt) !== JSON.stringify(currentBlog.createdAt) && (
          <p>
            Güncellenme Tarihi: {formatDate(currentBlog.updatedAt)}
          </p>
        )}
        
        {currentBlog.category && (
          <p className="blog-category">
            Kategori: {currentBlog.category}
          </p>
        )}
      </div>
      
      {currentBlog.imageUrl && (
        <div className="blog-image">
          <img src={currentBlog.imageUrl} alt={currentBlog.title} />
        </div>
      )}
      
      <div className="blog-content">
        {currentBlog.content && currentBlog.content.split('\n').map((paragraph, index) => (
          paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
        ))}
      </div>
      
      <div className="blog-actions">
        <button 
          onClick={() => navigate(`/blog/edit/${slug}`)} 
          className="edit-button"
        >
          Düzenle
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;