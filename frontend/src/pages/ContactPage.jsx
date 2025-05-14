import React from 'react';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>İletişim</h1>
      
      <h5>Merhaba, ben Müslime. Benimle iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz:</h5>
      
      <p> 
        JavaScript, React, Node.js Web Geliştirme  çalışmalar yapıyorum. 
        İş birlikleri ve projeler için benimle iletişime geçebilirsiniz.
      </p>
      
      <div className="contact-info">
        <div className="contact-info-item">
          <i className="fa-solid fa-envelope"></i>
          <a href="https://mail.google.com/mail/u/0/?view=cm&to=muslimekayar2121@gmail.com">muslimekayar2121@mail.com</a>
        </div>
        
        <div className="contact-info-item">
          <i className="fa-solid fa-location-dot"></i>
          <a href="#">Diyarbakır</a>
        </div>
        
        <div className="contact-info-item">
          <i className="fa-brands fa-linkedin"></i>
          <a href="https://www.linkedin.com/in/m%C3%BCslime-kayar-243368341/" target="_blank" rel="noopener noreferrer">LinkedIn Profilim</a>
        </div>
        
        <div className="contact-info-item">
          <i className="fa-brands fa-github"></i>
          <a href="https://github.com/MuslimeKaya" target="_blank" rel="noopener noreferrer">GitHub Profilim</a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;