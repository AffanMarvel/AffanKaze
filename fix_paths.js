const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const replacements = [
    { regex: /(\.\.\/)?Photo-2\.jpg/g, repl: '$1assets/images/Photo-2.jpg' },
    { regex: /(\.\.\/)?Photo-1\.png/g, repl: '$1assets/images/Photo-1.png' },
    { regex: /(\.\.\/)?Image\//g, repl: '$1assets/images/' },
    { regex: /affanmarvel-screenshot\.png/g, repl: '../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/affanmarvel-screenshot.png' },
    { regex: /header-mobile-preview\.png/g, repl: '../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/header-mobile-preview.png' },
    { regex: /header-preview\.png/g, repl: '../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/header-preview.png' },
    { regex: /home-header\.png/g, repl: '../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/home-header.png' },
    { regex: /loader-preview\.png/g, repl: '../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/loader-preview.png' },
    { regex: /projects-header\.png/g, repl: '../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/projects-header.png' }
];

function walk(dir) {
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (!file.includes('archive') && !file.includes('scripts') && !file.includes('assets') && !file.includes('.git') && !file.includes('node_modules')) {
                walk(filePath);
            }
        } else {
            if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
                let content = fs.readFileSync(filePath, 'utf8');
                let newContent = content;
                for (const rule of replacements) {
                    newContent = newContent.replace(rule.regex, rule.repl);
                }
                
                // Specific fix for index.html which doesn't have ../ for the other root images
                if (file === 'index.html') {
                    newContent = newContent.replace(/"header-mobile-preview\.png"/g, '"assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/header-mobile-preview.png"');
                    newContent = newContent.replace(/"header-preview\.png"/g, '"assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/header-preview.png"');
                    newContent = newContent.replace(/"home-header\.png"/g, '"assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/home-header.png"');
                    newContent = newContent.replace(/"loader-preview\.png"/g, '"assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/loader-preview.png"');
                    newContent = newContent.replace(/"projects-header\.png"/g, '"assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/../assets/images/projects-header.png"');
                }

                if (content !== newContent) {
                    fs.writeFileSync(filePath, newContent, 'utf8');
                    console.log(`Updated ${filePath}`);
                }
            }
        }
    }
}

walk(rootDir);
