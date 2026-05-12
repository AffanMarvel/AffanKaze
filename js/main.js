/* ============================================================
   AFFAN SHAIKH — STARK TECH v3.0
   Main JavaScript — Canvas BG, Cursor, Effects, 3D Tilt
   ============================================================ */

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) { l.classList.add('out'); setTimeout(() => l.remove(), 700); }
  }, 2000);
});

// ===== CANVAS BACKGROUND =====
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [];
  const mouse = { x: -9999, y: -9999 };
  const GOLD = '#d4a843', ARC = '#00cfff';
  const COLORS = [GOLD, ARC, ARC, GOLD, ARC];
  // Pre-parsed RGB values to avoid per-frame string parsing
  const COLORS_RGB = [
    [212,168,67], [0,207,255], [0,207,255], [212,168,67], [0,207,255]
  ];
  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  // ── Offscreen hex grid: drawn ONCE, reused every frame ──
  let hexCanvas = null;
  function buildHexGrid() {
    hexCanvas = document.createElement('canvas');
    hexCanvas.width = W; hexCanvas.height = H;
    const hx = hexCanvas.getContext('2d');
    hx.strokeStyle = 'rgba(212,168,67,0.028)';
    hx.lineWidth = 0.5;
    const s = 60; // larger cells = fewer hexagons
    const h = s * Math.sqrt(3);
    for (let row = 0; row < H / h + 2; row++) {
      for (let col = 0; col < W / (s * 1.5) + 2; col++) {
        const x = col * s * 1.5;
        const y = row * h + (col % 2 ? h / 2 : 0);
        hx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const px = x + s * 0.95 * Math.cos(angle);
          const py = y + s * 0.95 * Math.sin(angle);
          i === 0 ? hx.moveTo(px, py) : hx.lineTo(px, py);
        }
        hx.closePath();
        hx.stroke();
      }
    }
  }

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildHexGrid(); // rebuild offscreen on resize
  }
  resize();
  window.addEventListener('resize', resize);

  if (!isTouchDevice) {
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX; mouse.y = e.clientY;
    }, { passive: true });
  }

  function createNodes() {
    nodes = [];
    // Fewer nodes: 1 per 22000px² instead of 16000px²
    const count = Math.min(Math.floor((W * H) / 22000), 80);
    for (let i = 0; i < count; i++) {
      const ci = Math.floor(Math.random() * COLORS.length);
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.4,
        ci,                               // color index
        opacity: Math.random() * 0.45 + 0.15
      });
    }
  }
  createNodes();
  window.addEventListener('resize', createNodes);

  // Pre-build ambient gradient once (static center)
  let ambGrad = null;
  function buildAmbGrad() {
    ambGrad = ctx.createRadialGradient(W/2, H*0.4, 0, W/2, H*0.4, Math.max(W,H)*0.8);
    ambGrad.addColorStop(0,   'rgba(0,207,255,0.03)');
    ambGrad.addColorStop(0.4, 'rgba(212,168,67,0.018)');
    ambGrad.addColorStop(0.8, 'rgba(192,57,43,0.008)');
    ambGrad.addColorStop(1,   'transparent');
  }
  buildAmbGrad();
  window.addEventListener('resize', buildAmbGrad);

  const CONNECT_DIST = 110;  // tighter = fewer O(n²) pairs drawn
  const MOUSE_DIST   = 180;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Ambient gradient (static, reused)
    ctx.fillStyle = ambGrad;
    ctx.fillRect(0, 0, W, H);

    // Hex grid from offscreen canvas — zero path recalculation
    if (hexCanvas) ctx.drawImage(hexCanvas, 0, 0);

    // Connections between nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist2 = dx*dx + dy*dy;
        if (dist2 < CONNECT_DIST * CONNECT_DIST) {
          const alpha = (1 - Math.sqrt(dist2) / CONNECT_DIST) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(212,168,67,${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.4;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
      // Mouse connection lines
      const mdx = nodes[i].x - mouse.x;
      const mdy = nodes[i].y - mouse.y;
      const md2 = mdx*mdx + mdy*mdy;
      if (md2 < MOUSE_DIST * MOUSE_DIST) {
        const alpha = (1 - Math.sqrt(md2) / MOUSE_DIST) * 0.4;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,207,255,${alpha.toFixed(3)})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    // Draw nodes — NO shadowBlur (most expensive Canvas2D op)
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const [r, g, b] = COLORS_RGB[n.ci];
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${n.opacity})`;
      ctx.fill();

      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }

    // Mouse glow (only when mouse is on screen)
    if (mouse.x > 0 && mouse.y > 0) {
      const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
      mg.addColorStop(0, 'rgba(0,207,255,0.035)');
      mg.addColorStop(0.5, 'rgba(212,168,67,0.015)');
      mg.addColorStop(1, 'transparent');
      ctx.fillStyle = mg;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }
  draw();
})();


// ===== CUSTOM CURSOR =====
const _isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
const crossH = document.getElementById('cursor-cross-h');
const crossV = document.getElementById('cursor-cross-v');
let mx = 0, my = 0, rx = 0, ry = 0;
let isHovering = false;

if (!_isTouchDevice) {
  // Half-sizes to center elements on the cursor point
  // Dot: 8px default → half = 4px | Ring: 36px default → half = 18px
  const DOT_HALF = 4;
  const RING_HALF = 18;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    // Dot & crosshairs update DIRECTLY in the event — zero-latency, no rAF delay
    if (dot)    dot.style.transform    = `translate(${mx - DOT_HALF}px, ${my - DOT_HALF}px)`;
    if (crossH) crossH.style.transform = `translateY(${my}px)`;
    if (crossV) crossV.style.transform = `translateX(${mx}px)`;
  }, { passive: true });

  // Ring only gets a smooth lerp trail via rAF (intentional trailing effect)
  function animCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    if (ring) ring.style.transform = `translate(${rx - RING_HALF}px, ${ry - RING_HALF}px)`;
    requestAnimationFrame(animCursor);
  }
  animCursor();

  document.querySelectorAll('a,button,.panel,.tilt,.hstat,.btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      isHovering = true;
      if (dot)  { dot.style.width='20px';  dot.style.height='20px';  dot.style.background='var(--arc)';  dot.style.boxShadow='0 0 20px var(--arc), 0 0 40px rgba(0,207,255,0.5)'; }
      if (ring) { ring.style.width='56px'; ring.style.height='56px'; ring.style.borderColor='rgba(0,207,255,0.8)'; ring.style.opacity='1'; }
    });
    el.addEventListener('mouseleave', () => {
      isHovering = false;
      if (dot)  { dot.style.width='8px';   dot.style.height='8px';   dot.style.background='var(--gold)'; dot.style.boxShadow='0 0 12px var(--gold), 0 0 24px var(--gold-glow)'; }
      if (ring) { ring.style.width='36px'; ring.style.height='36px'; ring.style.borderColor='rgba(212,168,67,0.6)'; ring.style.opacity='0.7'; }
    });
  });
}

// ===== SCROLL PROGRESS =====
let _scrollProgressRafPending = false;
window.addEventListener('scroll', () => {
  if (!_scrollProgressRafPending) {
    _scrollProgressRafPending = true;
    requestAnimationFrame(() => {
      const bar = document.getElementById('scroll-bar');
      if (bar) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transformOrigin = 'left';
        bar.style.transform = `scaleX(${window.scrollY / total})`;
      }
      _scrollProgressRafPending = false;
    });
  }
});

// ===== NAVBAR =====
(function () {
  const header = document.querySelector('#navbar');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 8) {
      header.classList.remove('nav-hidden');
      header.classList.remove('nav-scrolled');
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down — hide
      header.classList.add('nav-hidden');
    } else {
      // Scrolling up — show with scrolled style
      header.classList.remove('nav-hidden');
      header.classList.add('nav-scrolled');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
})();

// Active nav link
const pg = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === pg || (pg === '' && a.getAttribute('href') === 'index.html')) {
    a.classList.add('active');
  }
});

// Mobile nav toggle
const burger = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    const open = navLinks.classList.contains('open');
    spans[0].style.transform = open ? 'rotate(45deg) translate(4px,4px)' : '';
    spans[1].style.opacity = open ? '0' : '1';
    spans[2].style.transform = open ? 'rotate(-45deg) translate(4px,-4px)' : '';
  });
}

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ===== ENHANCED 3D TILT with Dynamic Shadow =====
document.querySelectorAll('.tilt').forEach(card => {
  let animId;

  card.addEventListener('mousemove', e => {
    cancelAnimationFrame(animId);
    animId = requestAnimationFrame(() => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2)  / (r.width/2);
      const y = (e.clientY - r.top  - r.height/2) / (r.height/2);
      const rotX = -y * 10;
      const rotY =  x * 10;
      const shadowX = x * 20;
      const shadowY = y * 20;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px)`;
      card.style.boxShadow = `
        ${shadowX}px ${shadowY + 30}px 80px rgba(0,0,0,0.9),
        ${shadowX * 0.5}px ${shadowY * 0.5 + 10}px 40px rgba(0,0,0,0.6),
        0 0 40px rgba(212,168,67,0.12),
        0 0 80px rgba(0,207,255,0.06),
        inset 0 1px 0 rgba(212,168,67,0.06)
      `;
    });
  });

  card.addEventListener('mouseleave', () => {
    cancelAnimationFrame(animId);
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    card.style.boxShadow = '';
  });
});

