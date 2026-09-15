// EDIT YOUR REELS HERE
// Put thumbnail files inside the /images folder, then paste each Instagram Reel URL.
const reels = [
 {title:'Wedding Reel 01', thumbnail:'images/pappu.jpg', url:'https://www.instagram.com/reel/DdJHCypxidx/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=='},
 {title:'Wedding Reel 02', thumbnail:'images/chai.jpg', url:'https://www.instagram.com/reel/DdJMZCxRDI0/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=='},
 {title:'Wedding Reel 03', thumbnail:'images/naam karan.jpg', url:'https://www.instagram.com/reel/DaxfLczIarR/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=='},
 {title:'Wedding Reel 04', thumbnail:'images/care.jpg', url:'https://www.instagram.com/reel/DbnlWMytJiQ/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=='},
 {title:'Wedding Reel 05', thumbnail:'images/reaction.jpg', url:'https://www.instagram.com/reel/DbTD3NktTYw/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=='},
 {title:'Wedding Reel 06', thumbnail:'images/transtition.jpg', url:'https://www.instagram.com/reel/DXuGIMpCOnb/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=='}
];

function placeholderData(title) {
  const safe = String(title || 'ShaadiVibes').replace(/[<>&'"\\]/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '\\': '&#92;'
  }[char]));

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1120">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#251d19"/>
          <stop offset="1" stop-color="#0c0a0a"/>
        </linearGradient>
      </defs>
      <rect width="720" height="1120" fill="url(#g)"/>
      <circle cx="530" cy="190" r="210" fill="#d7b18b" opacity=".08"/>
      <text x="60" y="150" fill="#d7b18b" font-family="Arial" font-size="24" letter-spacing="6">SHADIVIBES.IN</text>
      <text x="60" y="540" fill="#f7f1ec" font-family="Georgia,serif" font-size="58">${safe}</text>
      <text x="60" y="1010" fill="#b5aaa4" font-family="Arial" font-size="20" letter-spacing="3">WEDDING CONTENT CREATION</text>
    </svg>
  `;

  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

function renderReels() {
  const grid = document.getElementById('reelGrid');
  if (!grid) return;

  grid.innerHTML = reels.map((reel, index) => {
    const title = String(reel.title || `Wedding Reel ${index + 1}`);
    const safeTitle = title.replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));

    const fallback = placeholderData(title);
    const thumb = reel.thumbnail && reel.thumbnail !== `images/reel-0${index + 1}.jpg` ? reel.thumbnail : fallback;

    return `
      <a class="reel-card" href="${reel.url}" target="_blank" rel="noopener" aria-label="Open ${safeTitle} on Instagram">
        <img src="${thumb}" alt="${safeTitle} thumbnail" data-fallback="${fallback}">
        <div class="reel-meta">
          <div class="reel-title">${safeTitle}</div>
          <span class="reel-open">↗</span>
        </div>
      </a>
    `;
  }).join('');

  grid.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      img.onerror = null;
      img.src = img.dataset.fallback || placeholderData('ShaadiVibes');
    });
  });
}

renderReels();

const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

