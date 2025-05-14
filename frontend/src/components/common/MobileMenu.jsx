import { useEffect } from 'react';

function MobileMenu() {
  useEffect(() => {
    // Hamburger menü butonu ve navigasyon listesini seçme
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (!mobileMenuBtn || !navList) return; // Elementler yoksa çıkış
    
    // Hamburger menü butonuna tıklama olayı ekleme
    const handleMenuClick = () => {
      navList.classList.toggle('active');
    };
    
    // Menü öğelerine tıklandığında menüyü kapatma
    const handleNavItemClick = () => {
      if (window.innerWidth <= 768) {
        navList.classList.remove('active');
      }
    };
    
    // Sayfa yeniden boyutlandırıldığında menü durumunu kontrol etme
    const handleResize = () => {
      if (window.innerWidth > 768) {
        navList.classList.remove('active');
      }
    };
    
    // Event listener'ları ekleme
    mobileMenuBtn.addEventListener('click', handleMenuClick);
    
    const navItems = document.querySelectorAll('.nav-list a');
    navItems.forEach(item => {
      item.addEventListener('click', handleNavItemClick);
    });
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function - component unmount olduğunda event listener'ları temizle
    return () => {
      mobileMenuBtn.removeEventListener('click', handleMenuClick);
      navItems.forEach(item => {
        item.removeEventListener('click', handleNavItemClick);
      });
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Boş dependency array ile sadece mount olduğunda çalışır
  
  return null; // Bu component herhangi bir UI render etmiyor
}

export default MobileMenu;