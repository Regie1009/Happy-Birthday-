// ======= CONFIGURABLE AREA =========
const NAME = "Regita Septi Anggraini";      // Nama panggilan doi
const FROM = "Hafid Azizudin";             // Namamu
const BDAY = "2026-09-10";                 // Tanggal lahir (YYYY-MM-DD)

const WISHES = [
  "Semoga hari-harimu selalu penuh cinta, kebahagiaan, dan kejutan indah yang membuatmu tersenyum setiap pagi sampai malam.",
  "Aku berharap kesehatanmu selalu terjaga, rezekimu mengalir lancar, dan semua doa serta mimpi indahmu bisa terwujud satu per satu.",
  "Terima kasih sudah jadi bagian paling berarti dalam hidupku, tempatku pulang, tempatku berbagi cerita, dan sosok yang selalu bikin aku merasa cukup.",
  "Aku mencintaimu bukan hanya untuk hari ini, tapi untuk setiap detik ke depan, sampai bulan, bintang, dan seluruh semesta jadi saksi cinta kita. ✨❤️",
  "KURANGI MAM PEDES, KURANGI MINUM ES YAAA SAYANGKUH..."
];

// Ganti nama file sesuai fotomu
const GALLERY = [
  { src: "assets/images/grid/22.jpg", caption: "Cantik kayak bunganya " },
  { src: "assets/images/date.jpg", caption: "First time Jalan Bareng" },
  { src: "assets/images/sunset.jpg", caption: "Sunset yang kamu suka" },
  { src: "assets/images/sport.jpg", caption: "Joging bareng Bubub" },
  { src: "assets/images/grid/15.jpg", caption: "Ini Cute Sekali" },
  { src: "assets/images/fav.jpg", caption: "Jepretan Favorit" },
  { src: "assets/images/perfek.jpg", caption: "PERFECT" }
];

const MOMENTS = [
  { date: "2024-03-11", text: "Pertama kali saling sapa di DM 💬" },
  { date: "2024-05-02", text: "Kencan pertama — deg-degan parah!" },
  { date: "2024-08-17", text: "Foto polaroid yang gagal tapi lucu 🤭" },
  { date: "2025-01-27", text: "Roadtrip dadakan, nyasar tapi bahagia" }
];

const GREETINGS = [
  { from: "", text: "" },
  { from: "", text: "" },
  { from: "", text: "" }
];

const IG_PHOTOS = [
  "assets/images/ig1.png",
  "assets/images/ig2.png",
  "assets/images/ig3.png",
  "assets/images/ig4.png"
];
// ====================================

// Cache elements
const nameEl = document.getElementById('name');
const fromNameEl = document.getElementById('fromName');
const titleEl = document.getElementById('title');
const subtitleEl = document.getElementById('subtitle');
const openBtn = document.getElementById('openBtn');
const musicBtn = document.getElementById('musicBtn');
const countdownBtn = document.getElementById('countdownBtn');
const countdownBox = document.getElementById('countdownBox');
const revealCard = document.getElementById('revealCard');
const loveNote = document.getElementById('loveNote');
const heartsWrap = document.getElementById('hearts');
const balloonsWrap = document.getElementById('balloons');
const bgm = document.getElementById('bgm');
const fx = document.getElementById('fx');

const igBtn = document.getElementById('loginIg');
const igCard = document.getElementById('igCard');
const igInfo = document.getElementById('igInfo');
const igGrid = document.getElementById('igGrid');

const wishInput = document.getElementById('wishInput');
const addWish = document.getElementById('addWish');
const clearWish = document.getElementById('clearWish');
const wishlistEl = document.getElementById('wishlist');

// Init content
nameEl.textContent = NAME;
fromNameEl.textContent = FROM;
document.getElementById('badgeText').textContent = `Selamat Ulang Tahun, ${NAME}!`;

// Typewriter subtitle
const baseSubtitle = `Ini hari spesialmu, ${NAME}. Semoga kamu merasa dicintai di setiap detiknya.`;
typewriter(subtitleEl, baseSubtitle, 14);

// Love note content (initially censored via CSS class .censored)
loveNote.innerHTML = WISHES.map((w,i)=>`<p>${i+1}. ${w}</p>`).join("") +
  `<p style="margin-top:10px">— <b>${FROM}</b></p>`;

