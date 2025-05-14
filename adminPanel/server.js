const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();
const serviceAccount = require("./serviceAccountKey.json");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyBjqBztQ9U9QK_U9in5F6jDdFTHzIAaihw",
  authDomain: "blog-project-14e03.firebaseapp.com",
  projectId: "blog-project-14e03",
  storageBucket: "blog-project-14e03.firebasestorage.app",
  messagingSenderId: "494114941984",
  appId: "1:494114941984:web:0026aae9ab55e08aa76045",
  measurementId: "G-BXV5HDCRD1",
};

// Firebase admin SDK başlatma
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
});

const db = admin.firestore();

// Basit admin doğrulama (gerçek projede daha güvenli bir yöntem kullanılmalıdır)
const adminCredentials = {
  username: "admin",
  password: "admin123", // Gerçek projede güçlü bir şifre kullanın
};

// API routes
// Admin girişi
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === adminCredentials.username &&
    password === adminCredentials.password
  ) {
    res.status(200).json({
      success: true,
      user: { username },
      token: "dummy-token", // Gerçek bir token yerine basit bir string
    });
  } else {
    res.status(401).json({ error: "Geçersiz kullanıcı adı veya şifre" });
  }
});

// Blog yazısı ekleme
app.post("/api/blogs", async (req, res) => {
  try {
    const { title, content, author, imageUrl } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Başlık ve içerik zorunludur" });
    }

    const timestamp = admin.firestore.FieldValue.serverTimestamp();

    const blogRef = await db.collection("blogs").add({
      title,
      content,
      author: author || "Admin",
      imageUrl: imageUrl || "",
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    res.status(201).json({
      id: blogRef.id,
      success: true,
      message: "Blog yazısı başarıyla eklendi",
    });
  } catch (error) {
    console.error("Blog ekleme hatası:", error);
    res.status(500).json({ error: "Blog yazısı eklenirken bir hata oluştu" });
  }
});

// Blog yazılarını getirme
app.get("/api/blogs", async (req, res) => {
  try {
    const blogsSnapshot = await db
      .collection("blogs")
      .orderBy("createdAt", "desc")
      .get();

    const blogs = [];
    blogsSnapshot.forEach((doc) => {
      blogs.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : null,
        updatedAt: doc.data().updatedAt ? doc.data().updatedAt.toDate() : null,
      });
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Blog getirme hatası:", error);
    res
      .status(500)
      .json({ error: "Blog yazıları getirilirken bir hata oluştu" });
  }
});

// Belirli bir blog yazısını getirme
app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blogDoc = await db.collection("blogs").doc(req.params.id).get();

    if (!blogDoc.exists) {
      return res.status(404).json({ error: "Blog yazısı bulunamadı" });
    }

    const blogData = blogDoc.data();

    res.status(200).json({
      id: blogDoc.id,
      ...blogData,
      createdAt: blogData.createdAt ? blogData.createdAt.toDate() : null,
      updatedAt: blogData.updatedAt ? blogData.updatedAt.toDate() : null,
    });
  } catch (error) {
    console.error("Blog getirme hatası:", error);
    res.status(500).json({ error: "Blog yazısı getirilirken bir hata oluştu" });
  }
});

// Server başlatma
app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
