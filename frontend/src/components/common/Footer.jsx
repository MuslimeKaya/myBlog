import React from "react";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <h2>BlogSite</h2>
          <p>Hayallerimi ve keşiflerimi burada paylaşıyorum.</p>
        </div>

        <div className="footer-links">
          <a href="/" aria-label="Anasayfa">Anasayfa</a>
          <a href="/blog" aria-label="Blog">Blog</a>
          <a href="/contact" aria-label="İletişim">İletişim</a>
        </div>

        <div className="footer-social">
        <a href="https://mail.google.com/mail/u/0/?view=cm&to=muslimekayar2121@gmail.com" target="_blank">

            <i className="fa-solid fa-envelope"></i>
          </a>

          <a href="https://github.com/MuslimeKaya" target="_blank" rel="noopener noreferrer" aria-label="Github">
            <i className="fa-brands fa-github"></i>
          </a>

          <a href="https://www.linkedin.com/in/m%C3%BCslime-kayar-243368341/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin"></i>
          </a>

          <a href="https://x.com/KayarMuslime" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <i className="fa-brands fa-twitter"></i>
          </a>

          <a href="https://www.instagram.com/muslime.kaya?igsh=aXMyeGNqejlkcTd4" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>

          <a href="tel:+905530807908" aria-label="Telefon">
            <i className="fa-solid fa-phone-volume"></i>
          </a>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Blog Site. Tüm Hakları Saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
