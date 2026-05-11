const fs = require('fs');
const path = require('path');

// ── INDEX (root) footer — links relative to root ──
const footerIndex = `<footer class="stark-footer">
  <!-- ── TOP BAR: FREELANCE STATUS ── -->
  <div class="freelance-bar">
    <span class="fb-pulse"></span>
    <span class="fb-label">OPEN FOR FREELANCE WORK</span>
    <span class="fb-divider">·</span>
    <span class="fb-socials">Instagram DM · X</span>
    <a href="pages/contact.html" class="fb-hire-btn">HIRE ME</a>
  </div>

  <!-- ── MAIN FOOTER GRID ── -->
  <div class="sf-main-grid">
    <!-- COLUMN 1 — Brand -->
    <div class="sf-col-brand">
      <div class="sf-brand-id">// ID: AS-001 · NAVSARI, GUJARAT, INDIA</div>
      <h3 class="sf-brand-name">AFFAN SHAIKH</h3>
      <div class="sf-brand-role">Social Media Director · Web Developer · Content Creator</div>
      <p class="sf-brand-tagline">Content that hits. Visuals that convert. Between direction and technology lies the space where I create.</p>
      
      <div class="sf-terminal-chip">
        <span class="sf-chip-pulse"></span>● ONLINE · AVAILABLE FOR HIRE
      </div>
      
      <div class="sf-social-icons">
        <a href="https://instagram.com/AffanKaze" target="_blank" aria-label="Instagram">
          <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.834a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
        </a>
        <a href="https://in.linkedin.com/in/affan-shaikh-75a6a4233" target="_blank" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="https://x.com/AffanMarvel" target="_blank" aria-label="X">
          <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://youtube.com/@AffanMarvel" target="_blank" aria-label="YouTube">
          <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
      </div>
    </div>

    <!-- COLUMN 2 — Navigate -->
    <div class="sf-col-nav">
      <h4 class="sf-header">NAVIGATE</h4>
      <div class="sf-links-list">
        <a href="index.html"><span class="sf-arrow">›</span> Home</a>
        <a href="pages/affan-marvel.html"><span class="sf-arrow">›</span> About</a>
        <a href="pages/projects.html"><span class="sf-arrow">›</span> Projects</a>
        <a href="pages/services.html"><span class="sf-arrow">›</span> Services</a>
        <a href="pages/experience.html"><span class="sf-arrow">›</span> Experience</a>
        <a href="pages/achievements.html"><span class="sf-arrow">›</span> Achievements</a>
        <a href="pages/contact.html"><span class="sf-arrow">›</span> Contact</a>
      </div>
    </div>

    <!-- COLUMN 3 — Projects -->
    <div class="sf-col-nav">
      <h4 class="sf-header">PROJECTS</h4>
      <div class="sf-links-list sf-proj-list">
        <a href="https://affanmarvel.in" target="_blank">
          <span class="sf-proj-wrap"><span class="sf-arrow">›</span> AffanMarvel.in</span> <span class="sf-badge">[LIVE]</span>
        </a>
        <a href="#">
          <span class="sf-proj-wrap"><span class="sf-arrow">›</span> Gym Training App</span> <span class="sf-badge">[APP]</span>
        </a>
        <a href="#">
          <span class="sf-proj-wrap"><span class="sf-arrow">›</span> AI Automation Suite</span> <span class="sf-badge">[AI]</span>
        </a>
        <a href="#">
          <span class="sf-proj-wrap"><span class="sf-arrow">›</span> Anivel Culture</span> <span class="sf-badge">[BRAND]</span>
        </a>
        <a href="index.html">
          <span class="sf-proj-wrap"><span class="sf-arrow">›</span> AffanKaze.in</span> <span class="sf-badge">[PORTFOLIO]</span>
        </a>
      </div>
    </div>

    <!-- COLUMN 4 — Connect -->
    <div class="sf-col-nav">
      <h4 class="sf-header">CONNECT</h4>
      <div class="sf-links-list sf-connect-list">
        <a href="https://instagram.com/AffanKaze" target="_blank">
          <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.834a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
          Instagram DM
        </a>
        <a href="https://x.com/AffanMarvel" target="_blank">
          <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          X / Twitter
        </a>
        <a href="https://in.linkedin.com/in/affan-shaikh-75a6a4233" target="_blank">
          <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LinkedIn
        </a>
        <a href="mailto:hello@affankaze.in">
          <svg viewBox="0 0 24 24"><path d="M2 4h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm10 8.5L2.5 5.5v12a.5.5 0 0 0 .5.5h18a.5.5 0 0 0 .5-.5v-12L12 12.5z"/></svg>
          hello@affankaze.in
        </a>
      </div>
    </div>
  </div>

  <!-- ── GRADIENT DIVIDER ── -->
  <div class="sf-grad-divider"></div>

  <!-- ── BOTTOM COPYRIGHT BAR ── -->
  <div class="sf-bot-bar">
    <div class="sf-copy">© 2026 <span class="sf-hl">Affan Shaikh</span> · All Rights Reserved · AffanKaze.in</div>
    <div class="sf-sys-bot">
      <span class="fb-pulse sf-sys-pulse"></span> SYSTEM ONLINE · ALL MODULES ACTIVE
    </div>
  </div>
</footer>`;

// ── PAGES footer — links relative to pages/ directory ──
const footerPages = footerIndex.replace(/href="pages\//g, 'href="').replace(/href="index\.html"/g, 'href="../index.html"');

const faCdn = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">';

const filesToProcess = ['index.html'];
const pagesDir = 'pages';

if (fs.existsSync(pagesDir)) {
  fs.readdirSync(pagesDir).forEach(f => {
    if (f.endsWith('.html')) filesToProcess.push(path.join(pagesDir, f));
  });
}

for (const filepath of filesToProcess) {
  if (!fs.existsSync(filepath)) continue;
  const isIndex = filepath === 'index.html';
  const newFooter = isIndex ? footerIndex : footerPages;

  let content = fs.readFileSync(filepath, 'utf-8');

  // Replace existing footer
  const footerRegex = /<footer[\s\S]*?<\/footer>/gi;
  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, newFooter);
  } else {
    content = content.replace('</body>', newFooter + '\n</body>');
  }

  // Ensure Font Awesome CDN is present
  if (!content.includes('font-awesome')) {
    content = content.replace('</head>', '  ' + faCdn + '\n</head>');
  }

  fs.writeFileSync(filepath, content, 'utf-8');
  console.log('Updated', filepath);
}
