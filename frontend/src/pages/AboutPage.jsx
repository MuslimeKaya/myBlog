import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Ana Hakkımda başlığı ve kartı */}
      <div className="main-about">
        <h1>Hakkımda</h1>
        <div className="about-main-card">
          <div className="card">
            <i className="fa-solid fa-user"></i>
            <h3>Kimim?</h3>
            <p>
              Merhaba, ben Müslime. Diyarbakır'da yaşıyorum ve Aksaray Üniversitesi Yönetim Bilişim Sistemleri bölümünden mezunum. Yazılım geliştirme alanında özellikle JavaScript, TypeScript, React ve Node.js ekosistemi üzerine yoğunlaştım. Modern web teknolojilerine hakimiyetimi artırarak kullanıcı odaklı ve işlevsel arayüzler geliştirme konusunda çalışmalar yapıyorum.
            </p>
          </div>
        </div>
      </div>


      <div className="about-info-cards">
        <div className="about-card">
          <i className="fa-solid fa-graduation-cap"></i>
          <h3>Eğitim</h3>
          <p>Aksaray Üniversitesi, Yönetim Bilişim Sistemleri</p>
        </div>

        <div className="about-card">
          <i className="fa-solid fa-location-dot"></i>
          <h3>Yaşadığım Şehir</h3>
          <p>Diyarbakır</p>
        </div>

        <div className="about-card">
          <i className="fa-solid fa-code"></i>
          <h3>İlgi Alanlarım</h3>
          <p>JavaScript, TypeScript, React, Node.js Web Geliştirme,</p>
        </div>

        <div className="about-card">
          <i className="fa-solid fa-bullseye"></i>
          <h3>Neden Kod Yazıyorum?</h3>
          <p>
            Teknolojiye olan ilgim ve merakım sayesinde kod yazmayı seviyorum; bilgisayar başında geçirdiğim zamanın nasıl geçtiğini anlamıyorum.
          </p>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;