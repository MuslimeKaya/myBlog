document.addEventListener("DOMContentLoaded", function () {
  // Zaten giriş yapılmış mı kontrol et
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    window.location.href = "dashboard.html";
    return;
  }

  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");
  const loginBtn = document.getElementById("login-btn");

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Form kontrolü
    if (!username || !password) {
      showError("Lütfen kullanıcı adı ve şifre girin");
      return;
    }

    // Login işlemi
    loginBtn.textContent = "Giriş Yapılıyor...";
    loginBtn.disabled = true;

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Giriş yapılamadı");
      }

      // Başarılı giriş
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);

      // Ana sayfaya yönlendir
      window.location.href = "dashboard.html";
    } catch (error) {
      showError(error.message);
      loginBtn.disabled = false;
      loginBtn.textContent = "Giriş Yap";
    }
  });

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";

    // 5 saniye sonra hata mesajını gizle
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 5000);
  }
});
