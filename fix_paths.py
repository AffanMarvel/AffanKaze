import os
import re

root_dir = r"g:\Projects\Affan-V1"

replacements = {
    r'(\.\./)?Photo-2\.jpg': r'\g<1>assets/images/Photo-2.jpg',
    r'(\.\./)?Photo-1\.png': r'\g<1>assets/images/Photo-1.png',
    r'(\.\./)?Image/': r'\g<1>assets/images/',
    r'affanmarvel-screenshot\.png': r'../assets/images/affanmarvel-screenshot.png'
}

for root, dirs, files in os.walk(root_dir):
    if "archive" in root or "scripts" in root or ".git" in root or "assets" in root:
        continue
    for file in files:
        if file.endswith(".html") or file.endswith(".js") or file.endswith(".css"):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for pattern, repl in replacements.items():
                new_content = re.sub(pattern, repl, new_content)
            
            if content != new_content:
                print(f"Updated {file_path}")
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
