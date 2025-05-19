import { Link } from "react-router-dom"; // Sayfa yönlendirmesi için Link'i ekledik
import Navbar from "./Navbar";
import ThemeSwitcher from "../../theme/ThemeSwitcher";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/" className="logo-link"> 
            <span><i className="fa-solid fa-laptop-code"></i> Müslime'nin Bloğu</span>
          </Link>
        </div>
        
        <ThemeSwitcher />
        <Navbar />
        <MobileMenu />
        <button class="mobile-menu-btn" aria-label="Toggle Mobile Menu">
            &#9776; 
        </button>

      </div>
    </header>
  );
};

export default Header;
