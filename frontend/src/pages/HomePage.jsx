import React from 'react';
import { Link } from 'react-router-dom';
import uzunGolImage from '../assets/images/uzun-göl.jpg';

const HomePage = () => {
  return (
    <div className="home-page">
      <img
        src={uzunGolImage}
        alt="Uzun Göl"
        className="background-image"
      />
      <div className="home-content">
        <h1>Ana Sayfa</h1>
        <p>Blog siteme hoş geldiniz!</p>
        <p>Yazılım ve gezi hakkında daha fazla bilgi edinmek için aşağıdaki bölümlere göz atın.</p>
        <div className="footer-cards">
          <div className="footer-card">
            <h3 className="footer-card__title">Yazılım Dünyası</h3>
            <p className="footer-card__description">
              Web geliştirme, modern teknolojiler ve yazılım dünyasındaki deneyimlerimi paylaşıyorum.
            </p>
            <Link to="/blog" className="footer-card__link">
              Yazıları Oku →
            </Link>
          </div>

          <div className="footer-card">
            <h3 className="footer-card__title">Gezi Notları</h3>
            <p className="footer-card__description">
              Yeni yerler keşfetmeyi ve bu deneyimleri sizlerle paylaşmayı seviyorum.
            </p>
            <Link to="/blog" className="footer-card__link">
              Gezileri Keşfet →
            </Link>
          </div>

          <div className="footer-card">
            <h3 className="footer-card__title">Blog Yazılarım</h3>
            <p className="footer-card__description">
              Kişisel gelişim, yazılım ve seyahat notlarıyla dopdolu blog içeriklerim burada!
            </p>
            <Link to="/blog" className="footer-card__link">
              Blogu Keşfet →
            </Link>
          </div>

          <div className="footer-card">
            <h3 className="footer-card__title">Fotoğraf Galerisi</h3>
            <p className="footer-card__description">
              Gezdiğim yerlerden ilham veren kareleri ve hikayelerini keşfedin.
            </p>
            <Link to="/gallery" className="footer-card__link">
              Fotoğraflara Göz At →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
