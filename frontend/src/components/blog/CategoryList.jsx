// components/blog/CategoryList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

// Doğrudan URL'yi tanımlıyoruz, env değişkeni hatası almamak için
const API_URL = "http://localhost:5000";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Backend API'dan kategorileri getir - URL düzeltildi
        const response = await axios.get(`${API_URL}/api/blogs/categories`);
        console.log("Kategoriler:", response.data);

        // Veri kontrolü yapılıyor
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          // Eğer response.data bir array değilse (örneğin bir obje ise)
          console.warn("API yanıtı bir dizi değil:", response.data);
          setCategories([]);
        }

        setError(null);
      } catch (err) {
        console.error("Kategoriler getirilirken hata:", err);
        setError("Kategoriler yüklenirken bir sorun oluştu");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Kategori seçme işlevi
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId === activeCategory ? null : categoryId);
    // Burada seçilen kategoriye göre bir filtreleme işlemi yapabilirsiniz
    // Örneğin: onCategorySelect(categoryId) gibi bir prop ile üst bileşene bildirebilirsiniz
  };

  // Yükleme durumu
  if (loading) {
    return (
      <div className="category-list">
        <h3>Kategoriler</h3>
        <div className="loading">Yükleniyor...</div>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="category-list">
        <h3>Kategoriler</h3>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="category-list">
      <h3>Kategoriler</h3>
      {categories.length > 0 ? (
        <ul className="categories">
          {categories.map((category) => (
            <li
              key={category.id}
              className={activeCategory === category.id ? "active" : ""}
              onClick={() => handleCategoryClick(category.id)}
            >
              <span className="category-name">{category.name}</span>
              <span className="category-count">({category.count || 0})</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-categories">Henüz kategori bulunmuyor</p>
      )}
    </div>
  );
};

export default CategoryList;
