import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// Common components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProjectPage from "./pages/AuthPages/ProjectPage";
import TravelPage from "./pages/AuthPages/TravelPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import PhotoGalleryPage from "./pages/AuthPages/PhotoGalleryPage";

// ErrorBoundary sınıfını düzeltme
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Hata yakalandı:", error, info);
    this.setState({ errorMessage: error.toString() });
  }

  render() {
    // Hata durumunda bu render edilir
    if (this.state.hasError) {
      return (
        <div
          style={{ padding: "20px", margin: "20px", border: "1px solid red" }}
        >
          <h2>Bir şeyler yanlış gitti</h2>
          <p>{this.state.errorMessage}</p>
          <button onClick={() => window.location.reload()}>
            Sayfayı Yenile
          </button>
        </div>
      );
    }

    // Hata yoksa children render edilir
    return this.props.children;
  }
}

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app-wrapper">
          <Header />
          <main className="main-content">
            <Routes>
              {/* Ana Sayfalar */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Kimlik Doğrulama Gerektiren Sayfalar */}
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="/travel" element={<TravelPage />} />
              <Route path="/gallery" element={<PhotoGalleryPage />} />

              {/* Blog Rotaları */}
              <Route path="/blog/*" element={<BlogPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