// ====== Background: permanent hearts & balloons ======
setInterval(()=> spawnHeart(), 450); // continuous hearts
setInterval(()=> spawnBalloon(), 900); // continuous balloons

// ====== Gallery ======
const img = document.getElementById('galleryImg');
const cap = document.getElementById('caption');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let idx = 0;
function renderImg(){
  if(!GALLERY.length){ img.alt = 'Tambahkan foto di GALLERY.'; cap.textContent=''; return }
  const item = GALLERY[idx % GALLERY.length];
  img.src = item.src; img.alt = item.caption || 'Kenangan kita';
  cap.textContent = item.caption || '';
}
prev.onclick = ()=>{ idx = (idx - 1 + GALLERY.length) % GALLERY.length; renderImg() }
next.onclick = ()=>{ idx = (idx + 1) % GALLERY.length; renderImg() }
renderImg();

// ====== Timeline ======
const timeline = document.getElementById('timeline');
if (timeline) {
timeline.innerHTML = MOMENTS.map(m => `
  <div class="moment">
    <div class="muted" style="font-size:13px">${fmtDate(m.date)}</div>
    <div>${m.text}</div>
  </div>`).join('');
}

// ====== Real-time Countdown ======
function updateCountdown(){
  const t = nextBirthday(BDAY) - Date.now();
  if(t <= 0){ countdownBox.textContent = 'Hari ini ulang tahunmu! 🎂'; return }
  const d = Math.floor(t/86400000);
  const h = Math.floor((t%86400000)/3600000);
  const m = Math.floor((t%3600000)/60000);
  const s = Math.floor((t%60000)/1000);
  countdownBox.textContent = `${pad(d)} hari : ${pad(h)} jam : ${pad(m)} mnt : ${pad(s)} dtk`;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ====== Wishlist (localStorage) + simpan ke server ======
const LS_KEY = 'wishlist_hbd_' + NAME;
let wishes = JSON.parse(localStorage.getItem(LS_KEY) || '[]');

function renderWishlist(){
  wishlistEl.innerHTML = wishes
    .map((w,i)=>`<li>${escapeHtml(w)} <a href="#" data-i="${i}" class="rm" style="color:#ff9ec4">hapus</a></li>`)
    .join('');

  wishlistEl.querySelectorAll('.rm').forEach(a => {
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const idx = +a.dataset.i;
      wishes.splice(idx,1);
      saveWishlist();
    });
  });
}

function saveWishlist(){
  localStorage.setItem(LS_KEY, JSON.stringify(wishes));
  renderWishlist();
}

// 👉 helper: kirim 1 impian ke server -> bikin file .txt di /dream
function sendWishToServer(dreamText){
  // ambil nama IG kalau ada; fallback ke NAME/Anonim
  const igEl = document.getElementById('igUsername');
  let username = igEl && igEl.value.trim() ? igEl.value.trim() : (typeof NAME !== 'undefined' ? NAME : 'Anonim');
  if (username && !username.startsWith('@')) username = '@' + username;

  fetch('/save-dream', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ dream: dreamText, username })
  })
  .then(r => r.ok ? r.json() : Promise.reject(new Error('HTTP '+r.status)))
  .then(() => console.log('✅ Impian tersimpan di server:', dreamText))
  .catch(err => console.warn('⚠️ Gagal simpan impian ke server (UI tetap jalan):', err));
}

// tombol Tambah
addWish.addEventListener('click', ()=>{
  const v = wishInput.value.trim();
  if(!v) return;
  wishes.push(v);
  wishInput.value = '';
  saveWishlist();
  sendWishToServer(v);        // 👈 tambahan penting
});

// Enter di input = klik Tambah
wishInput.addEventListener('keydown', e=>{
  if(e.key === 'Enter'){ addWish.click(); }
});

// tombol Bersihkan (local saja)
clearWish.addEventListener('click', ()=>{
  if(confirm('Hapus semua wishlist?')){
    wishes = [];
    saveWishlist();
  }
});

renderWishlist();

// ====== Buttons / Reveal logic ======
let opened = false;
openBtn.addEventListener('click', ()=>{
  if(opened) { pulse(openBtn); return }
  opened = true;
  revealCard.classList.add('open');
  // remove censor class so content becomes readable
  const content = document.querySelector('#loveNote');
  if(content) content.classList.remove('censored');

  boomConfetti(280);
  startFireworks(3000);
  titleEl.innerHTML = `Selamat Ulang Tahun, <b>${NAME}</b>! ✨`;
  pulse(openBtn);
});

