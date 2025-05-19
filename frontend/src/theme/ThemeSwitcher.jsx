import { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  // localStorage'dan tema tercihini al veya varsayılan olarak 'light' kullan
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Tema değiştiğinde document.documentElement üzerinde data-theme set et
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="header-actions">
      <label className="theme-switcher">
        <input 
          type="checkbox" 
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <span className="theme-slider">
          <div className="theme-icons">
            <span className="theme-icon">☀️</span>
            <span className="theme-icon">🌙</span>
          </div>
        </span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;