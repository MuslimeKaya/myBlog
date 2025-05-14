// src/components/common/Navbar.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="nav-list">
          <li>
            <Link to="/">Ana Sayfa</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/about">Hakkımda</Link>
          </li>
          <li>
            <Link to="/contact">İletişim</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