// Music play/pause
let playing = false;
musicBtn.addEventListener('click', async ()=>{
  try{
    if(!playing){ await bgm.play(); playing = true; musicBtn.textContent = '⏸️ Pause Musik' }
    else { bgm.pause(); playing=false; musicBtn.textContent = '▶️ Putar Musik' }
  }catch(e){ alert('Taruh file "song.mp3" di folder yang sama ya.'); }
});

// Countdown alert
if (countdownBtn) {
countdownBtn.addEventListener('click', ()=>{
  const target = nextBirthday(BDAY);
  const days = Math.ceil((+target - Date.now())/86400000);
  alert(`Menuju ulang tahun ${NAME} berikutnya: ${days} hari lagi (${target.toLocaleDateString()}).`)
});
}

// Instagram (demo)
igBtn.addEventListener('click', ()=>{
  const u = prompt('Masukkan username Instagram :','ur_regiee');
  if(!u) return;
  igCard.style.display = '';
  igInfo.innerHTML = `✅ Logged in as <b>@${escapeHtml(u)}</b>`;
  igGrid.innerHTML = IG_PHOTOS.map(src=>`<img src="${src}" alt="@${u} photo" onerror="this.src='data:image/svg+xml;charset=UTF-8,${encodeURIComponent(placeholderSvg())}'">`).join('');
  pulse(igBtn);
});

// Fireworks on click (ignore clicks on UI)
document.addEventListener('click', (e)=>{
  if(e.target.closest('button, input, a')) return;
  fireworksAt(e.clientX, e.clientY)
})

// ====== UTILITIES ======
function typewriter(el, text, speed=16){
  el.textContent = '';
  let i=0;
  const tick=()=>{
    if(i < text.length) el.textContent += text[i++];
    requestAnimationFrame(tick);
  };
  tick();
}

function spawnHeart(){
  const h = document.createElement('div');
  h.className='heart';
  const size = 14 + Math.random()*28;
  h.style.left = Math.random()*100+'%';
  h.style.animationDuration = (6+Math.random()*10)+'s';
  h.style.animationDelay = '0s';
  h.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${getComputedStyle(document.documentElement).getPropertyValue('--primary')}"><path d="M12 21s-6.716-4.297-9.428-7.01C.86 11.28.86 7.91 2.572 6.2c1.714-1.714 4.486-1.714 6.2 0L12 7.43l3.228-3.23c1.714-1.714 4.486-1.714 6.2 0 1.712 1.71 1.712 5.08 0 7.79C18.716 16.703 12 21 12 21z"/></svg>`;
  heartsWrap.appendChild(h);
  setTimeout(()=> h.remove(), 16000);
}

function spawnBalloon(){
  const b = document.createElement('div');
  b.className = 'balloon';
  const colors = ['var(--balloon1)','var(--balloon2)','var(--balloon3)','var(--balloon4)'];
  b.style.left = (Math.random()*100)+'%';
  b.style.background = colors[Math.floor(Math.random()*colors.length)];
  b.style.animationDuration = (8 + Math.random()*8) + 's';
  balloonsWrap.appendChild(b);
  setTimeout(()=> b.remove(), 18000);
}

function boomConfetti(count=200){
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.style.position='fixed';
    p.style.left = (window.innerWidth/2)+'px';
    p.style.top = (window.innerHeight/2)+'px';
    p.style.width = p.style.height = (6+Math.random()*6)+'px';
    p.style.background = ['#ff5fa2','#7cf5ff','#ffd166','#7dffaf'][i%4];
    p.style.transform = `translate(-50%,-50%) rotate(${Math.random()*360}deg)`;
    p.style.borderRadius = Math.random()>.5 ? '2px' : '50%';
    p.style.boxShadow = '0 6px 14px rgba(0,0,0,.25)';
    p.style.zIndex=9;
    document.body.appendChild(p);
    const angle = Math.random()*2*Math.PI; const speed = 4+Math.random()*8; const g=0.15;
    let x=window.innerWidth/2, y=window.innerHeight/2, vy = Math.sin(angle)*speed, vx=Math.cos(angle)*speed, life=0;
    const anim = ()=>{
      x+=vx; y+=vy; vy+=g; life++;
      p.style.left = x+'px'; p.style.top = y+'px'; p.style.opacity = (1 - life/120).toFixed(2);
      if(life<120) requestAnimationFrame(anim); else p.remove();
    }; anim();
  }
}

