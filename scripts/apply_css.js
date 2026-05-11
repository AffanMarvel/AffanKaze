const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf-8');

// Replace .orb-gold
const oldOrb = `.orb-gold {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%);
  top: -200px; right: -100px;
  animation: orbDrift 12s ease-in-out infinite;
}`;
const newOrb = `.orb-gold {
  width: 8px; height: 8px;
  background: #00f0ff;
  border-radius: 50%;
  top: 30%; left: 40px; right: auto;
  opacity: 0.3;
  box-shadow: 0 0 10px #00f0ff, 0 0 20px #00f0ff;
  animation: radarPing 3s ease-out infinite;
}
@keyframes radarPing {
  0% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(3.5); opacity: 0; }
  100% { transform: scale(1); opacity: 0; }
}`;
css = css.replace(oldOrb, newOrb);

// Replace #navbar
const oldNavbar = `#navbar {
  position: absolute;
  top: 0;
  left: clamp(14px, 3vw, 42px);
  right: clamp(14px, 3vw, 42px);
  height: 76px;
  z-index: 9990;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(18px, 3vw, 44px);
  padding: 0 18px;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border: none;
  border-radius: 0;
  box-shadow: none;
  overflow: visible;
  animation: navFloatIn 0.9s ease both;
}`;
const newNavbar = `#navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 76px;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 240, 255, 0.15);
  padding: 12px 24px;
  display: grid;
  grid-template-columns: 280px 1fr auto;
  align-items: center;
  box-sizing: border-box;
  animation: navFloatIn 0.9s ease both;
}`;
css = css.replace(oldNavbar, newNavbar);

// Replace .nav-logo
const oldNavLogo = `.nav-logo {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  opacity: 0;
  animation: holoBoot 1s ease-out forwards, navLogoGlow 5.8s ease-in-out 1.1s infinite;
  position: relative;
  z-index: 2;
  flex: 0 0 auto;
  min-width: 260px;
  max-width: 330px;
  transition: transform 0.28s ease, filter 0.28s ease;
}`;
const newNavLogo = `.nav-logo {
  grid-column: 1;
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  opacity: 0;
  animation: holoBoot 1s ease-out forwards, navLogoGlow 5.8s ease-in-out 1.1s infinite;
  position: relative;
  z-index: 2;
  flex: 0 0 auto;
  min-width: 260px;
  max-width: 330px;
  transition: transform 0.28s ease, filter 0.28s ease;
}`;
css = css.replace(oldNavLogo, newNavLogo);

// Replace .nav-links
const oldNavLinks = `.nav-links {
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: center;
  gap: clamp(4px, 0.6vw, 10px);
  position: relative;
  left: auto;
  top: auto;
  transform: none;
  width: auto;
  max-width: none;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  border: none;
  background: none;
  clip-path: none;
  z-index: 2;
  isolation: isolate;
}`;
const newNavLinks = `.nav-links {
  grid-column: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  list-style: none;
  margin: 0;
  padding: 0;
}`;
css = css.replace(oldNavLinks, newNavLinks);

// Replace .nav-links a
const oldNavLinksA = `.nav-links a {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  text-decoration: none;
  font-family: var(--font-primary), sans-serif;
  font-size: clamp(0.6rem, 0.62vw, 0.74rem);
  font-weight: 700;
  letter-spacing: 1.1px;
  color: rgba(255,255,255,0.76);
  text-transform: uppercase;
  padding: 7px 8px 9px;
  position: relative;
  transition: color 0.24s ease, text-shadow 0.24s ease, transform 0.24s ease;
  overflow: visible;
  border-radius: 4px;
}`;
const newNavLinksA = `.nav-links a {
  font-family: var(--font-mono, monospace);
  font-size: 11.5px;
  color: #aaaaaa;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  padding: 5px 0;
}`;
css = css.replace(oldNavLinksA, newNavLinksA);

