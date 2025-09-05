const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// biar bisa baca body JSON
app.use(express.json());

// serve file statis (index.html dkk)
app.use(express.static("public"));

// endpoint simpan pesan
app.post("/save-message", (req, res) => {
  const message = req.body.message;
  if (!message || message.trim() === "") {
    return res.status(400).json({ success: false, error: "Pesan kosong" });
  }

  // bikin folder messages kalau belum ada
  if (!fs.existsSync("messages")) {
    fs.mkdirSync("messages");
  }

  // nama file unik
  const filename = path.join("messages", `pesan_${Date.now()}.txt`);

  fs.writeFile(filename, message, (err) => {
    if (err) {
      console.error("Gagal simpan pesan:", err);
      return res.status(500).json({ success: false, error: "Gagal simpan pesan" });
    }
    console.log(`Pesan tersimpan di ${filename}`);
    res.json({ success: true, file: filename });
  });
});

// simpan impian ke folder /dream sebagai .txt
const dreamFolder = path.join(__dirname, 'dream');

app.post('/save-dream', (req, res) => {
  const { dream, username } = req.body || {};
  if (!dream) return res.status(400).json({ success: false, error: 'Dream is required' });

  if (!fs.existsSync(dreamFolder)) fs.mkdirSync(dreamFolder);

  const filePath = path.join(dreamFolder, `${Date.now()}.txt`);
  const content = `Impian: ${dream}\nDari: ${username || 'Anonim'}\n`;

  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) {
      console.error('Gagal simpan impian:', err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

// jalankan server
app.listen(PORT, () => console.log(`🚀 Server jalan di http://localhost:${PORT}`));