// ===== COUNTER =====
const cObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const dur = 2000;
    const start = performance.now();
    const step = now => {
      const t = Math.min((now-start)/dur,1);
      const ease = 1 - Math.pow(1-t, 3);
      el.textContent = Math.floor(ease*target) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    cObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => cObs.observe(el));

// ===== PARALLAX (mouse) — rAF-throttled, disabled on touch =====
if (!_isTouchDevice) {
  const _depthEls = Array.from(document.querySelectorAll('[data-depth]'));
  let _parallaxRafPending = false;
  let _parMx = 0, _parMy = 0;

  document.addEventListener('mousemove', e => {
    _parMx = e.clientX;
    _parMy = e.clientY;
    if (!_parallaxRafPending) {
      _parallaxRafPending = true;
      requestAnimationFrame(() => {
        const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        const dx = (_parMx - cx) / cx, dy = (_parMy - cy) / cy;
        _depthEls.forEach(el => {
          const d = parseFloat(el.dataset.depth) || 0.05;
          el.style.transform = `translate(${dx * d * 50}px, ${dy * d * 50}px)`;
        });
        _parallaxRafPending = false;
      });
    }
  }, { passive: true });
}

// ===== TYPING =====
window.typeText = function(el, texts, speed = 90, pause = 3000) {
  if (!el) return;
  let ti = 0, ci = 0, del = false;
  el.style.borderRight = '2px solid var(--arc)';

  function tick() {
    if (!del) {
      el.textContent = texts[ti].slice(0, ++ci);
      if (ci >= texts[ti].length) {
        del = true;
        setTimeout(tick, pause);
        return;
      }
    } else {
      el.textContent = texts[ti].slice(0, --ci);
      if (ci <= 0) {
        del = false;
        ti = (ti+1) % texts.length;
      }
    }
    // Typing = full speed, deleting = 70% of typing speed (feels natural)
    setTimeout(tick, del ? Math.round(speed * 0.7) : speed);
  }
  tick();
};