// Remove the massive block of hover/active logic from old CSS and replace it
const hoverBlockStart = '/* Base pseudo — used for the animated bottom underline on hover/active */';
const hoverBlockEnd = '/* Active dot indicator above link */\r\n.nav-links a.active {\r\n  color: var(--arc);\r\n  text-shadow: 0 0 14px rgba(0,207,255,0.8), 0 0 28px rgba(0,207,255,0.3);\r\n}';
const hoverBlockEndAlt = '/* Active dot indicator above link */\n.nav-links a.active {\n  color: var(--arc);\n  text-shadow: 0 0 14px rgba(0,207,255,0.8), 0 0 28px rgba(0,207,255,0.3);\n}';

let hoverBlockIndex1 = css.indexOf(hoverBlockStart);
let hoverBlockIndex2 = css.indexOf(hoverBlockEnd);
if (hoverBlockIndex2 === -1) {
  hoverBlockIndex2 = css.indexOf(hoverBlockEndAlt);
  if (hoverBlockIndex2 !== -1) hoverBlockIndex2 += hoverBlockEndAlt.length;
} else {
  hoverBlockIndex2 += hoverBlockEnd.length;
}

if (hoverBlockIndex1 !== -1 && hoverBlockIndex2 !== -1) {
  const newHoverBlock = `/* Hover & Active Effects */
.nav-links a:hover {
  color: #00f0ff;
  text-shadow: 0 0 8px rgba(0, 240, 255, 0.4);
}
.nav-links a.active {
  color: #f5c518;
  text-shadow: 0 0 8px rgba(245, 197, 24, 0.4);
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 1px;
  background: #00f0ff;
  box-shadow: 0 0 8px #00f0ff;
  transition: width 0.3s ease;
}
.nav-links a:hover::after {
  width: 100%;
}
.nav-links a.active::after {
  width: 100%;
  background: #f5c518;
  box-shadow: 0 0 8px #f5c518;
}`;
  css = css.substring(0, hoverBlockIndex1) + newHoverBlock + css.substring(hoverBlockIndex2);
}

// Replace .nav-burger
const oldBurger = `.nav-burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  z-index: 1;
}
.nav-burger span {
  display: block; width: 22px; height: 1.5px;
  background: var(--gold);
  transition: var(--t3);
  box-shadow: 0 0 4px var(--gold-glow);
}`;
const newBurger = `.nav-burger {
  grid-column: 3;
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  z-index: 9999;
}
.nav-burger span {
  display: block; width: 24px; height: 2px;
  background: #00f0ff;
  transition: all 0.3s ease;
}`;
css = css.replace(oldBurger, newBurger);

// Append mobile CSS
const mobileCss = `
/* ============================================================
   MOBILE RESPONSIVE (< 1024px)
   ============================================================ */
@media (max-width: 1024px) {
  #navbar {
    grid-template-columns: 280px 1fr;
    justify-content: space-between;
  }
  .nav-links {
    display: none;
    position: fixed;
    top: 76px;
    right: 0;
    width: 250px;
    height: calc(100vh - 76px);
    background: #0d0d0d;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px 0;
    gap: 0;
    border-left: 1px solid rgba(0, 240, 255, 0.15);
    box-shadow: -5px 0 20px rgba(0,0,0,0.8);
  }
  .nav-links.mobile-active {
    display: flex;
  }
  .nav-links li {
    width: 100%;
    opacity: 1;
    animation: none;
  }
  .nav-links a {
    display: block;
    width: 100%;
    padding: 16px 24px;
    font-size: 13px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .nav-links a:hover {
    background: rgba(0, 240, 255, 0.05);
  }
  .nav-burger {
    display: flex;
  }
}
`;
if (!css.includes('MOBILE RESPONSIVE (< 1024px)')) {
  css += mobileCss;
}

fs.writeFileSync('css/style.css', css, 'utf-8');
console.log('CSS updated successfully');
