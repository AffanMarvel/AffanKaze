const fs = require('fs');
const path = require('path');

const baseNavIndex = `<nav id="navbar">
  <div class="nav-edge nav-edge-left"></div>
  <a href="index.html" class="nav-logo">
    <div class="nav-photo-wrap">
      <img src="Photo-2.jpg" alt="Affan Shaikh" class="nav-photo"/>
    </div>
    <div class="nav-logo-text-wrap">
      <span class="nav-logo-text">AFFAN SHAIKH</span>
      <span class="nav-sys-status">SYS.ONLINE // V3.0</span>
    </div>
  </a>
  <button class="nav-burger" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
<ul class="nav-links">
  <li><a href="index.html"{home_active}>Home</a></li>
  <li><a href="pages/affan-marvel.html"{marvel_active}>Marvel</a></li>
  <li><a href="pages/media.html"{media_active}>Media</a></li>
  <li><a href="pages/projects.html"{projects_active}>Projects</a></li>
  <li><a href="pages/services.html"{services_active}>Services</a></li>
  <li><a href="pages/how-i-work.html"{how_active}>How I Work</a></li>
  <li><a href="pages/achievements.html"{achievements_active}>Achievements</a></li>
  <li><a href="pages/experience.html"{experience_active}>Experience</a></li>
  <li><a href="pages/hobbies.html"{hobbies_active}>Hobbies</a></li>
  <li><a href="pages/travel.html"{travel_active}>Travel</a></li>
  <li><a href="pages/contact.html"{contact_active}>Contact</a></li>
</ul>
  <div class="nav-edge nav-edge-right"></div>
</nav>`;

const baseNavPages = `<nav id="navbar">
  <div class="nav-edge nav-edge-left"></div>
  <a href="../index.html" class="nav-logo">
    <div class="nav-photo-wrap">
      <img src="../Photo-2.jpg" alt="Affan Shaikh" class="nav-photo"/>
    </div>
    <div class="nav-logo-text-wrap">
      <span class="nav-logo-text">AFFAN SHAIKH</span>
      <span class="nav-sys-status">SYS.ONLINE // V3.0</span>
    </div>
  </a>
  <button class="nav-burger" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
<ul class="nav-links">
  <li><a href="../index.html"{home_active}>Home</a></li>
  <li><a href="affan-marvel.html"{marvel_active}>Marvel</a></li>
  <li><a href="media.html"{media_active}>Media</a></li>
  <li><a href="projects.html"{projects_active}>Projects</a></li>
  <li><a href="services.html"{services_active}>Services</a></li>
  <li><a href="how-i-work.html"{how_active}>How I Work</a></li>
  <li><a href="achievements.html"{achievements_active}>Achievements</a></li>
  <li><a href="experience.html"{experience_active}>Experience</a></li>
  <li><a href="hobbies.html"{hobbies_active}>Hobbies</a></li>
  <li><a href="travel.html"{travel_active}>Travel</a></li>
  <li><a href="contact.html"{contact_active}>Contact</a></li>
</ul>
  <div class="nav-edge nav-edge-right"></div>
</nav>`;

function getNav(isIndex, activeKey) {
    const keys = ['home_active', 'marvel_active', 'media_active', 'projects_active', 'services_active', 'how_active', 'achievements_active', 'experience_active', 'hobbies_active', 'travel_active', 'reviews_active', 'contact_active'];
    let template = isIndex ? baseNavIndex : baseNavPages;
    keys.forEach(k => {
        const val = (k === activeKey) ? ' class="active"' : '';
        template = template.replace(`{${k}}`, val);
    });
    return template;
}

const fileToKey = {
    'index.html': 'home_active',
    'affan-marvel.html': 'marvel_active',
    'media.html': 'media_active',
    'projects.html': 'projects_active',
    'services.html': 'services_active',
    'how-i-work.html': 'how_active',
    'achievements.html': 'achievements_active',
    'experience.html': 'experience_active',
    'hobbies.html': 'hobbies_active',
    'travel.html': 'travel_active',
    'testimonials.html': 'reviews_active',
    'contact.html': 'contact_active'
};

const filesToProcess = ['index.html'];
const pagesDir = 'pages';
if (fs.existsSync(pagesDir)) {
    fs.readdirSync(pagesDir).forEach(f => {
        if (f.endsWith('.html')) {
            filesToProcess.push(path.join(pagesDir, f));
        }
    });
}

filesToProcess.forEach(filepath => {
    if (!fs.existsSync(filepath)) return;
    
    const filename = path.basename(filepath);
    const activeKey = fileToKey[filename] || '';
    const isIndex = (filename === 'index.html');
    
    const newNav = getNav(isIndex, activeKey);
    
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Regex to find <nav id="navbar">...</nav>
    const pattern = /<nav\s+id="navbar"\s*>[\s\S]*?<\/nav>/;
    
    if (pattern.test(content)) {
        content = content.replace(pattern, newNav);
        fs.writeFileSync(filepath, content);
        console.log(`Updated ${filepath}`);
    } else {
        console.log(`Could not find navbar in ${filepath}`);
    }
});
