document.addEventListener("DOMContentLoaded", function () {
  // Giriş kontrolü
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    window.location.href = "index.html";
    return;
  }

  // DOM elementleri
  const logoutBtn = document.getElementById("logout-btn");
  const menuLinks = document.querySelectorAll(".sidebar a");
  const contentSections = document.querySelectorAll(".content-section");
  const blogForm = document.getElementById("blog-form");
  const blogErrorMessage = document.getElementById("blog-error-message");
  const blogSuccessMessage = document.getElementById("blog-success-message");
  const blogsContainer = document.getElementById("blogs-container");
  const blogsLoading = document.getElementById("blogs-loading");

  // Aktif sekme değiştirme
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Aktif menü öğesini güncelle
      menuLinks.forEach((l) => {
        l.parentElement.classList.remove("active");
      });
      this.parentElement.classList.add("active");

      // İlgili içerik bölümünü göster
      const targetSection = this.getAttribute("data-section");
      contentSections.forEach((section) => {
        section.classList.remove("active");
      });
      document.getElementById(targetSection).classList.add("active");

      // Blog listesi sekmesine geçildiğinde blogları getir
      if (targetSection === "blog-list") {
        fetchBlogs();
      }
    });
  });

  // Çıkış yapma işlemi
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    window.location.href = "index.html";
  });

  // Blog ekleme formu
  blogForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("blog-title").value.trim();
    const author =
      document.getElementById("blog-author").value.trim() || "Admin";
    const imageUrl = document.getElementById("blog-image").value.trim();
    const content = document.getElementById("blog-content").value.trim();

    // Form kontrolü
    if (!title || !content) {
      showBlogError("Başlık ve içerik alanları zorunludur");
      return;
    }

    // Blog ekleme işlemi
    try {
      const submitBtn = blogForm.querySelector('button[type="submit"]');
      submitBtn.textContent = "Kaydediliyor...";
      submitBtn.disabled = true;

      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, author, imageUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Blog yazısı eklenirken bir hata oluştu");
      }

      // Başarılı ekleme
      showBlogSuccess("Blog yazısı başarıyla eklendi");
      blogForm.reset();

      submitBtn.textContent = "Blog Yazısını Kaydet";
      submitBtn.disabled = false;
    } catch (error) {
      showBlogError(error.message);
      const submitBtn = blogForm.querySelector('button[type="submit"]');
      submitBtn.textContent = "Blog Yazısını Kaydet";
      submitBtn.disabled = false;
    }
  });

  // Blog yazılarını getirme
  async function fetchBlogs() {
    blogsContainer.innerHTML = "";
    blogsLoading.style.display = "block";

    try {
      const response = await fetch("http://localhost:5000/api/blogs");
      const blogs = await response.json();

      blogsLoading.style.display = "none";

      if (blogs.length === 0) {
        blogsContainer.innerHTML = "<p>Henüz blog yazısı bulunmuyor.</p>";
        return;
      }

      blogs.forEach((blog) => {
        const blogCard = createBlogCard(blog);
        blogsContainer.appendChild(blogCard);
      });
    } catch (error) {
      blogsLoading.style.display = "none";
      blogsContainer.innerHTML = `<p>Blog yazıları yüklenirken bir hata oluştu: ${error.message}</p>`;
    }
  }

  // Blog kartı oluşturma
  function createBlogCard(blog) {
    const blogCard = document.createElement("div");
    blogCard.className = "blog-card";

    const createdDate = blog.createdAt
      ? new Date(blog.createdAt).toLocaleDateString("tr-TR")
      : "Bilinmiyor";

    // İçeriği kısaltma
    const shortContent =
      blog.content.length > 150
        ? blog.content.substring(0, 150) + "..."
        : blog.content;

    blogCard.innerHTML = `
            <h3>${blog.title}</h3>
            <div class="blog-meta">Yazar: ${blog.author} | Tarih: ${createdDate}</div>
            <div class="blog-content">${shortContent}</div>
            <div class="blog-actions">
                <a href="#" class="btn primary-btn view-blog" data-id="${blog.id}">Görüntüle</a>
            </div>
        `;

    // Görüntüleme butonu işlevi
    const viewBtn = blogCard.querySelector(".view-blog");
    viewBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // Buraya blog detay görüntüleme kodu eklenebilir
      alert(
        `Blog ID: ${this.getAttribute("data-id")}\nBu işlev henüz eklenmedi.`
      );
    });

    return blogCard;
  }

  // Hata mesajı gösterme
  function showBlogError(message) {
    blogErrorMessage.textContent = message;
    blogErrorMessage.style.display = "block";
    blogSuccessMessage.style.display = "none";

    // 5 saniye sonra hata mesajını gizle
    setTimeout(() => {
      blogErrorMessage.style.display = "none";
    }, 5000);
  }

  // Başarı mesajı gösterme
  function showBlogSuccess(message) {
    blogSuccessMessage.textContent = message;
    blogSuccessMessage.style.display = "block";
    blogErrorMessage.style.display = "none";

    // 5 saniye sonra başarı mesajını gizle
    setTimeout(() => {
      blogSuccessMessage.style.display = "none";
    }, 5000);
  }
});
