import os
import re

base_nav_index = """<ul class="nav-links">
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
</ul>"""

base_nav_pages = """<ul class="nav-links">
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
</ul>"""

def get_nav(is_index, active_key):
    keys = ['home_active', 'marvel_active', 'media_active', 'projects_active', 'services_active', 'how_active', 'achievements_active', 'experience_active', 'hobbies_active', 'travel_active', 'reviews_active', 'contact_active']
    kwargs = {k: '' for k in keys}
    if active_key in kwargs:
        kwargs[active_key] = ' class="active"'
        
    if is_index:
        return base_nav_index.format(**kwargs)
    else:
        return base_nav_pages.format(**kwargs)

file_to_key = {
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
}

files_to_process = ['index.html']
pages_dir = 'pages'
if os.path.exists(pages_dir):
    for f in os.listdir(pages_dir):
        if f.endswith('.html'):
            files_to_process.append(os.path.join(pages_dir, f))

for filepath in files_to_process:
    if not os.path.exists(filepath):
        continue
    
    filename = os.path.basename(filepath)
    active_key = file_to_key.get(filename, '')
    is_index = (filename == 'index.html')
    
    new_nav = get_nav(is_index, active_key)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex to find <ul class="nav-links">...</ul>
    pattern = re.compile(r'<ul\s+class="nav-links"\s*>.*?</ul>', re.DOTALL)
    
    # Check if the file has it
    if pattern.search(content):
        new_content = pattern.sub(new_nav, content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"Could not find nav-links in {filepath}")