function sendMessage() {
  const msg = document.getElementById("userMessage").value;
  const display = document.getElementById("displayMessage");
  
  if (msg.trim() !== "") {
    display.innerHTML = `<p>${msg}</p><p>— Dari seseorang yang support 💖</p>`;
    display.style.display = "block";
    document.getElementById("userMessage").value = ""; // reset input
  }
}

// Fireworks canvas
const ctx = fx.getContext('2d');
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function resizeCanvas(){ fx.width = innerWidth; fx.height = innerHeight }

function fireworksAt(x,y){
  const particles = [];
  const colors = ['#ff5fa2','#7cf5ff','#ffd166','#7dffaf'];
  for(let i=0;i<80;i++){
    particles.push({ x, y, vx: (Math.random()-0.5)*6, vy:(Math.random()-0.5)*6, life: 60+Math.random()*30, color: colors[i%colors.length] })
  }
  const anim = ()=>{
    ctx.clearRect(0,0,fx.width,fx.height);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.04; p.life-=1;
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x,p.y,2,0,Math.PI*2); ctx.fill();
    })
    if(particles.some(p=>p.life>0)) requestAnimationFrame(anim);
  }; anim();
}

function startFireworks(ms=2000){
  const t = Date.now();
  const loop=()=>{ fireworksAt(innerWidth* (0.25+Math.random()*0.5), innerHeight*(0.3+Math.random()*0.5)); if(Date.now()-t < ms) setTimeout(loop, 250); };
  loop();
}

function pulse(el){ if(el) el.animate([{transform:'scale(1)'},{transform:'scale(1.05)'},{transform:'scale(1)'}],{duration:400}) }
function fmtDate(s){ const d = new Date(s+'T00:00:00'); return d.toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'}); }
function nextBirthday(dateStr){ const [y,m,d] = dateStr.split('-').map(Number); const now = new Date(); let target = new Date(now.getFullYear(), m-1, d, 0,0,0); if(target < now) target = new Date(now.getFullYear()+1, m-1, d, 0,0,0); return target; }
function pad(n){ return String(n).padStart(2,'0') }
function escapeHtml(s){ return s.replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m])) }
function placeholderSvg(){
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='%23222222'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial' font-size='14'>Foto IG</text></svg>`
}

// simpan sementara pesan sebelum dikirim
let tempMessage = "";

// Trigger dari tombol Kirim Pesan → buka modal konfirmasi
async function sendMessage() {
  const msg = document.getElementById("userMessage").value.trim();
  if (!msg) return alert("Isi dulu pesannya ya 😊");

  tempMessage = msg;
  document.getElementById("confirmModal").classList.remove("hidden");
}

// Tombol "Revisi dulu"
document.getElementById("reviseBtn").addEventListener("click", () => {
  document.getElementById("confirmModal").classList.add("hidden");
});

// Tombol "Kirim Pesan"
document.getElementById("sendBtn").addEventListener("click", async () => {
  document.getElementById("confirmModal").classList.add("hidden");

  // kirim ke server
  try {
    const res = await fetch("/save-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: tempMessage })
    });
    const data = await res.json();
    if (data.success) {
      console.log("Pesan tersimpan di:", data.file);
      document.getElementById("thankyouModal").classList.remove("hidden");
    } else {
      alert("Gagal kirim pesan: " + data.error);
    }
  } catch (err) {
    alert("Error koneksi ke server 😥");
    console.error(err);
  }

  // reset textarea
  document.getElementById("userMessage").value = "";
});

// Tombol tutup modal "Terima kasih"
document.getElementById("closeThanks").addEventListener("click", () => {
  document.getElementById("thankyouModal").classList.add("hidden");
});

// Variabel global untuk simpan impian sebelum konfirmasi
let currentDream = "";

// Event saat klik tombol Tambah
function addDream() {
    const dreamInput = document.getElementById("dreamInput").value.trim();

    if (!dreamInput) {
        alert("Tulis impianmu dulu ya!");
        return;
    }

    currentDream = dreamInput;
    document.getElementById("dreamModal").style.display = "flex";
}

// Tombol "Revisi dulu"
document.getElementById("dreamReviseBtn").addEventListener("click", () => {
    document.getElementById("dreamModal").style.display = "none";
});