// ===== SECTION HEADER SCROLL PARALLAX — rAF-throttled =====
(function () {
  const _shTitles = Array.from(document.querySelectorAll('.sh-title'));
  let _scrollRafPending = false;
  window.addEventListener('scroll', () => {
    if (!_scrollRafPending) {
      _scrollRafPending = true;
      requestAnimationFrame(() => {
        // Phase 1: Batch all DOM reads (getBoundingClientRect)
        const activeEls = [];
        _shTitles.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            activeEls.push({ el, rect });
          }
        });
        
        // Phase 2: Batch all DOM writes (style.textShadow) with Caching
        activeEls.forEach(({ el, rect }) => {
          let depth = (window.innerHeight / 2 - rect.top) * 0.015;
          depth = Math.round(depth); // Round to nearest 1px to drastically reduce text-shadow repaints
          
          if (el.dataset.lastDepth !== String(depth)) {
            el.dataset.lastDepth = depth;
            el.style.textShadow = `0 ${depth}px ${depth * 3}px rgba(212,168,67,0.3), 0 0 40px rgba(212,168,67,0.1)`;
          }
        });
        
        _scrollRafPending = false;
      });
    }
  }, { passive: true });
})();

// ===== PANEL MOUSE-GLOW FOLLOW — rAF-throttled, desktop only =====
if (!_isTouchDevice) {
  document.querySelectorAll('.panel').forEach(panel => {
    let _panelRafPending = false;
    panel.addEventListener('mousemove', e => {
      if (!_panelRafPending) {
        _panelRafPending = true;
        requestAnimationFrame(() => {
          const r = panel.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          panel.style.background = `radial-gradient(circle 120px at ${x}px ${y}px, rgba(212,168,67,0.07), rgba(7,12,24,0.55) 60%)`;
          _panelRafPending = false;
        });
      }
    }, { passive: true });
    panel.addEventListener('mouseleave', () => {
      panel.style.background = '';
    });
  });
}

// ===== SPLASH CURSOR EFFECT =====
/* Fluid Cursor Plugin 
   Author: R H A Ashan Imalka (scxr-dev)
   Version: 3.1.0
   License: Dual License (Free for Non-Commercial, Paid for Commercial)
   
   Usage:
   1. Link this file: <script src="fluid-cursor.js"></script>
   2. Initialize: <script>new FluidCursor();</script>
*/

