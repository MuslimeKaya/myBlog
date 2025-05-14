
const SEO = ({ title, description }) => {
    // Gerçek bir uygulamada burada meta etiketleri ayarlanır
    document.title = title ? `${title} | Blog Sitesi` : 'Blog Sitesi';
    return null;
  };
  
  export default SEO;