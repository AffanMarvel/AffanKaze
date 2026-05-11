const fs = require('fs');
const path = require('path');

const replacements = [
  { regex: /—/g, repl: '—' },
  { regex: /©/g, repl: '©' },
  { regex: /★/g, repl: '★' },
  { regex: /✕/g, repl: '✕' },
  { regex: /▶️/g, repl: '▶️' },
  { regex: /🎤/g, repl: '🎤' },
  { regex: /🏆/g, repl: '🏆' },
  { regex: /🎓/g, repl: '🎓' },
  { regex: /🎮/g, repl: '🎮' },
  { regex: /🌿/g, repl: '🌿' },
  { regex: /🛡️/g, repl: '🛡️' },
  { regex: /🏛️/g, repl: '🏛️' },
  { regex: /📶/g, repl: '📶' },
  { regex: /⭐/g, repl: '⭐' },
  { regex: /💎/g, repl: '💎' },
  { regex: /💼/g, repl: '💼' },
  { regex: /🏠/g, repl: '🏠' },
  { regex: /🌸/g, repl: '🌸' },
  { regex: /🌆/g, repl: '🌆' },
  { regex: /⛰️/g, repl: '⛰️' },
  { regex: /🕌/g, repl: '🕌' },
  { regex: /🏰/g, repl: '🏰' },
  { regex: /🌼/g, repl: '🌼' },
  { regex: /🏞️/g, repl: '🏞️' },
  { regex: /🌲/g, repl: '🌲' },
  { regex: /📍/g, repl: '📍' },
  { regex: /🌉/g, repl: '🌉' },
  { regex: /⚓/g, repl: '⚓' },
  { regex: /📚/g, repl: '📚' },
  { regex: /🍊/g, repl: '🍊' },
  { regex: /🌾/g, repl: '🌾' },
  { regex: /🚆/g, repl: '🚆' },
  { regex: /🔒/g, repl: '🔒' }
];

function fixFiles(dir) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!file.includes('archive') && !file.includes('assets') && !file.includes('scripts') && !file.includes('.git') && !file.includes('node_modules')) {
        fixFiles(filePath);
      }
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let newContent = content;
      for (const rule of replacements) {
        newContent = newContent.replace(rule.regex, rule.repl);
      }
      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log('Fixed text in', filePath);
      }
    }
  }
}

fixFiles(__dirname);