class FluidCursor {
    constructor(options = {}) {
        this.canvas = null;
        this.gl = null;
        this.ext = null;
        this.pointers = [];
        this.splatStack = [];
        
        // Bind methods
        this.updateFrame = this.updateFrame.bind(this);
        this.init = this.init.bind(this);

        this.config = {
            SIM_RESOLUTION: options.SIM_RESOLUTION || 128,
            DYE_RESOLUTION: options.DYE_RESOLUTION || 512,
            CAPTURE_RESOLUTION: options.CAPTURE_RESOLUTION || 256,
            DENSITY_DISSIPATION: options.DENSITY_DISSIPATION || 8.5,
            VELOCITY_DISSIPATION: options.VELOCITY_DISSIPATION || 5.5,
            PRESSURE: options.PRESSURE || 0.75,
            PRESSURE_ITERATIONS: options.PRESSURE_ITERATIONS || 10,
            CURL: options.CURL || 37,
            SPLAT_RADIUS: options.SPLAT_RADIUS || 0.25,
            SPLAT_FORCE: options.SPLAT_FORCE || 6000,
            SHADING: options.SHADING === undefined ? true : options.SHADING,
            COLOR_UPDATE_SPEED: options.COLOR_UPDATE_SPEED || 10,
            BACK_COLOR: options.BACK_COLOR || { r: 0, g: 0, b: 0 },
            TRANSPARENT: options.TRANSPARENT === undefined ? true : options.TRANSPARENT
        };

        this.pointerPrototype = function () {
            this.id = -1;
            this.texcoordX = 0;
            this.texcoordY = 0;
            this.prevTexcoordX = 0;
            this.prevTexcoordY = 0;
            this.deltaX = 0;
            this.deltaY = 0;
            this.down = false;
            this.moved = false;
            this.color = { r: 0, g: 0, b: 0 }; 
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.init);
        } else {
            this.init();
        }
    }

    init() {
        if (!document.body) return;

        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        this.canvas.style.zIndex = '9999'; 
        this.canvas.style.pointerEvents = 'none'; 
        document.body.appendChild(this.canvas);

        this.initContext();
        this.initShaders();
        this.initFramebuffers();
        this.updateKeywords(); // <--- FIXED: This was missing!
        this.initEvents();
        
        this.lastUpdateTime = Date.now();
        this.colorUpdateTimer = 0.0;
        
        this.updateFrame();
    }

    initContext() {
        const { gl, ext } = this.getWebGLContext(this.canvas);
        this.gl = gl;
        this.ext = ext;

        if (!this.ext.supportLinearFiltering) {
            this.config.DYE_RESOLUTION = 256;
            this.config.SHADING = false;
        }
    }

    getWebGLContext(canvas) {
        const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
        let gl = canvas.getContext('webgl2', params);
        const isWebGL2 = !!gl;
        if (!isWebGL2) gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);

        let halfFloat;
        let supportLinearFiltering;
        if (isWebGL2) {
            gl.getExtension('EXT_color_buffer_float');
            supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
        } else {
            halfFloat = gl.getExtension('OES_texture_half_float');
            supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
        }
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat && halfFloat.HALF_FLOAT_OES;
        let formatRGBA, formatRG, formatR;

        if (isWebGL2) {
            formatRGBA = this.getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
            formatRG = this.getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
            formatR = this.getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
        } else {
            formatRGBA = this.getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
            formatRG = this.getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
            formatR = this.getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        }

        return { gl, ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering } };
    }

    getSupportedFormat(gl, internalFormat, format, type) {
        if (!this.supportRenderTextureFormat(gl, internalFormat, format, type)) {
            switch (internalFormat) {
                case gl.R16F: return this.getSupportedFormat(gl, gl.RG16F, gl.RG, type);
                case gl.RG16F: return this.getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
                default: return null;
            }
        }
        return { internalFormat, format };
    }

    supportRenderTextureFormat(gl, internalFormat, format, type) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        return status === gl.FRAMEBUFFER_COMPLETE;
    }

    updateKeywords() {
        let displayKeywords = [];
        if (this.config.SHADING) displayKeywords.push('SHADING');
        this.displayMaterial.setKeywords(displayKeywords);
    }

    initShaders() {
        const gl = this.gl;
        
        this.Material = class {
            constructor(vertexShader, fragmentShaderSource, parent) {
                this.parent = parent;
                this.vertexShader = vertexShader;
                this.fragmentShaderSource = fragmentShaderSource;
                this.programs = [];
                this.activeProgram = null;
                this.uniforms = [];
            }
            setKeywords(keywords) {
                let hash = 0;
                for (let i = 0; i < keywords.length; i++) hash += this.parent.hashCode(keywords[i]);
                let program = this.programs[hash];
                if (program == null) {
                    let fragmentShader = this.parent.compileShader(this.parent.gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
                    program = this.parent.createProgram(this.vertexShader, fragmentShader);
                    this.programs[hash] = program;
                }
                if (program === this.activeProgram) return;
                this.uniforms = this.parent.getUniforms(program);
                this.activeProgram = program;
            }
            bind() {
                this.parent.gl.useProgram(this.activeProgram);
            }
        };

        this.Program = class {
            constructor(vertexShader, fragmentShader, parent) {
                this.parent = parent;
                this.uniforms = {};
                this.program = this.parent.createProgram(vertexShader, fragmentShader);
                this.uniforms = this.parent.getUniforms(this.program);
            }
            bind() {
                this.parent.gl.useProgram(this.program);
            }
        };

        this.baseVertexShader = this.compileShader(gl.VERTEX_SHADER, `
            precision highp float;
            attribute vec2 aPosition;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform vec2 texelSize;
            void main () {
                vUv = aPosition * 0.5 + 0.5;
                vL = vUv - vec2(texelSize.x, 0.0);
                vR = vUv + vec2(texelSize.x, 0.0);
                vT = vUv + vec2(0.0, texelSize.y);
                vB = vUv - vec2(0.0, texelSize.y);
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `);

        this.copyShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            uniform sampler2D uTexture;
            void main () {
                gl_FragColor = texture2D(uTexture, vUv);
            }
        `);

        this.clearShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            uniform sampler2D uTexture;
            uniform float value;
            void main () {
                gl_FragColor = value * texture2D(uTexture, vUv);
            }
        `);

        this.displayShaderSource = `
            precision highp float;
            precision highp sampler2D;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform sampler2D uTexture;
            uniform sampler2D uDithering;
            uniform vec2 ditherScale;
            uniform vec2 texelSize;
            vec3 linearToGamma (vec3 color) {
                color = max(color, vec3(0));
                return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
            }
            void main () {
                vec3 c = texture2D(uTexture, vUv).rgb;
                #ifdef SHADING
                    vec3 lc = texture2D(uTexture, vL).rgb;
                    vec3 rc = texture2D(uTexture, vR).rgb;
                    vec3 tc = texture2D(uTexture, vT).rgb;
                    vec3 bc = texture2D(uTexture, vB).rgb;
                    float dx = length(rc) - length(lc);
                    float dy = length(tc) - length(bc);
                    vec3 n = normalize(vec3(dx, dy, length(texelSize)));
                    vec3 l = vec3(0.0, 0.0, 1.0);
                    float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
                    c *= diffuse;
                #endif
                float a = max(c.r, max(c.g, c.b));
                gl_FragColor = vec4(c, a);
            }
        `;

        this.splatShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision highp float;
            precision highp sampler2D;
            varying vec2 vUv;
            uniform sampler2D uTarget;
            uniform float aspectRatio;
            uniform vec3 color;
            uniform vec2 point;
            uniform float radius;
            void main () {
                vec2 p = vUv - point.xy;
                p.x *= aspectRatio;
                vec3 splat = exp(-dot(p, p) / radius) * color;
                vec3 base = texture2D(uTarget, vUv).xyz;
                gl_FragColor = vec4(base + splat, 1.0);
            }
        `);

        this.advectionShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision highp float;
            precision highp sampler2D;
            varying vec2 vUv;
            uniform sampler2D uVelocity;
            uniform sampler2D uSource;
            uniform vec2 texelSize;
            uniform vec2 dyeTexelSize;
            uniform float dt;
            uniform float dissipation;
            vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
                vec2 st = uv / tsize - 0.5;
                vec2 iuv = floor(st);
                vec2 fuv = fract(st);
                vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
                vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
                vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
                vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
                return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
            }
            void main () {
                #ifdef MANUAL_FILTERING
                    vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                    vec4 result = bilerp(uSource, coord, dyeTexelSize);
                #else
                    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                    vec4 result = texture2D(uSource, coord);
                #endif
                float decay = 1.0 + dissipation * dt;
                gl_FragColor = result / decay;
            }
        `, this.ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']);

        this.divergenceShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            varying highp vec2 vL;
            varying highp vec2 vR;
            varying highp vec2 vT;
            varying highp vec2 vB;
            uniform sampler2D uVelocity;
            void main () {
                float L = texture2D(uVelocity, vL).x;
                float R = texture2D(uVelocity, vR).x;
                float T = texture2D(uVelocity, vT).y;
                float B = texture2D(uVelocity, vB).y;
                vec2 C = texture2D(uVelocity, vUv).xy;
                if (vL.x < 0.0) { L = -C.x; }
                if (vR.x > 1.0) { R = -C.x; }
                if (vT.y > 1.0) { T = -C.y; }
                if (vB.y < 0.0) { B = -C.y; }
                float div = 0.5 * (R - L + T - B);
                gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
            }
        `);

        this.curlShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            varying highp vec2 vL;
            varying highp vec2 vR;
            varying highp vec2 vT;
            varying highp vec2 vB;
            uniform sampler2D uVelocity;
            void main () {
                float L = texture2D(uVelocity, vL).y;
                float R = texture2D(uVelocity, vR).y;
                float T = texture2D(uVelocity, vT).x;
                float B = texture2D(uVelocity, vB).x;
                float vorticity = R - L - T + B;
                gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
            }
        `);

        this.vorticityShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision highp float;
            precision highp sampler2D;
            varying vec2 vUv;
            varying vec2 vL;
            varying vec2 vR;
            varying vec2 vT;
            varying vec2 vB;
            uniform sampler2D uVelocity;
            uniform sampler2D uCurl;
            uniform float curl;
            uniform float dt;
            void main () {
                float L = texture2D(uCurl, vL).x;
                float R = texture2D(uCurl, vR).x;
                float T = texture2D(uCurl, vT).x;
                float B = texture2D(uCurl, vB).x;
                float C = texture2D(uCurl, vUv).x;
                vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
                force /= length(force) + 0.0001;
                force *= curl * C;
                force.y *= -1.0;
                vec2 velocity = texture2D(uVelocity, vUv).xy;
                velocity += force * dt;
                velocity = min(max(velocity, -1000.0), 1000.0);
                gl_FragColor = vec4(velocity, 0.0, 1.0);
            }
        `);

        this.pressureShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            varying highp vec2 vL;
            varying highp vec2 vR;
            varying highp vec2 vT;
            varying highp vec2 vB;
            uniform sampler2D uPressure;
            uniform sampler2D uDivergence;
            void main () {
                float L = texture2D(uPressure, vL).x;
                float R = texture2D(uPressure, vR).x;
                float T = texture2D(uPressure, vT).x;
                float B = texture2D(uPressure, vB).x;
                float C = texture2D(uPressure, vUv).x;
                float divergence = texture2D(uDivergence, vUv).x;
                float pressure = (L + R + B + T - divergence) * 0.25;
                gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
            }
        `);

        this.gradientSubtractShader = this.compileShader(gl.FRAGMENT_SHADER, `
            precision mediump float;
            precision mediump sampler2D;
            varying highp vec2 vUv;
            varying highp vec2 vL;
            varying highp vec2 vR;
            varying highp vec2 vT;
            varying highp vec2 vB;
            uniform sampler2D uPressure;
            uniform sampler2D uVelocity;
            void main () {
                float L = texture2D(uPressure, vL).x;
                float R = texture2D(uPressure, vR).x;
                float T = texture2D(uPressure, vT).x;
                float B = texture2D(uPressure, vB).x;
                vec2 velocity = texture2D(uVelocity, vUv).xy;
                velocity.xy -= vec2(R - L, T - B);
                gl_FragColor = vec4(velocity, 0.0, 1.0);
            }
        `);

        this.copyProgram = new this.Program(this.baseVertexShader, this.copyShader, this);
        this.clearProgram = new this.Program(this.baseVertexShader, this.clearShader, this);
        this.splatProgram = new this.Program(this.baseVertexShader, this.splatShader, this);
        this.advectionProgram = new this.Program(this.baseVertexShader, this.advectionShader, this);
        this.divergenceProgram = new this.Program(this.baseVertexShader, this.divergenceShader, this);
        this.curlProgram = new this.Program(this.baseVertexShader, this.curlShader, this);
        this.vorticityProgram = new this.Program(this.baseVertexShader, this.vorticityShader, this);
        this.pressureProgram = new this.Program(this.baseVertexShader, this.pressureShader, this);
        this.gradienSubtractProgram = new this.Program(this.baseVertexShader, this.gradientSubtractShader, this);
        this.displayMaterial = new this.Material(this.baseVertexShader, this.displayShaderSource, this);
    }

    initFramebuffers() {
        let simRes = this.getResolution(this.config.SIM_RESOLUTION);
        let dyeRes = this.getResolution(this.config.DYE_RESOLUTION);

        const texType = this.ext.halfFloatTexType;
        const rgba = this.ext.formatRGBA;
        const rg = this.ext.formatRG;
        const r = this.ext.formatR;
        const filtering = this.ext.supportLinearFiltering ? this.gl.LINEAR : this.gl.NEAREST;

        this.gl.disable(this.gl.BLEND);

        if (!this.dye)
            this.dye = this.createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
        else
            this.dye = this.resizeDoubleFBO(this.dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);

        if (!this.velocity)
            this.velocity = this.createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
        else
            this.velocity = this.resizeDoubleFBO(this.velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);

        this.divergence = this.createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, this.gl.NEAREST);
        this.curl = this.createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, this.gl.NEAREST);
        this.pressure = this.createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, this.gl.NEAREST);
    }

    createFBO(w, h, internalFormat, format, type, param) {
        this.gl.activeTexture(this.gl.TEXTURE0);
        let texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, param);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, param);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

        let fbo = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture, 0);
        this.gl.viewport(0, 0, w, h);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        return {
            texture,
            fbo,
            width: w,
            height: h,
            attach: (id) => {
                this.gl.activeTexture(this.gl.TEXTURE0 + id);
                this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
                return id;
            }
        };
    }

    createDoubleFBO(w, h, internalFormat, format, type, param) {
        let fbo1 = this.createFBO(w, h, internalFormat, format, type, param);
        let fbo2 = this.createFBO(w, h, internalFormat, format, type, param);

        return {
            width: w,
            height: h,
            texelSizeX: 1.0 / w,
            texelSizeY: 1.0 / h,
            get read() { return fbo1; },
            set read(value) { fbo1 = value; },
            get write() { return fbo2; },
            set write(value) { fbo2 = value; },
            swap: () => {
                let temp = fbo1;
                fbo1 = fbo2;
                fbo2 = temp;
            }
        };
    }

    resizeFBO(target, w, h, internalFormat, format, type, param) {
        let newFBO = this.createFBO(w, h, internalFormat, format, type, param);
        this.copyProgram.bind();
        this.gl.uniform1i(this.copyProgram.uniforms.uTexture, target.attach(0));
        this.blit(newFBO);
        return newFBO;
    }

    resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
        if (target.width === w && target.height === h) return target;
        target.read = this.resizeFBO(target.read, w, h, internalFormat, format, type, param);
        target.write = this.createFBO(w, h, internalFormat, format, type, param);
        target.width = w;
        target.height = h;
        target.texelSizeX = 1.0 / w;
        target.texelSizeY = 1.0 / h;
        return target;
    }

    blit(target, clear = false) {
        if (!this.blitQuad) {
            this.blitQuad = {
                vbo: this.gl.createBuffer(),
                ibo: this.gl.createBuffer()
            };
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.blitQuad.vbo);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), this.gl.STATIC_DRAW);
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.blitQuad.ibo);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), this.gl.STATIC_DRAW);
        }
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.blitQuad.vbo);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.blitQuad.ibo);
        this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(0);

        if (target == null) {
            this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        } else {
            this.gl.viewport(0, 0, target.width, target.height);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, target.fbo);
        }
        if (clear) {
            this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        }
        this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
    }

    updateFrame() {
        const dt = this.calcDeltaTime();
        if (this.resizeCanvas()) this.initFramebuffers();
        this.updateColors(dt);
        this.applyInputs();
        this.step(dt);
        this.render(null);
        requestAnimationFrame(this.updateFrame);
    }

    calcDeltaTime() {
        let now = Date.now();
        let dt = (now - this.lastUpdateTime) / 1000;
        dt = Math.min(dt, 0.016666);
        this.lastUpdateTime = now;
        return dt;
    }

    resizeCanvas() {
        let width = this.scaleByPixelRatio(this.canvas.clientWidth);
        let height = this.scaleByPixelRatio(this.canvas.clientHeight);
        if (this.canvas.width !== width || this.canvas.height !== height) {
            this.canvas.width = width;
            this.canvas.height = height;
            return true;
        }
        return false;
    }

    updateColors(dt) {
        this.colorUpdateTimer += dt * this.config.COLOR_UPDATE_SPEED;
        if (this.colorUpdateTimer >= 1) {
            this.colorUpdateTimer = this.wrap(this.colorUpdateTimer, 0, 1);
            this.pointers.forEach(p => {
                p.color = this.generateColor();
            });
        }
    }

    applyInputs() {
        this.pointers.forEach(p => {
            if (p.moved) {
                p.moved = false;
                this.splatPointer(p);
            }
        });
    }

    step(dt) {
        const gl = this.gl;
        gl.disable(gl.BLEND);
        
        this.curlProgram.bind();
        gl.uniform2f(this.curlProgram.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
        gl.uniform1i(this.curlProgram.uniforms.uVelocity, this.velocity.read.attach(0));
        this.blit(this.curl);

        this.vorticityProgram.bind();
        gl.uniform2f(this.vorticityProgram.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
        gl.uniform1i(this.vorticityProgram.uniforms.uVelocity, this.velocity.read.attach(0));
        gl.uniform1i(this.vorticityProgram.uniforms.uCurl, this.curl.attach(1));
        gl.uniform1f(this.vorticityProgram.uniforms.curl, this.config.CURL);
        gl.uniform1f(this.vorticityProgram.uniforms.dt, dt);
        this.blit(this.velocity.write);
        this.velocity.swap();

        this.divergenceProgram.bind();
        gl.uniform2f(this.divergenceProgram.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
        gl.uniform1i(this.divergenceProgram.uniforms.uVelocity, this.velocity.read.attach(0));
        this.blit(this.divergence);

        this.clearProgram.bind();
        gl.uniform1i(this.clearProgram.uniforms.uTexture, this.pressure.read.attach(0));
        gl.uniform1f(this.clearProgram.uniforms.value, this.config.PRESSURE);
        this.blit(this.pressure.write);
        this.pressure.swap();

        this.pressureProgram.bind();
        gl.uniform2f(this.pressureProgram.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
        gl.uniform1i(this.pressureProgram.uniforms.uDivergence, this.divergence.attach(0));
        for (let i = 0; i < this.config.PRESSURE_ITERATIONS; i++) {
            gl.uniform1i(this.pressureProgram.uniforms.uPressure, this.pressure.read.attach(1));
            this.blit(this.pressure.write);
            this.pressure.swap();
        }

        this.gradienSubtractProgram.bind();
        gl.uniform2f(this.gradienSubtractProgram.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
        gl.uniform1i(this.gradienSubtractProgram.uniforms.uPressure, this.pressure.read.attach(0));
        gl.uniform1i(this.gradienSubtractProgram.uniforms.uVelocity, this.velocity.read.attach(1));
        this.blit(this.velocity.write);
        this.velocity.swap();

        this.advectionProgram.bind();
        gl.uniform2f(this.advectionProgram.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
        if (!this.ext.supportLinearFiltering)
            gl.uniform2f(this.advectionProgram.uniforms.dyeTexelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
        let velocityId = this.velocity.read.attach(0);
        gl.uniform1i(this.advectionProgram.uniforms.uVelocity, velocityId);
        gl.uniform1i(this.advectionProgram.uniforms.uSource, velocityId);
        gl.uniform1f(this.advectionProgram.uniforms.dt, dt);
        gl.uniform1f(this.advectionProgram.uniforms.dissipation, this.config.VELOCITY_DISSIPATION);
        this.blit(this.velocity.write);
        this.velocity.swap();

        if (!this.ext.supportLinearFiltering)
            gl.uniform2f(this.advectionProgram.uniforms.dyeTexelSize, this.dye.texelSizeX, this.dye.texelSizeY);
        gl.uniform1i(this.advectionProgram.uniforms.uVelocity, this.velocity.read.attach(0));
        gl.uniform1i(this.advectionProgram.uniforms.uSource, this.dye.read.attach(1));
        gl.uniform1f(this.advectionProgram.uniforms.dissipation, this.config.DENSITY_DISSIPATION);
        this.blit(this.dye.write);
        this.dye.swap();
    }

    render(target) {
        const gl = this.gl;
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        this.drawDisplay(target);
    }

    drawDisplay(target) {
        const gl = this.gl;
        let width = target == null ? gl.drawingBufferWidth : target.width;
        let height = target == null ? gl.drawingBufferHeight : target.height;
        this.displayMaterial.bind();
        if (this.config.SHADING) gl.uniform2f(this.displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
        gl.uniform1i(this.displayMaterial.uniforms.uTexture, this.dye.read.attach(0));
        this.blit(target);
    }

    splatPointer(pointer) {
        let dx = pointer.deltaX * this.config.SPLAT_FORCE;
        let dy = pointer.deltaY * this.config.SPLAT_FORCE;
        this.splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    clickSplat(pointer) {
        const color = this.generateColor();
        color.r *= 10.0;
        color.g *= 10.0;
        color.b *= 10.0;
        let dx = 10 * (Math.random() - 0.5);
        let dy = 30 * (Math.random() - 0.5);
        this.splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
    }

    splat(x, y, dx, dy, color) {
        const gl = this.gl;
        this.splatProgram.bind();
        gl.uniform1i(this.splatProgram.uniforms.uTarget, this.velocity.read.attach(0));
        gl.uniform1f(this.splatProgram.uniforms.aspectRatio, this.canvas.width / this.canvas.height);
        gl.uniform2f(this.splatProgram.uniforms.point, x, y);
        gl.uniform3f(this.splatProgram.uniforms.color, dx, dy, 0.0);
        gl.uniform1f(this.splatProgram.uniforms.radius, this.correctRadius(this.config.SPLAT_RADIUS / 100.0));
        this.blit(this.velocity.write);
        this.velocity.swap();

        gl.uniform1i(this.splatProgram.uniforms.uTarget, this.dye.read.attach(0));
        gl.uniform3f(this.splatProgram.uniforms.color, color.r, color.g, color.b);
        this.blit(this.dye.write);
        this.dye.swap();
    }

    correctRadius(radius) {
        let aspectRatio = this.canvas.width / this.canvas.height;
        if (aspectRatio > 1) radius *= aspectRatio;
        return radius;
    }

    initEvents() {
        this.pointers.push(new this.pointerPrototype());

        window.addEventListener('mousedown', (e) => {
            let pointer = this.pointers[0];
            let posX = this.scaleByPixelRatio(e.clientX);
            let posY = this.scaleByPixelRatio(e.clientY);
            this.updatePointerDownData(pointer, -1, posX, posY);
            this.clickSplat(pointer);
        });

        window.addEventListener('mousemove', (e) => {
             let pointer = this.pointers[0];
             let posX = this.scaleByPixelRatio(e.clientX);
             let posY = this.scaleByPixelRatio(e.clientY);
             // On first move, we can optionally randomize color
             if(!this.firstMoveHappened) {
                 this.firstMoveHappened = true;
                 pointer.color = this.generateColor();
             }
             this.updatePointerMoveData(pointer, posX, posY, pointer.color);
        });

        window.addEventListener('touchstart', (e) => {
             const touches = e.targetTouches;
             while (touches.length >= this.pointers.length)
                this.pointers.push(new this.pointerPrototype());

             for (let i = 0; i < touches.length; i++) {
                 let posX = this.scaleByPixelRatio(touches[i].clientX);
                 let posY = this.scaleByPixelRatio(touches[i].clientY);
                 this.updatePointerDownData(this.pointers[i + 1], touches[i].identifier, posX, posY);
             }
        }, { passive: false });

        window.addEventListener('touchmove', (e) => {
            const touches = e.targetTouches;
            for (let i = 0; i < touches.length; i++) {
                let pointer = this.pointers[i + 1];
                if (!pointer.down) continue;
                let posX = this.scaleByPixelRatio(touches[i].clientX);
                let posY = this.scaleByPixelRatio(touches[i].clientY);
                this.updatePointerMoveData(pointer, posX, posY, pointer.color);
            }
        }, { passive: false });

        window.addEventListener('touchend', (e) => {
             const touches = e.changedTouches;
             for (let i = 0; i < touches.length; i++) {
                 let pointer = this.pointers.find(p => p.id === touches[i].identifier);
                 if (pointer) this.updatePointerUpData(pointer);
             }
        });
    }

    updatePointerDownData(pointer, id, posX, posY) {
        pointer.id = id;
        pointer.down = true;
        pointer.moved = false;
        pointer.texcoordX = posX / this.canvas.width;
        pointer.texcoordY = 1.0 - posY / this.canvas.height;
        pointer.prevTexcoordX = pointer.texcoordX;
        pointer.prevTexcoordY = pointer.texcoordY;
        pointer.deltaX = 0;
        pointer.deltaY = 0;
        pointer.color = this.generateColor();
    }

    updatePointerMoveData(pointer, posX, posY, color) {
        pointer.prevTexcoordX = pointer.texcoordX;
        pointer.prevTexcoordY = pointer.texcoordY;
        pointer.texcoordX = posX / this.canvas.width;
        pointer.texcoordY = 1.0 - posY / this.canvas.height;
        pointer.deltaX = this.correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
        pointer.deltaY = this.correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
        pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
        pointer.color = color;
    }

    updatePointerUpData(pointer) {
        pointer.down = false;
    }

    correctDeltaX(delta) {
        let aspectRatio = this.canvas.width / this.canvas.height;
        if (aspectRatio < 1) delta *= aspectRatio;
        return delta;
    }

    correctDeltaY(delta) {
        let aspectRatio = this.canvas.width / this.canvas.height;
        if (aspectRatio > 1) delta /= aspectRatio;
        return delta;
    }

    clickSplat(pointer) {
        const color = this.generateColor();
        color.r *= 10.0;
        color.g *= 10.0;
        color.b *= 10.0;
        let dx = 10 * (Math.random() - 0.5);
        let dy = 30 * (Math.random() - 0.5);
        this.splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
    }

    generateColor() {
        if (Math.random() > 0.5) {
            return { r: 0.0, g: (207/255) * 0.15, b: (255/255) * 0.15 };
        } else {
            return { r: (212/255) * 0.15, g: (168/255) * 0.15, b: (67/255) * 0.15 };
        }
    }

    HSVtoRGB(h, s, v) {
        let r, g, b, i, f, p, q, t;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
            default: break;
        }
        return { r, g, b };
    }

    wrap(value, min, max) {
        const range = max - min;
        if (range === 0) return min;
        return ((value - min) % range) + min;
    }

    getResolution(resolution) {
        let aspectRatio = this.gl.drawingBufferWidth / this.gl.drawingBufferHeight;
        if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
        const min = Math.round(resolution);
        const max = Math.round(resolution * aspectRatio);
        if (this.gl.drawingBufferWidth > this.gl.drawingBufferHeight)
            return { width: max, height: min };
        else
            return { width: min, height: max };
    }

    scaleByPixelRatio(input) {
        const pixelRatio = window.devicePixelRatio || 1;
        return Math.floor(input * pixelRatio);
    }

    hashCode(s) {
        if (s.length === 0) return 0;
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
            hash = (hash << 5) - hash + s.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    }

    // Helpers to compile shaders...
    compileShader(type, source, keywords) {
        source = this.addKeywords(source, keywords);
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.trace(this.gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    addKeywords(source, keywords) {
        if (!keywords) return source;
        let keywordsString = '';
        keywords.forEach(keyword => {
            keywordsString += '#define ' + keyword + '\n';
        });
        return keywordsString + source;
    }

    createProgram(vertexShader, fragmentShader) {
        let program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.trace(this.gl.getProgramInfoLog(program));
        }
        return program;
    }

    getUniforms(program) {
        let uniforms = [];
        let uniformCount = this.gl.getProgramParameter(program, this.gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            let uniformName = this.gl.getActiveUniform(program, i).name;
            uniforms[uniformName] = this.gl.getUniformLocation(program, uniformName);
        }
        return uniforms;
    }
}

// Only initialize heavy WebGL fluid cursor on non-touch, capable devices
if (!_isTouchDevice && typeof FluidCursor !== 'undefined') {
  new FluidCursor();
}