// Tombol "Kirim"
document.getElementById("dreamConfirmBtn").addEventListener("click", () => {
    document.getElementById("dreamModal").style.display = "none";

    fetch("/save-dream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream: currentDream })
    })
    .then(res => res.text())
    .then(() => {
        document.getElementById("dreamSuccessModal").style.display = "flex";
        document.getElementById("dreamInput").value = "";
    })
    .catch(err => console.error("Error:", err));
});

// Tutup modal sukses
document.getElementById("dreamCloseSuccessBtn").addEventListener("click", () => {
    document.getElementById("dreamSuccessModal").style.display = "none";
});

// Bersihkan input
function clearDream() {
    document.getElementById("dreamInput").value = "";
}

// Background Slideshow
const slides = document.querySelectorAll('.bg-slideshow img');
let current = 0;

function changeSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}

// ganti foto tiap 7 detik
setInterval(changeSlide, 7000);

const btnVideo = document.getElementById("btnVideo");
const videoModal = document.getElementById("videoModal");
const closeVideo = document.getElementById("closeVideo");
const memoryVideo = document.getElementById("memoryVideo");

btnVideo.addEventListener("click", () => {
  videoModal.style.display = "flex";
  memoryVideo.play();
});

closeVideo.addEventListener("click", () => {
  videoModal.style.display = "none";
  memoryVideo.pause();
  memoryVideo.currentTime = 0; // reset ke awal
});

// Klik luar modal buat close
window.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    videoModal.style.display = "none";
    memoryVideo.pause();
    memoryVideo.currentTime = 0;
  }
});

// Background Grid
const images = [
  "assets/images/grid/1.jpg",
  "assets/images/grid/23.jpg",
  "assets/images/grid/12.jpg",
  "assets/images/grid/4.jpg",
  "assets/images/grid/5.jpg",
  "assets/images/grid/6.jpg",
  "assets/images/grid/7.jpg",
  "assets/images/grid/8.jpg",
  "assets/images/grid/19.jpg",
  "assets/images/grid/10.jpg",
  "assets/images/grid/11.jpg",
  "assets/images/grid/22.jpg",
  "assets/images/grid/13.jpeg",
  "assets/images/grid/14.jpg",
  "assets/images/grid/15.jpg",
  "assets/images/grid/16.png",
  "assets/images/grid/17.jpg",
  "assets/images/grid/18.jpg",
  "assets/images/grid/9.jpg",
  "assets/images/grid/20.jpg",
  "assets/images/grid/21.jpg",
  "assets/images/grid/3.jpg",
  "assets/images/grid/2.jpg",
];

const grid = document.getElementById("bgGrid");
const totalImages = 40;  // total gambar yang akan ditampilkan
let animationSpeed = 30;

// Fungsi untuk mengisi grid
function populateGrid() {
// Kosongkan grid terlebih dahulu
grid.innerHTML = '';
            
// Isi grid dengan gambar
for (let i = 0; i < totalImages; i++) {
const index = i % images.length;
const img = document.createElement("img");
img.src = images[index];
img.alt = `Background Image ${i + 1}`;
grid.appendChild(img);
}
         
// Duplikasi grid untuk efek scroll tak terbatas
for (let i = 0; i < totalImages; i++) {
const index = i % images.length;
const img = document.createElement("img");
img.src = images[index];
img.alt = `Background Image ${i + 1}`;
grid.appendChild(img);
}
}

// Fungsi untuk mengontrol animasi
function setupControls() {
const pauseBtn = document.getElementById('pauseBtn');
const slowerBtn = document.getElementById('slowerBtn');
const fasterBtn = document.getElementById('fasterBtn');
            
let isPaused = false;
let originalSpeed = animationSpeed;
            
pauseBtn.addEventListener('click', function() {
if (isPaused) {
grid.style.animationPlayState = 'running';
pauseBtn.textContent = 'Jeda';
} else {
grid.style.animationPlayState = 'paused';
pauseBtn.textContent = 'Lanjut';
}
isPaused = !isPaused;
});
            
slowerBtn.addEventListener('click', function() {
animationSpeed += 5;
grid.style.animationDuration = `${animationSpeed}s`;
});
            
fasterBtn.addEventListener('click', function() {
if (animationSpeed > 5) {
animationSpeed -= 5;
grid.style.animationDuration = `${animationSpeed}s`;
}
});
}

// Inisialisasi
populateGrid();
setupControls();