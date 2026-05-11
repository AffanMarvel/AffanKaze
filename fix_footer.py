import os
import re

footer_index = """<footer class="stark-footer">
  <div class="sf-contact-bar">
    <div class="sf-cb-left">
      <span class="sf-status-dot"></span>
      <span class="sf-status-text">OPEN FOR FREELANCE WORK</span>
    </div>
    <div class="sf-cb-center">
      <span class="sf-email">Via WhatsApp · Instagram DM · X</span>
    </div>
    <div class="sf-cb-right">
      <a href="pages/contact.html" class="sf-hire-btn">HIRE ME</a>
    </div>
  </div>

  <div class="sf-divider"></div>

  <div class="sf-grid">
    <!-- COLUMN 1 — Brand -->
    <div class="sf-col sf-brand">
      <h3 class="sf-brand-name">AFFAN SHAIKH</h3>
      <p class="sf-brand-tag">Content that hits. Visuals that convert. Between direction and technology lies the space where I create.</p>
      <div class="sf-socials">
        <a href="https://instagram.com/AffanKaze" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="https://youtube.com/@AffanMarvel" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        <a href="https://linkedin.com/in/affanshaikh" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://x.com/AffanMarvel" target="_blank" aria-label="X (Twitter)"><i class="fab fa-twitter"></i></a>
        <a href="https://reddit.com/user/AffanMarvel" target="_blank" aria-label="Reddit"><i class="fab fa-reddit-alien"></i></a>
      </div>
    </div>

    <!-- COLUMN 2 — Quick Links -->
    <div class="sf-col sf-links">
      <h4 class="sf-col-title">QUICK LINKS</h4>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="pages/affan-marvel.html">Marvel</a></li>
        <li><a href="pages/media.html">Media</a></li>
        <li><a href="pages/projects.html">Projects</a></li>
        <li><a href="pages/services.html">Services</a></li>
        <li><a href="pages/contact.html">Contact</a></li>
      </ul>
    </div>

    <!-- COLUMN 3 — Projects -->
    <div class="sf-col sf-projects">
      <h4 class="sf-col-title">PROJECTS</h4>
      <ul>
        <li><a href="https://affanmarvel.in" target="_blank">AffanMarvel.in</a></li>
        <li><a href="#">Gym Training App</a></li>
        <li><a href="#">AI Automation Suite</a></li>
        <li><a href="#">Business Developer</a></li>
        <li><a href="#">Media Director</a></li>
        <li><a href="#">Anivel Culture</a></li>
      </ul>
    </div>

    <!-- COLUMN 4 — Services -->
    <div class="sf-col sf-services">
      <h4 class="sf-col-title">SERVICES</h4>
      <ul>
        <li><a href="pages/services.html">Logo &amp; Branding</a></li>
        <li><a href="pages/services.html">Growth Strategy</a></li>
        <li><a href="pages/services.html">Direction &amp; Content</a></li>
        <li><a href="pages/services.html">Video &amp; Photo Editing</a></li>
        <li><a href="pages/services.html">Web Development</a></li>
        <li><a href="pages/services.html">Social Media Mgmt</a></li>
      </ul>
    </div>
  </div>

  <div class="sf-bottom">
    <p>© 2026 Affan Shaikh · All Rights Reserved</p>
  </div>
</footer>"""

footer_pages = """<footer class="stark-footer">
  <div class="sf-contact-bar">
    <div class="sf-cb-left">
      <span class="sf-status-dot"></span>
      <span class="sf-status-text">OPEN FOR FREELANCE WORK</span>
    </div>
    <div class="sf-cb-center">
      <span class="sf-email">Via WhatsApp · Instagram DM · X</span>
    </div>
    <div class="sf-cb-right">
      <a href="contact.html" class="sf-hire-btn">HIRE ME</a>
    </div>
  </div>

  <div class="sf-divider"></div>

  <div class="sf-grid">
    <!-- COLUMN 1 — Brand -->
    <div class="sf-col sf-brand">
      <h3 class="sf-brand-name">AFFAN SHAIKH</h3>
      <p class="sf-brand-tag">Content that hits. Visuals that convert. Between direction and technology lies the space where I create.</p>
      <div class="sf-socials">
        <a href="https://instagram.com/AffanKaze" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="https://youtube.com/@AffanMarvel" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        <a href="https://linkedin.com/in/affanshaikh" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://x.com/AffanMarvel" target="_blank" aria-label="X (Twitter)"><i class="fab fa-twitter"></i></a>
        <a href="https://reddit.com/user/AffanMarvel" target="_blank" aria-label="Reddit"><i class="fab fa-reddit-alien"></i></a>
      </div>
    </div>

    <!-- COLUMN 2 — Quick Links -->
    <div class="sf-col sf-links">
      <h4 class="sf-col-title">QUICK LINKS</h4>
      <ul>
        <li><a href="../index.html">Home</a></li>
        <li><a href="affan-marvel.html">Marvel</a></li>
        <li><a href="media.html">Media</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>

    <!-- COLUMN 3 — Projects -->
    <div class="sf-col sf-projects">
      <h4 class="sf-col-title">PROJECTS</h4>
      <ul>
        <li><a href="https://affanmarvel.in" target="_blank">AffanMarvel.in</a></li>
        <li><a href="#">Gym Training App</a></li>
        <li><a href="#">AI Automation Suite</a></li>
        <li><a href="#">Business Developer</a></li>
        <li><a href="#">Media Director</a></li>
        <li><a href="#">Anivel Culture</a></li>
      </ul>
    </div>

    <!-- COLUMN 4 — Services -->
    <div class="sf-col sf-services">
      <h4 class="sf-col-title">SERVICES</h4>
      <ul>
        <li><a href="services.html">Logo &amp; Branding</a></li>
        <li><a href="services.html">Growth Strategy</a></li>
        <li><a href="services.html">Direction &amp; Content</a></li>
        <li><a href="services.html">Video &amp; Photo Editing</a></li>
        <li><a href="services.html">Web Development</a></li>
        <li><a href="services.html">Social Media Mgmt</a></li>
      </ul>
    </div>
  </div>

  <div class="sf-bottom">
    <p>© 2026 Affan Shaikh · All Rights Reserved</p>
  </div>
</footer>"""

files_to_process = ['index.html']
pages_dir = 'pages'
if os.path.exists(pages_dir):
    for f in os.listdir(pages_dir):
        if f.endswith('.html'):
            files_to_process.append(os.path.join(pages_dir, f))

fa_cdn = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">'

for filepath in files_to_process:
    if not os.path.exists(filepath):
        continue
    
    is_index = filepath == 'index.html'
    new_footer = footer_index if is_index else footer_pages
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Replace footer
    pattern = re.compile(r'<footer.*?>.*?</footer>', re.DOTALL | re.IGNORECASE)
    if pattern.search(content):
        content = pattern.sub(new_footer, content)
    else:
        # Append before </body> if footer not found
        content = content.replace('</body>', f'{new_footer}\n</body>')
        
    # 2. Add FontAwesome if missing
    if 'font-awesome' not in content:
        content = content.replace('</head>', f'  {fa_cdn}\n</head>')
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated footer in {filepath}")
