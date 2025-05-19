import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import BlogLayout from "../layouts/BlogLayout";
import HomePage from "../pages/HomePage";
import BlogPage from "../pages/BlogPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import SearchPage from "../pages/SearchPage";

import ErrorPage from "../pages/ErrorPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>

      <Route path="/blog" element={<BlogLayout />}>
        <Route index element={<BlogPage />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
