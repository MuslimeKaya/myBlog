import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  // Tarih formatını düzenle
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) {
      return "Tarih bilgisi yok";
    }
    
    try {
      return new Date(timestamp.toDate()).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (err) {
      console.error("Tarih biçimlendirme hatası:", err);
      return "Tarih bilgisi yok";
    }
  };

  // İçerik önizlemesi oluştur
  const createExcerpt = (content, maxLength = 150) => {
    if (!content) return "";
    
    if (content.length <= maxLength) return content;
    
    return `${content.substring(0, maxLength)}...`;
  };

  return (
    <div className="blog-card">
      {blog.imageUrl && (
        <div className="blog-card-image">
          <img src={blog.imageUrl} alt={blog.title} />
        </div>
      )}
      
      <div className="blog-card-content">
        <h2 className="blog-title">{blog.title}</h2>
        
        <div className="blog-meta">
          {blog.createdAt && (
            <span className="blog-date">{formatDate(blog.createdAt)}</span>
          )}
          
          {blog.category && (
            <span className="blog-category">{blog.category}</span>
          )}
        </div>
        
        <p className="blog-excerpt">{createExcerpt(blog.content)}</p>
        
        <Link to={`/blog/${blog.id}`} className="read-more-link">
          Devamını Oku
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;