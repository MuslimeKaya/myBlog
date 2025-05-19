// src/pages/BlogPage/BlogPage.jsx
import React from "react";
import BlogList from "../../components/blog/BlogList";
import CategoryList from "../../components/blog/CategoryList";

const BlogPage = () => {
  return (
    <div className="blog-page">
      <h1>Blog Yazılarım</h1>
      <div className="blog-container">
        <div className="blog-main">
          <BlogList />
        </div>
        <div className="blog-sidebar">
          <CategoryList />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
