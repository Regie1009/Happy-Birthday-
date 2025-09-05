# 🎉 Birthday Surprise Web App

Projek ini adalah website interaktif sebagai **kejutan ulang tahun**.  
Dibuat dengan **HTML, CSS, JavaScript, dan Node.js (Express)**.  

Website ini menghadirkan pengalaman yang fun, manis, dan personal dengan berbagai fitur interaktif seperti pengiriman pesan, wishlist, video kenangan, dan background foto grid yang penuh memori.

---

## ✨ Fitur Utama
- 💌 **Pesan untuk Developer**
  - User bisa menulis pesan, konfirmasi sebelum terkirim.
  - Pesan otomatis tersimpan di server sebagai file `.txt` dalam folder `messages/`.

- 🌠 **Wishlist / Impian**
  - User bisa menulis wishlist atau impian mereka.
  - Semua wishlist disimpan di folder `dream/` dalam bentuk file `.txt`.

- 🎞 **Video Kenangan**
  - Tombol khusus untuk membuka modal video.
  - Bisa menampilkan video memorable sebagai bagian dari kejutan.

- 🖼️ **Background Grid Foto**
  - Foto-foto tampil dalam bentuk grid estetik sebagai background website.
  - Foto bisa diulang otomatis dan ditata responsif.

- 🎵 **Musik & Audio**
  - Tambahan musik agar suasana lebih hidup.

- 🎨 **UI Instagram-like**
  - Tampilan mirip Instagram agar user merasa familiar dan nyaman.

---

## 📂 Struktur Folder
project/
│
├── public/ # File statis (HTML, CSS, JS, assets)
│ ├── index.html
│ ├── styles.css
│ ├── script.js
│ └── assets/ # Foto, musik, video
│
├── messages/ # Folder penyimpanan pesan txt
├── dream/ # Folder penyimpanan wishlist txt
├── server.js # Server Node.js (Express)
├── package.json
└── README.md

## 🚀 Cara Menjalankan

1. **Clone repo ini**
   ```bash
   git clone https://github.com/username/repo-nama.git
   cd repo-nama
npm install

node server.js

Akses di browser --->  http://localhost:3000
