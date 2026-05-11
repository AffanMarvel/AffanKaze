(function () {
  const path = window.location.pathname;
  const file = path.split('/').pop() || 'index.html';
  const inPages = path.includes('/pages/');
  const root = inPages ? '../' : '';
  const pageHref = (slug) => inPages ? `${slug}.html` : `pages/${slug}.html`;

  const items = [
    ['Home', `${root}index.html`, 'index.html'],
    ['Experience', pageHref('experience'), 'experience.html'],
    ['Projects', pageHref('projects'), 'projects.html'],
    ['Services', pageHref('services'), 'services.html'],
    ['How I Work', pageHref('how-i-work'), 'how-i-work.html'],
    ['Achievements', pageHref('achievements'), 'achievements.html'],
    ['Hobbies', pageHref('hobbies'), 'hobbies.html'],
    ['Travel', pageHref('travel'), 'travel.html'],
    ['Marvel', pageHref('affan-marvel'), 'affan-marvel.html'],
    ['Media', pageHref('media'), 'media.html'],
    ['Contact', pageHref('contact'), 'contact.html']
  ];

  const nav = document.getElementById('navbar');
  if (nav) {
    nav.innerHTML = `
      <a href="${root}index.html" class="nav-logo" aria-label="Affan Shaikh home">
        <div class="nav-photo-wrap">
          <img src="${root}Photo-2.jpg" alt="Affan Shaikh" class="nav-photo"/>
        </div>
        <div class="nav-logo-text-wrap">
          <img src="${root}Image/logo.png" class="nav-logo-text" alt="AFFAN SHAIKH">
        </div>
      </a>
      <button class="nav-burger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links">
        ${items.map(([label, href, match]) => `<li><a href="${href}" class="${file === match ? 'active' : ''}">${label}</a></li>`).join('')}
      </ul>
    `;
  }

  if (file !== 'index.html') {
    const loader = document.getElementById('loader');
    if (loader) loader.remove();
    document.body.classList.add('no-loader');
  }

  // ── HAMBURGER MENU TOGGLE ──────────────────────────────────
  (function setupMobileNav() {
    const burger = document.querySelector('.nav-burger');
    const navLinks = document.querySelector('.nav-links');
    if (!burger || !navLinks) return;

    function openMenu() {
      navLinks.classList.add('open', 'mobile-active');
      burger.setAttribute('aria-expanded', 'true');
      burger.classList.add('is-open');
    }
    function closeMenu() {
      navLinks.classList.remove('open', 'mobile-active');
      burger.setAttribute('aria-expanded', 'false');
      burger.classList.remove('is-open');
    }

    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    // Close when a link is tapped
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });

    // Close when tapping outside
    document.addEventListener('click', (e) => {
      if (!navLinks.classList.contains('open')) return;
      if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  })();

  // ── SCROLL-RESPONSIVE NAVBAR ───────────────────────────────
  (function setupScrollNav() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    let lastY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y > 80) {
            navbar.classList.add('nav-scrolled');
            if (y > lastY + 6) {
              navbar.classList.add('nav-hidden');
            } else if (y < lastY - 6) {
              navbar.classList.remove('nav-hidden');
            }
          } else {
            navbar.classList.remove('nav-scrolled', 'nav-hidden');
          }
          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  })();

  const transition = document.createElement('div');
  transition.className = 'page-transition';
  transition.innerHTML = '<span></span><i></i>';
  document.body.appendChild(transition);
  requestAnimationFrame(() => document.body.classList.add('page-ready'));

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || link.target || link.hasAttribute('download')) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

    event.preventDefault();
    document.body.classList.add('page-leaving');
    transition.classList.add('is-active');
    setTimeout(() => {
      window.location.href = url.href;
    }, 340);
  });
})();
