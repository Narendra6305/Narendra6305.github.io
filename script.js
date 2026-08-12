/* ============================================================
   LIQUID NEURAL NETWORK PORTFOLIO — SCRIPT ENGINE
   Kurugodu Sai Narendra | MSc Data Analytics
   ============================================================ */

/* ---- BOOT SEQUENCE ---- */
(function bootSequence() {
  const overlay  = document.getElementById('boot-overlay');
  const bootText = document.getElementById('boot-text');
  const bootBar  = document.getElementById('boot-bar');
  const bootStat = document.getElementById('boot-status');
  if (!overlay) return;

  const steps = [
    { pct: 15,  txt: 'LOADING NEURAL WEIGHTS...',       stat: 'INITIALIZING NEURAL NETWORK...' },
    { pct: 35,  txt: 'ESTABLISHING DATA PIPELINE...',   stat: 'CONNECTING DATA STREAMS...' },
    { pct: 55,  txt: 'CALIBRATING ML MODELS...',        stat: 'LOADING MODEL REGISTRY...' },
    { pct: 75,  txt: 'RENDERING HOLOGRAPHIC NODES...',  stat: 'BUILDING VISUALIZATION ENGINE...' },
    { pct: 92,  txt: 'SYSTEM READY — NARENDRA@AI...',   stat: 'FINALIZE BOOT SEQUENCE...' },
    { pct: 100, txt: 'BOOT COMPLETE ✓',                 stat: 'LAUNCHING PORTFOLIO COMMAND CENTER...' },
  ];

  let i = 0;
  function tick() {
    if (i >= steps.length) {
      setTimeout(() => {
        overlay.classList.add('done');
        document.body.style.overflow = '';
        initAll();
      }, 420);
      return;
    }
    const s = steps[i++];
    bootText.textContent = s.txt;
    bootStat.textContent = s.stat;
    bootBar.style.width  = s.pct + '%';
    setTimeout(tick, 360 + Math.random() * 120);
  }
  document.body.style.overflow = 'hidden';
  tick();
})();

/* ============================================================
   MAIN INIT — called after boot
   ============================================================ */
function initAll() {
  initNeuralCanvas();
  initOrbCanvas();
  initCustomCursor();
  initScrollProgress();
  initNavbar();
  initTyped();
  initCounters();
  initRevealSections();
  initSkillBars();
  initCardSpotlight();
  initMatrixRain();
  initBenchmarkChart();
  initSQLSandbox();
  initSkillsRadarChart();
  setupTheme();
  initCyberRPG();
}

/* ---- THEME ---- */
function setupTheme() {
  setTheme('cyan');
}
function setTheme(name) {
  document.documentElement.setAttribute('data-theme', name || 'cyan');
  localStorage.setItem('kn-theme', 'cyan');
}

/* ---- WEB AUDIO SYNTH ---- */
let _ac = null;
function getAC() { return _ac || (_ac = new (window.AudioContext||window.webkitAudioContext)()); }
function playBlip(freq = 600, dur = 0.08) {
  try {
    const ac = getAC();
    if (ac.state === 'suspended') ac.resume();
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.08, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
    o.connect(g); g.connect(ac.destination);
    o.start(); o.stop(ac.currentTime + dur);
  } catch(e) {}
}

/* ---- GRAND LINE NAUTICAL OCEAN & SKY CANVAS ---- */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let W, H;
  let mx = -9999, my = -9999;
  let waveOffset = 0;
  let compassAngle = 0;
  let ripples = [];
  let seaStars = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildSeaElements();
  }

  function buildSeaElements() {
    seaStars = Array.from({length: 45}, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.8,
      speed: Math.random() * 0.4 + 0.1
    }));
  }

  let _cachedTheme = '', _waveColor1 = '', _waveColor2 = '', _starColor = '';
  function refreshColors() {
    const theme = document.documentElement.getAttribute('data-theme') || 'cyan';
    if (theme === _cachedTheme) return;
    _cachedTheme = theme;
    switch(theme) {
      case 'chopper':
        _waveColor1 = 'rgba(255, 105, 180, 0.18)';
        _waveColor2 = 'rgba(255, 20, 147, 0.12)';
        _starColor  = 'rgba(255, 182, 193, 0.8)';
        break;
      case 'haki':
        _waveColor1 = 'rgba(255, 0, 51, 0.18)';
        _waveColor2 = 'rgba(153, 0, 17, 0.12)';
        _starColor  = 'rgba(255, 102, 102, 0.8)';
        break;
      case 'nika':
        _waveColor1 = 'rgba(255, 215, 0, 0.18)';
        _waveColor2 = 'rgba(255, 140, 0, 0.12)';
        _starColor  = 'rgba(255, 235, 150, 0.8)';
        break;
      case 'darkmatter':
        _waveColor1 = 'rgba(123, 44, 191, 0.18)';
        _waveColor2 = 'rgba(60, 9, 108, 0.12)';
        _starColor  = 'rgba(200, 150, 255, 0.8)';
        break;
      case 'pirateking':
        _waveColor1 = 'rgba(255, 215, 0, 0.2)';
        _waveColor2 = 'rgba(255, 0, 51, 0.15)';
        _starColor  = 'rgba(255, 220, 100, 0.85)';
        break;
      default:
        _waveColor1 = 'rgba(0, 242, 254, 0.18)';
        _waveColor2 = 'rgba(79, 172, 254, 0.12)';
        _starColor  = 'rgba(180, 240, 255, 0.8)';
    }
  }

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (Math.random() > 0.4) {
      ripples.push({ x: mx, y: my, r: 4, maxR: 35, alpha: 0.6 });
    }
  });
  window.addEventListener('mouseleave', () => { mx = -9999; my = -9999; });
  window.addEventListener('resize', resize);
  resize();

  const FRAME_MS = 33;
  let lastFrame = 0;

  function draw(ts) {
    requestAnimationFrame(draw);
    if (ts - lastFrame < FRAME_MS) return;
    lastFrame = ts;

    refreshColors();
    ctx.clearRect(0, 0, W, H);

    // 1. Draw Sea Stars & Celestial Orbs
    ctx.fillStyle = _starColor;
    for (let i = 0; i < seaStars.length; i++) {
      const s = seaStars[i];
      s.y -= s.speed;
      if (s.y < 0) { s.y = H; s.x = Math.random() * W; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Draw Nautical Compass Rose in Center
    compassAngle += 0.001;
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(compassAngle);
    ctx.strokeStyle = _waveColor1;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, Math.min(W, H) * 0.28, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -Math.min(W, H) * 0.32); ctx.lineTo(0, Math.min(W, H) * 0.32);
    ctx.moveTo(-Math.min(W, H) * 0.32, 0); ctx.lineTo(Math.min(W, H) * 0.32, 0);
    ctx.stroke();
    ctx.restore();

    // 3. Draw Rolling Ocean Waves
    waveOffset += 0.025;
    ctx.fillStyle = _waveColor1;
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 30) {
      const y = H - 60 + Math.sin(x * 0.008 + waveOffset) * 20;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = _waveColor2;
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 30) {
      const y = H - 35 + Math.sin(x * 0.012 - waveOffset * 0.8) * 15;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();

    // 4. Draw Interactive Water Ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += 0.8;
      rp.alpha -= 0.018;
      if (rp.alpha <= 0 || rp.r >= rp.maxR) {
        ripples.splice(i, 1);
        continue;
      }
      ctx.strokeStyle = _starColor.replace('0.8', rp.alpha.toFixed(2));
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  requestAnimationFrame(draw);
}

/* ---- HERO ORB CANVAS (3D SPHERE — OPTIMIZED) ---- */
function initOrbCanvas() {
  const canvas = document.getElementById('orb-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  const W = canvas.width  = 340;
  const H = canvas.height = 340;
  const cx = W / 2, cy = H / 2, R = 110;
  const NODE_COUNT = 48; // down from 80 — still looks great
  const EDGE_DIST  = 55; // connection threshold in projected space
  const EDGE_DIST_SQ = EDGE_DIST * EDGE_DIST;

  // Spherical coordinates stored flat for in-place rotation (no allocations)
  const ox = new Float32Array(NODE_COUNT);
  const oy = new Float32Array(NODE_COUNT);
  const oz = new Float32Array(NODE_COUNT);
  const px = new Float32Array(NODE_COUNT); // projected
  const py = new Float32Array(NODE_COUNT);
  const pz = new Float32Array(NODE_COUNT);

  for (let i = 0; i < NODE_COUNT; i++) {
    const theta = Math.random() * 6.2832;
    const phi   = Math.acos(2 * Math.random() - 1);
    ox[i] = R * Math.sin(phi) * Math.cos(theta);
    oy[i] = R * Math.sin(phi) * Math.sin(theta);
    oz[i] = R * Math.cos(phi);
  }

  let ax = 0, ay = 0, mx = 0, my = 0;
  document.querySelector('.neural-orb-wrapper')?.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mx = (e.clientX - rect.left - W/2) / W;
    my = (e.clientY - rect.top  - H/2) / H;
  });

  let _ct = '', _cfill = '', _cedge = '';
  function refreshColors() {
    const t = document.documentElement.getAttribute('data-theme') || 'cyan';
    if (t === _ct) return; _ct = t;
    switch(t) {
      case 'violet':  _cfill = 'rgba(192,132,252,0.85)'; _cedge = 'rgba(192,132,252,'; break;
      case 'emerald': _cfill = 'rgba(0,255,135,0.85)';   _cedge = 'rgba(0,255,135,';   break;
      case 'pink':    _cfill = 'rgba(255,0,127,0.85)';    _cedge = 'rgba(255,0,127,';    break;
      default:        _cfill = 'rgba(0,242,254,0.85)';    _cedge = 'rgba(0,242,254,';
    }
  }
  refreshColors();

  // In-place rotate to avoid array allocations every frame
  function applyRotations() {
    const cX = Math.cos(ax), sX = Math.sin(ax);
    const cY = Math.cos(ay), sY = Math.sin(ay);
    for (let i = 0; i < NODE_COUNT; i++) {
      // RotateX
      let ry = oy[i]*cX - oz[i]*sX;
      let rz = oy[i]*sX + oz[i]*cX;
      // RotateY
      let rx = ox[i]*cY + rz*sY;
      rz     = -ox[i]*sY + rz*cY;
      // Project
      const sc = 250 / (250 + rz);
      px[i] = cx + rx * sc;
      py[i] = cy + ry * sc;
      pz[i] = rz;
    }
  }

  // Throttle to 30fps
  const FRAME_MS = 33;
  let lastT = 0;

  function frame(ts) {
    requestAnimationFrame(frame);
    if (ts - lastT < FRAME_MS) return;
    lastT = ts;

    refreshColors();
    ax += 0.005 + my * 0.002;
    ay += 0.008 + mx * 0.002;
    applyRotations();

    ctx.clearRect(0, 0, W, H);

    // Batch edges — one stroke call per render
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    let hasEdge = false;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i+1; j < NODE_COUNT; j++) {
        const dx = px[i]-px[j], dy = py[i]-py[j];
        if (dx*dx + dy*dy < EDGE_DIST_SQ) {
          ctx.moveTo(px[i], py[i]);
          ctx.lineTo(px[j], py[j]);
          hasEdge = true;
        }
      }
    }
    if (hasEdge) {
      ctx.strokeStyle = _cedge + '0.3)';
      ctx.stroke();
    }

    // Draw all nodes in ONE batch — no per-node shadowBlur
    ctx.fillStyle = _cfill;
    ctx.beginPath();
    for (let i = 0; i < NODE_COUNT; i++) {
      const brightness = (pz[i] + R) / (2 * R);
      const r = 1.8 * (250 / (250 + pz[i]));
      if (brightness > 0.2) { // skip rear-facing nodes
        ctx.moveTo(px[i] + r, py[i]);
        ctx.arc(px[i], py[i], r, 0, 6.2832);
      }
    }
    ctx.fill();
  }
  requestAnimationFrame(frame);
}

/* ---- CUSTOM CURSOR ---- */
function initCustomCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = innerWidth/2, my = innerHeight/2;
  let rx = mx, ry = my;
  let lastTrailTime = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';

    const now = Date.now();
    if (now - lastTrailTime > 65) {
      lastTrailTime = now;
      spawnSakuraPetal(mx, my);
    }
  });

  function animRing() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a,button,.glass-card,.lab-tab,.proj-cta,.wanted-poster-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('hover');
      playChopperChime();
    });
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

function spawnSakuraPetal(x, y) {
  const p = document.createElement('div');
  p.className = 'sakura-trail';
  p.textContent = Math.random() > 0.4 ? '🌸' : '✨';
  Object.assign(p.style, {
    position: 'fixed',
    left: (x + (Math.random() - 0.5) * 16) + 'px',
    top: (y + (Math.random() - 0.5) * 16) + 'px',
    fontSize: (Math.random() * 0.4 + 0.65) + 'rem',
    pointerEvents: 'none',
    zIndex: '8995',
    opacity: '0.9',
    userSelect: 'none',
    filter: 'drop-shadow(0 0 6px #ff69b4)',
    transform: `rotate(${Math.random() * 360}deg) scale(1)`,
    transition: 'all 0.8s ease-out'
  });
  document.body.appendChild(p);

  requestAnimationFrame(() => {
    p.style.opacity = '0';
    p.style.transform = `translate(${(Math.random() - 0.5) * 36}px, ${24 + Math.random() * 30}px) rotate(${Math.random() * 360}deg) scale(0.2)`;
  });

  setTimeout(() => p.remove(), 800);
}

function playChopperChime() {
  if (_sfxMuted) return;
  try {
    const ac = getAC();
    if (ac.state === 'suspended') ac.resume();
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(880, ac.currentTime);
    o.frequency.exponentialRampToValueAtTime(1320, ac.currentTime + 0.12);
    g.gain.setValueAtTime(0.06, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.12);
    o.connect(g); g.connect(ac.destination);
    o.start(); o.stop(ac.currentTime + 0.12);
  } catch(e) {}
}

/* ---- SCROLL PROGRESS ---- */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - innerHeight) * 100;
    bar.style.width = pct + '%';
  });
}

/* ---- NAVBAR ---- */
function initNavbar() {
  const nav   = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const hbg   = document.getElementById('hamburger');
  const menu  = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('solid', window.scrollY > 30);

    // Active spy
    let current = '';
    document.querySelectorAll('section[id]').forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.dataset.section === current);
    });
  });

  hbg?.addEventListener('click', () => menu.classList.toggle('open'));
  links.forEach(l => l.addEventListener('click', () => menu.classList.remove('open')));
}

/* ---- TYPED TEXT ---- */
function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const words = [
    "Captain of Data Science & ML",
    "MSc Scholar @ CHRIST University",
    "Conqueror of Big Data & SQL",
    "Machine Learning Navigator",
    "AWS Cloud Infrastructure Captain"
  ];
  let wordIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    const current = words[wordIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 40 : 80;
    if (!isDeleting && charIdx === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  type();
}

/* ---- COUNTERS ---- */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const target = +e.target.dataset.target;
      let cur = 0;
      const step = Math.ceil(target / 45);
      const run = () => {
        cur = Math.min(cur + step, target);
        e.target.textContent = cur;
        if (cur < target) setTimeout(run, 38);
      };
      run();
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

/* ---- REVEAL ON SCROLL ---- */
function initRevealSections() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        if (e.target.id === 'about') {
          completeQuest('quest_boot');
        }
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal-section').forEach(s => obs.observe(s));
}

/* ---- SKILL BARS ---- */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        bars.forEach(b => b.style.width = b.dataset.w);
        obs.disconnect();
      }
    });
  }, { threshold: 0.2 });
  const section = document.getElementById('skills');
  if (section) obs.observe(section);
}

/* ---- CARD SPOTLIGHT (mouse radial) ---- */
function initCardSpotlight() {
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top)  + 'px');
    });
  });
}

/* ---- LAB: TAB SWITCHING ---- */
function switchTab(e, name) {
  playBlip(520);
  document.querySelectorAll('.lab-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.lab-panel').forEach(p => p.classList.remove('active'));
  e.currentTarget.classList.add('active');
  document.getElementById('panel-' + name).classList.add('active');
}

/* ---- LAB: CHURN SIM ---- */
function runChurnSim() {
  const spend   = +document.getElementById('spend-slider').value;
  const tenure  = +document.getElementById('tenure-slider').value;
  const tickets = +document.getElementById('tickets-slider').value;

  document.getElementById('sv-spend').textContent   = '$' + spend;
  document.getElementById('sv-tenure').textContent  = tenure + ' months';
  document.getElementById('sv-tickets').textContent = tickets;

  let score = 0.5;
  score -= (tenure / 60) * 0.4;
  score += (tickets / 10) * 0.5;
  if (spend < 200) score += 0.2; else if (spend > 800) score -= 0.15;
  const pct = Math.min(Math.max(score * 100, 3), 97).toFixed(1);

  document.getElementById('churn-score').innerHTML = pct + '<span>%</span>';
  const bar = document.getElementById('churn-bar');
  const st  = document.getElementById('churn-status');
  bar.style.width = pct + '%';

  if (pct < 35) {
    bar.style.background = 'var(--green)'; st.dataset.level = 'low';
    st.innerHTML = '<i class="fas fa-check-circle"></i> Low Risk — Retention Target';
  } else if (pct < 65) {
    bar.style.background = 'var(--amber)'; st.dataset.level = 'mid';
    st.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Moderate Risk — Campaign Advised';
  } else {
    bar.style.background = 'var(--accent3)'; st.dataset.level = 'high';
    st.innerHTML = '<i class="fas fa-times-circle"></i> High Risk — Immediate Action Required';
  }
}

/* ---- LAB: CARDIOVASCULAR SIM ---- */
function runHeartSim() {
  const bp   = +document.getElementById('bp-slider').value;
  const chol = +document.getElementById('chol-slider').value;
  const hr   = +document.getElementById('hr-slider').value;

  document.getElementById('sv-bp').textContent   = bp + ' mmHg';
  document.getElementById('sv-chol').textContent = chol + ' mg/dl';
  document.getElementById('sv-hr').textContent   = hr + ' bpm';

  let risk = 10;
  if (bp > 140)   risk += (bp - 140) * 0.4;
  if (chol > 240) risk += (chol - 240) * 0.3;
  if (hr < 110)   risk += 15;
  const pct = Math.min(Math.max(risk, 5), 95).toFixed(1);

  document.getElementById('heart-score').innerHTML = pct + '<span>%</span>';
  const bar = document.getElementById('heart-bar');
  const st  = document.getElementById('heart-status');
  bar.style.width = pct + '%';

  if (pct < 30) {
    bar.style.background = 'var(--green)'; st.dataset.level = 'low';
    st.innerHTML = '<i class="fas fa-shield-alt"></i> Normal Biomarker Profile';
  } else if (pct < 60) {
    bar.style.background = 'var(--amber)'; st.dataset.level = 'mid';
    st.innerHTML = '<i class="fas fa-exclamation-circle"></i> Elevated Cardiovascular Risk';
  } else {
    bar.style.background = 'var(--accent3)'; st.dataset.level = 'high';
    st.innerHTML = '<i class="fas fa-heart-broken"></i> High Risk — Clinical Alert';
  }
}

/* ---- LAB: SQL SANDBOX ---- */
const SQL_QUERIES = {
  churn: {
    sql: `SELECT customer_id, monthly_spend, tenure_months,\n       churn_probability\nFROM   customer_telemetry\nWHERE  churn_probability > 0.65\nORDER  BY monthly_spend DESC\nLIMIT  5;`,
    head: ['customer_id','monthly_spend','tenure_months','churn_probability'],
    rows: [
      ['CUST_9402','$1,240','3 mos','<span style="color:var(--accent3);font-weight:700">84.2%</span>'],
      ['CUST_8819','$980','5 mos','<span style="color:var(--accent3);font-weight:700">76.5%</span>'],
      ['CUST_7210','$850','2 mos','<span style="color:var(--accent3);font-weight:700">71.8%</span>'],
    ],
    info: '⚡ Executed in 0.03ms · 3 rows returned · Cache: HIT'
  },
  rfm: {
    sql: `SELECT customer_id, rfm_segment,\n       total_lifetime_value\nFROM   rfm_analytics\nWHERE  rfm_segment = 'VIP_Platinum'\nORDER  BY total_lifetime_value DESC\nLIMIT  3;`,
    head: ['customer_id','rfm_segment','total_lifetime_value'],
    rows: [
      ['CUST_1042','<span style="color:var(--accent);font-weight:700">VIP_Platinum</span>','$14,250'],
      ['CUST_3081','<span style="color:var(--accent);font-weight:700">VIP_Platinum</span>','$11,900'],
      ['CUST_5520','<span style="color:var(--accent);font-weight:700">VIP_Platinum</span>','$9,840'],
    ],
    info: '⚡ Executed in 0.02ms · 3 rows returned · Cache: HIT'
  },
  models: {
    sql: `SELECT algorithm_name, accuracy_pct,\n       precision_pct, recall_pct\nFROM   model_evaluation_log\nORDER  BY accuracy_pct DESC;`,
    head: ['algorithm_name','accuracy_pct','precision_pct','recall_pct'],
    rows: [
      ['Random Forest Ensemble','<span style="color:var(--green);font-weight:700">90.2%</span>','91.4%','88.2%'],
      ['Artificial Neural Network','88.5%','89.1%','87.6%'],
      ['Support Vector Machine','85.7%','86.4%','84.0%'],
    ],
    info: '⚡ Executed in 0.04ms · 3 rows returned · Cache: HIT'
  }
};

function initSQLSandbox() {
  const el = document.getElementById('sql-code');
  if (el) el.textContent = SQL_QUERIES.churn.sql;
  execSQL();
}

function loadSQL() {
  const key = document.getElementById('sql-select').value;
  const q = SQL_QUERIES[key];
  document.getElementById('sql-code').textContent = q.sql;
}

function execSQL() {
  playBlip(780);
  completeQuest('quest_sql');
  const key = document.getElementById('sql-select').value;
  const q   = SQL_QUERIES[key];

  document.getElementById('sql-head').innerHTML = '<tr>' + q.head.map(h => `<th>${h}</th>`).join('') + '</tr>';
  document.getElementById('sql-footer').textContent = '⌛ Executing query...';

  setTimeout(() => {
    document.getElementById('sql-body').innerHTML = q.rows.map(r =>
      '<tr>' + r.map(c => `<td>${c}</td>`).join('') + '</tr>'
    ).join('');
    document.getElementById('sql-footer').textContent = q.info;
  }, 420);
}

/* ---- LAB: CONFUSION MATRIX ---- */
function runMatrix() {
  completeQuest('quest_matrix');
  const t = +document.getElementById('thresh-slider').value;
  document.getElementById('sv-thresh').textContent = t.toFixed(2);

  const tp = Math.round(500 * (1 - (t - 0.1) * 0.3));
  const fp = Math.round(80  * (1 - (t - 0.1) * 0.7));
  const fn = Math.round(30  + (t - 0.1) * 80);
  const tn = Math.round(900 + (t - 0.1) * 100);

  const prec = (tp / (tp + fp) * 100).toFixed(1);
  const rec  = (tp / (tp + fn) * 100).toFixed(1);
  const f1   = (2 * prec * rec / (+prec + +rec)).toFixed(1);

  document.getElementById('cm-tp').textContent = tp;
  document.getElementById('cm-fp').textContent = fp;
  document.getElementById('cm-fn').textContent = fn;
  document.getElementById('cm-tn').textContent = tn;
  document.getElementById('mm-prec').textContent = prec + '%';
  document.getElementById('mm-rec').textContent  = rec  + '%';
  document.getElementById('mm-f1').textContent   = f1   + '%';
}

/* ---- LAB: BENCHMARK CHART ---- */
function initBenchmarkChart() {
  const el = document.getElementById('benchmarkChart');
  if (!el) return;
  new Chart(el, {
    type: 'bar',
    data: {
      labels: ['Random Forest', 'Neural Network', 'SVM', 'Decision Tree'],
      datasets: [{
        label: 'Accuracy (%)',
        data: [90.2, 88.5, 85.7, 81.4],
        backgroundColor: ['rgba(0,242,254,0.7)','rgba(121,40,202,0.7)','rgba(79,172,254,0.7)','rgba(0,255,135,0.7)'],
        borderColor:     ['#00f2fe','#7928ca','#4facfe','#00ff87'],
        borderWidth: 2, borderRadius: 8
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#f0f6ff', font: { family: 'Outfit' } } } },
      scales: {
        y: { beginAtZero: true, max: 100, ticks: { color: '#8fa4c8' }, grid: { color: 'rgba(255,255,255,0.04)' } },
        x: { ticks: { color: '#8fa4c8' }, grid: { color: 'rgba(255,255,255,0.04)' } }
      }
    }
  });
}

/* ---- MATRIX RAIN ---- */
let matrixTimer = null;
function initMatrixRain() {
  const c   = document.getElementById('matrix-canvas');
  const ctx = c.getContext('2d');
  c.width = innerWidth; c.height = innerHeight;
  const cols = Math.floor(c.width / 14);
  const drops = Array(cols).fill(1);

  window.matrixFrame = () => {
    ctx.fillStyle = 'rgba(4,8,16,0.07)';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#00ff87'; ctx.font = '13px monospace';
    for (let i = 0; i < drops.length; i++) {
      ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * 14, drops[i] * 14);
      if (drops[i] * 14 > c.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  };
}

function toggleMatrix() {
  const c = document.getElementById('matrix-canvas');
  if (c.style.display === 'block') {
    c.style.display = 'none'; clearInterval(matrixTimer); matrixTimer = null;
    printCLI('<span style="color:var(--green)">Matrix rain disabled.</span>');
  } else {
    c.style.display = 'block';
    matrixTimer = setInterval(window.matrixFrame, 33);
    printCLI('<span style="color:var(--green)">Matrix rain activated! Type "matrix" again to disable.</span>');
  }
}

/* ---- PROJECT MODAL ---- */
const MODAL_DATA = {
  churn: {
    color: 'var(--accent)', label: 'FEATURED CASE STUDY · MAY–JUN 2024',
    title: 'Smart Targeting & Churn Prevention System',
    body: `<p>End-to-end customer churn analytics system using Python, Flask, Random Forest, ANN ensemble, and MySQL. Achieved <strong>90% prediction accuracy</strong> with RFM segmentation and automated retention campaign triggers on AWS.</p>`,
    tags: ['Python','Flask','Random Forest','ANN','MySQL','AWS']
  },
  heart: {
    color: 'var(--accent2)', label: 'CLINICAL AI · AUG–OCT 2024',
    title: 'Heart Disease Early Detection System',
    body: `<p>Clinical decision support risk assessment platform using SVM & Random Forest. Comprehensive biostatistics feature correlation analysis with Matplotlib and Seaborn. Ethical AI aligned with strict false-negative minimization.</p>`,
    tags: ['Python','SVM','Random Forest','Matplotlib','Seaborn']
  },
  satyalens: {
    color: 'var(--accent)', label: 'GITHUB · SatyaLens',
    title: 'SatyaLens — Truth Verification Engine',
    body: `<p>Multimodal deepfake detection and media integrity verification system. Combines computer vision features and spectral audio decomposition with automated anomaly scoring for real vs. synthesized media.</p>`,
    link: 'https://github.com/Narendra6305/SatyaLens',
    tags: ['Python','Deep Learning','Computer Vision','Signal Processing']
  },
  employee: {
    color: 'var(--green)', label: 'GITHUB · Employee-Performance-Prediction',
    title: 'Employee Performance & Attrition Analysis',
    body: `<p>Machine Learning pipeline on HR data to forecast individual performance ratings and identify attrition risk. EDA, feature importance ranking, and actionable HR recommendations for workforce retention.</p>`,
    link: 'https://github.com/Narendra6305/Employee-Performance-Prediction',
    tags: ['Jupyter','Python','Scikit-Learn','Pandas','EDA']
  },
  texas: {
    color: 'var(--amber)', label: 'GITHUB · Texas-Salary-Prediction',
    title: 'Texas Public Employee Salary Forecast',
    body: `<p>Predictive regression model on Texas government payroll data. Gradient Boosting with feature sensitivity analysis — tenure vs. department impact on annual compensation.</p>`,
    link: 'https://github.com/Narendra6305/Texas-Salary-Prediction',
    tags: ['Python','Pandas','Regression','Gradient Boosting','Data Mining']
  },
  medintel: {
    color: 'var(--accent3)', label: 'GITHUB · Medintel-OS',
    title: 'Medintel-OS — Clinical Intelligence Dashboard',
    body: `<p>Medical telemetry monitoring web application with dynamic patient health record aggregation, real-time Chart.js diagnostic charts, and modular healthcare telemetry stream design.</p>`,
    link: 'https://github.com/Narendra6305/Medintel-OS',
    tags: ['JavaScript','Chart.js','REST API','Healthcare UI','HTML5/CSS3']
  },
  admis: {
    color: 'var(--accent)', label: 'GITHUB · ADMIS',
    title: 'ADMIS — Adaptive Data Intelligence System',
    body: `<p>Enterprise TypeScript data management architecture for structured query processing, type-safe schema validation, data transformation pipelines, and system telemetry analytics.</p>`,
    link: 'https://github.com/Narendra6305/ADMIS',
    tags: ['TypeScript','Node.js','SQL','Data Engineering']
  },
  aegis: {
    color: 'var(--accent2)', label: 'GITHUB · Aegis-Lite',
    title: 'Aegis-Lite — Anomaly & Threat Security System',
    body: `<p>Python security analytics suite for automated system log parsing, ML-based anomaly detection algorithms, risk event classification, and real-time threshold alert notifications.</p>`,
    link: 'https://github.com/Narendra6305/Aegis-Lite',
    tags: ['Python','Security Analytics','Anomaly Detection','ML']
  }
};

function openModal(key) {
  playBlip(680);
  completeQuest('quest_bento');
  const d   = MODAL_DATA[key];
  const bd  = document.getElementById('modal-body');
  const backdrop = document.getElementById('modal-backdrop');
  if (!d || !bd) return;
  bd.innerHTML = `
    <div style="font-family:var(--font-mono);font-size:0.78rem;color:${d.color};margin-bottom:10px;">${d.label}</div>
    <h2 style="font-family:var(--font-hd);font-size:1.7rem;font-weight:700;margin-bottom:16px;">${d.title}</h2>
    <div style="color:var(--text-mid);line-height:1.75;margin-bottom:20px;">${d.body}</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:${d.link?'20px':'0'}">
      ${d.tags.map(t => `<span class="chip">${t}</span>`).join('')}
    </div>
    ${d.link ? `<a href="${d.link}" target="_blank" class="btn-primary" style="margin-top:16px;display:inline-flex;align-items:center;gap:8px;padding:10px 22px;font-size:0.88rem;"><i class="fab fa-github"></i> View on GitHub</a>` : ''}
  `;
  backdrop.classList.add('open');
}
function closeModal() { document.getElementById('modal-backdrop').classList.remove('open'); }

/* ---- CLI TERMINAL ---- */
function toggleCLI() {
  playBlip(500);
  completeQuest('quest_cli');
  document.getElementById('cli-overlay').classList.toggle('open');
  setTimeout(() => document.getElementById('cli-input')?.focus(), 80);
}
window.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'k') { e.preventDefault(); toggleCLI(); }
  if (e.key === 'Escape') {
    document.getElementById('cli-overlay')?.classList.remove('open');
    document.getElementById('modal-backdrop')?.classList.remove('open');
  }
});

function printCLI(html) {
  const body = document.getElementById('cli-body');
  const div = document.createElement('div');
  div.style.marginBottom = '6px';
  div.innerHTML = html;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function handleCLI(e) {
  if (e.key !== 'Enter') return;
  const input = document.getElementById('cli-input');
  const cmd   = input.value.trim().toLowerCase();
  printCLI(`<span style="color:var(--accent)">narendra@analytics:~$</span> ${input.value}`);
  input.value = '';

  const responses = {
    help: `
      <span style="color:var(--accent)">Available commands:</span><br>
      &nbsp;• <b>wanted</b> — view One Piece bounty poster details<br>
      &nbsp;• <b>onepiece</b> — the secret of data analytics<br>
      &nbsp;• <b>yonko</b> — four emperors of big data<br>
      &nbsp;• <b>skills</b> — list technical proficiencies<br>
      &nbsp;• <b>projects</b> — list featured projects<br>
      &nbsp;• <b>whoami</b> — candidate profile<br>
      &nbsp;• <b>contact</b> — contact details<br>
      &nbsp;• <b>matrix</b> — toggle matrix rain overlay<br>
      &nbsp;• <b>clear</b> — clear terminal
    `,
    wanted: `
      <span style="color:#ffd700;font-weight:700">🏴‍☠️ WORLD GOVERNMENT WANTED POSTER 🏴‍☠️</span><br>
      NAME: KURUGODU SAI NARENDRA<br>
      TITLE: Captain of Data Analytics & Machine Learning<br>
      BOUNTY: ฿5,564,800,000 (Pirate King Level)<br>
      SPECIALTY: Conqueror's Haki SQL Queries & Neural Networks
    `,
    onepiece: `
      <span style="color:#ff0033;font-weight:700">"THE ONE PIECE IS REAL!" — Whitebeard</span><br>
      The One Piece of Data Analytics is precision insight hidden inside raw datasets.
    `,
    yonko: `
      <span style="color:#c084fc">The Four Emperors of Big Data:</span><br>
      1. Python & Machine Learning<br>
      2. MySQL & Distributed SQL<br>
      3. Power BI & Executive Telemetry<br>
      4. AWS Cloud Infrastructure
    `,
    skills: `
      Python (Scikit-Learn, Pandas)  ████████████ 92%<br>
      SQL / MySQL                    ███████████  90%<br>
      Power BI / DAX                 ██████████   88%<br>
      Machine Learning Ensemble      ██████████   90%<br>
      AWS Cloud Infrastructure       █████████    82%
    `,
    projects: `
      1. Smart Targeting & Churn Prevention (90% Acc)<br>
      2. Heart Disease Early Detection (Clinical AI)<br>
      3. SatyaLens — Truth Verification Engine<br>
      4. Employee Performance & Attrition ML<br>
      5. Texas Public Salary Forecast<br>
      6. Medintel-OS · ADMIS · Aegis-Lite
    `,
    whoami: `
      Name: KURUGODU SAI NARENDRA<br>
      Degree: MSc Data Analytics | CHRIST (Deemed to be University)<br>
      GPA: 3.47 / 4.0 | CDS Certification: Grade A Distinction
    `,
    contact: `
      Email: kurugodusai.narendra@arts.christuniversity.in<br>
      Phone: +91 6305525857<br>
      LinkedIn: linkedin.com/in/kurugodusainarendra
    `,
    matrix: null
  };

  if (cmd === 'matrix')     { toggleMatrix(); }
  else if (cmd === 'clear') { document.getElementById('cli-body').innerHTML = ''; }
  else if (responses[cmd])  { printCLI(responses[cmd]); }
  else if (cmd !== '')      { printCLI(`<span style="color:var(--accent3)">Command not found: '${cmd}'. Type 'help'.</span>`); }
}

/* ---- CONTACT FORM ---- */
function submitForm(e) {
  e.preventDefault();
  playBlip(880, 0.15);
  const name = document.getElementById('sender-name').value;
  starBurst(innerWidth / 2, innerHeight / 2);
  setTimeout(() => alert(`Thank you, ${name}! Your message was sent. I'll be in touch soon.`), 50);
  document.getElementById('contact-form').reset();
}

/* ---- STARDUST BURST ---- */
document.addEventListener('click', e => {
  if (e.target.closest('button,.btn-primary,.btn-ghost,.lab-tab,.proj-cta')) {
    starBurst(e.clientX, e.clientY);
    playBlip(700, 0.04);
  }
});

function starBurst(x, y) {
  for (let i = 0; i < 14; i++) {
    const p  = document.createElement('div');
    Object.assign(p.style, {
      position:'fixed', left:x+'px', top:y+'px',
      width:'5px', height:'5px', borderRadius:'50%',
      background: i % 2 === 0 ? 'var(--accent)' : 'var(--accent3)',
      boxShadow: `0 0 8px currentColor`,
      pointerEvents:'none', zIndex:'99999'
    });
    document.body.appendChild(p);
    const angle = Math.random() * Math.PI * 2;
    const speed = 25 + Math.random() * 55;
    p.animate([
      {transform:'translate(0,0) scale(1)', opacity:1},
      {transform:`translate(${Math.cos(angle)*speed}px,${Math.sin(angle)*speed}px) scale(0)`, opacity:0}
    ], { duration: 600, easing:'cubic-bezier(0.1,0.8,0.3,1)' }).onfinish = () => p.remove();
  }
}

/* ============================================================
   CYBERPUNK RPG GAMIFICATION ENGINE & AUDIO FX SYNTH
   ============================================================ */

let _sfxMuted = false;

function toggleSFX() {
  _sfxMuted = !_sfxMuted;
  const icon = document.getElementById('sfx-icon');
  if (icon) {
    icon.className = _sfxMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
  }
  if (!_sfxMuted) playBlip(800, 0.1);
}

function playQuestSound() {
  if (_sfxMuted) return;
  try {
    const ac = getAC();
    if (ac.state === 'suspended') ac.resume();
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    freqs.forEach((f, i) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = 'triangle';
      o.frequency.value = f;
      const t = ac.currentTime + i * 0.08;
      g.gain.setValueAtTime(0.09, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      o.connect(g); g.connect(ac.destination);
      o.start(t); o.stop(t + 0.25);
    });
  } catch(e) {}
}

function playZapSound() {
  if (_sfxMuted) return;
  try {
    const ac = getAC();
    if (ac.state === 'suspended') ac.resume();
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(1400, ac.currentTime);
    o.frequency.exponentialRampToValueAtTime(150, ac.currentTime + 0.2);
    g.gain.setValueAtTime(0.12, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.2);
    o.connect(g); g.connect(ac.destination);
    o.start(); o.stop(ac.currentTime + 0.2);
  } catch(e) {}
}

function playLevelUpSound() {
  if (_sfxMuted) return;
  try {
    const ac = getAC();
    if (ac.state === 'suspended') ac.resume();
    const freqs = [440, 554.37, 659.25, 880];
    freqs.forEach((f, i) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      const t = ac.currentTime + i * 0.1;
      g.gain.setValueAtTime(0.12, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      o.connect(g); g.connect(ac.destination);
      o.start(t); o.stop(t + 0.35);
    });
  } catch(e) {}
}

const CYBER_QUESTS = [
  { id: 'quest_boot', name: 'Set Sail for the Grand Line', desc: 'Explore down past the Hero Command Ship', xp: 50, icon: 'fa-ship' },
  { id: 'quest_bento', name: 'Examine Poneglyph Archives', desc: 'Inspect any high-impact ML project details', xp: 75, icon: 'fa-scroll' },
  { id: 'quest_sql', name: 'Conquer Marine SQL Base', desc: 'Run a live data query in the Analytics Lab', xp: 100, icon: 'fa-database' },
  { id: 'quest_matrix', name: 'Master Observation Haki', desc: 'Adjust the Confusion Matrix threshold slider', xp: 75, icon: 'fa-eye' },
  { id: 'quest_cli', name: 'Hack Den Den Mushi Terminal', desc: 'Open CLI (Ctrl+K) and type "wanted" or "help"', xp: 100, icon: 'fa-terminal' },
  { id: 'quest_anomaly', name: 'Hunt Sea Kings & Devil Fruits', desc: 'Zap and capture 3 floating Devil Fruits', xp: 150, icon: 'fa-apple-alt' }
];

const PLAYER_RANKS = [
  { minLvl: 1, title: 'CABIN BOY', reqXp: 100 },
  { minLvl: 2, title: 'EAST BLUE PIRATE', reqXp: 250 },
  { minLvl: 3, title: 'GRAND LINE NAVIGATOR', reqXp: 500 },
  { minLvl: 4, title: 'NEW WORLD COMMANDER', reqXp: 800 },
  { minLvl: 5, title: 'PIRATE KING OF DATA SCIENCE', reqXp: 1200 }
];

let RPG_STATE = {
  score: 0,
  level: 1,
  completedQuests: [],
  anomaliesCaptured: 0
};

function initCyberRPG() {
  loadRPGState();
  updateHUDUI();
  renderQuestsList();
  startAnomalyScheduler();
}

function loadRPGState() {
  try {
    const saved = localStorage.getItem('kn_cyber_rpg');
    if (saved) {
      const parsed = JSON.parse(saved);
      RPG_STATE.score = parsed.score || 0;
      RPG_STATE.level = parsed.level || 1;
      RPG_STATE.completedQuests = parsed.completedQuests || [];
      RPG_STATE.anomaliesCaptured = parsed.anomaliesCaptured || 0;
    }
  } catch(e) {}
}

function saveRPGState() {
  try {
    localStorage.setItem('kn_cyber_rpg', JSON.stringify(RPG_STATE));
  } catch(e) {}
}

function addXP(amount, reason = '') {
  RPG_STATE.score += amount;
  
  let currentRankIdx = 0;
  for (let i = PLAYER_RANKS.length - 1; i >= 0; i--) {
    if (RPG_STATE.score >= (i === 0 ? 0 : PLAYER_RANKS[i-1].reqXp)) {
      currentRankIdx = i;
      break;
    }
  }
  
  const newLevel = currentRankIdx + 1;
  const leveledUp = newLevel > RPG_STATE.level;
  RPG_STATE.level = newLevel;
  
  saveRPGState();
  updateHUDUI();

  showXPToast(amount, reason);

  if (leveledUp) {
    playLevelUpSound();
    const rankObj = PLAYER_RANKS[currentRankIdx];
    showXPToast(0, `🎉 BOUNTY INCREASED! You are now a ${rankObj.title}!`);
    unlockSecretThemes(newLevel);
  }
}

function unlockSecretThemes(lvl) {
  if (lvl >= 3) {
    const btn = document.getElementById('theme-darkmatter-btn');
    if (btn) btn.style.display = 'inline-block';
  }
  if (lvl >= 4) {
    const btn = document.getElementById('theme-pk-btn');
    if (btn) btn.style.display = 'inline-block';
  }
}

function completeQuest(questId) {
  if (RPG_STATE.completedQuests.includes(questId)) return;
  const q = CYBER_QUESTS.find(item => item.id === questId);
  if (!q) return;

  RPG_STATE.completedQuests.push(questId);
  playQuestSound();
  addXP(q.xp, `Quest Cleared: ${q.name}!`);
  renderQuestsList();
}

function updateHUDUI() {
  const lvlEl = document.getElementById('player-lvl');
  const titleEl = document.getElementById('player-title');
  const barFill = document.getElementById('xp-bar-fill');
  const xpText = document.getElementById('xp-text');
  const questCount = document.getElementById('quest-count');
  
  const qStatScore = document.getElementById('q-stat-score');
  const qStatLvl = document.getElementById('q-stat-lvl');
  const qStatCompleted = document.getElementById('q-stat-completed');
  const bountyVal = document.getElementById('wanted-bounty-val');

  const rankIdx = Math.min(RPG_STATE.level - 1, PLAYER_RANKS.length - 1);
  const currentRank = PLAYER_RANKS[rankIdx];
  const prevReq = rankIdx === 0 ? 0 : PLAYER_RANKS[rankIdx - 1].reqXp;
  const nextReq = currentRank.reqXp;

  const currentLevelProgress = RPG_STATE.score - prevReq;
  const levelMaxNeeded = nextReq - prevReq;
  const pct = Math.min(100, Math.max(0, Math.floor((currentLevelProgress / levelMaxNeeded) * 100)));

  if (lvlEl) lvlEl.textContent = `LVL 0${RPG_STATE.level}`;
  if (titleEl) titleEl.textContent = currentRank.title;
  if (barFill) barFill.style.width = `${pct}%`;
  if (xpText) xpText.textContent = `฿${RPG_STATE.score}M / ฿${nextReq}M`;
  if (questCount) questCount.textContent = `${RPG_STATE.completedQuests.length}/${CYBER_QUESTS.length}`;

  if (qStatScore) qStatScore.textContent = `฿${RPG_STATE.score}M`;
  if (qStatLvl) qStatLvl.textContent = RPG_STATE.level;
  if (qStatCompleted) qStatCompleted.textContent = `${RPG_STATE.completedQuests.length} / ${CYBER_QUESTS.length}`;

  if (bountyVal) {
    const totalBounty = 5564800000 + RPG_STATE.score * 1000000;
    bountyVal.textContent = totalBounty.toLocaleString();
  }

  unlockSecretThemes(RPG_STATE.level);
}

function renderQuestsList() {
  const container = document.getElementById('quests-list');
  if (!container) return;

  container.innerHTML = CYBER_QUESTS.map(q => {
    const isDone = RPG_STATE.completedQuests.includes(q.id);
    return `
      <div class="quest-item ${isDone ? 'completed' : ''}">
        <div class="quest-info">
          <div class="quest-icon">
            <i class="fas ${isDone ? 'fa-check' : q.icon}"></i>
          </div>
          <div>
            <div class="quest-name">${q.name}</div>
            <div class="quest-desc">${q.desc}</div>
          </div>
        </div>
        <div class="quest-reward">${isDone ? 'COMPLETED ✓' : '+ ฿' + q.xp + 'M'}</div>
      </div>
    `;
  }).join('');
}

function showXPToast(amount, msg) {
  const container = document.getElementById('xp-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'xp-toast';
  toast.innerHTML = `
    ${amount > 0 ? `<span class="xp-toast-val">+ ฿${amount}M</span>` : ''}
    <span>${msg}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

function openQuestsModal() {
  playBlip(650);
  const modal = document.getElementById('quests-modal');
  if (modal) modal.classList.add('open');
}

function closeQuestsModal() {
  playBlip(400);
  const modal = document.getElementById('quests-modal');
  if (modal) modal.classList.remove('open');
}

let anomalyActive = false;
function startAnomalyScheduler() {
  setInterval(() => {
    if (!anomalyActive) spawnAnomaly();
  }, 18000);
  setTimeout(() => {
    if (!anomalyActive) spawnAnomaly();
  }, 4000);
}

function spawnAnomaly() {
  anomalyActive = true;
  const alertEl = document.getElementById('anomaly-alert');
  if (alertEl) alertEl.classList.add('active');
  playZapSound();
}

function focusAnomaly() {
  if (!anomalyActive) return;
  anomalyActive = false;
  const alertEl = document.getElementById('anomaly-alert');
  if (alertEl) alertEl.classList.remove('active');

  playZapSound();
  starBurst(innerWidth / 2, innerHeight - 60);
  RPG_STATE.anomaliesCaptured++;
  addXP(50, 'Devil Fruit Captured!');

  if (RPG_STATE.anomaliesCaptured >= 3) {
    completeQuest('quest_anomaly');
  }
}

/* ---- CONQUEROR'S HAKI BURST ---- */
function triggerHakiBurst(e) {
  playHakiSound();
  starBurst(e ? e.clientX : innerWidth / 2, e ? e.clientY : innerHeight / 2);
  
  document.body.animate([
    { transform: 'translate(0, 0)' },
    { transform: 'translate(-6px, 4px)' },
    { transform: 'translate(6px, -4px)' },
    { transform: 'translate(-4px, -2px)' },
    { transform: 'translate(4px, 2px)' },
    { transform: 'translate(0, 0)' }
  ], { duration: 400, easing: 'ease-in-out' });

  showXPToast(0, '💥 CONQUEROR\'S HAKI UNLEASHED!');
}

function playHakiSound() {
  if (_sfxMuted) return;
  try {
    const ac = getAC();
    if (ac.state === 'suspended') ac.resume();
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(150, ac.currentTime);
    o.frequency.exponentialRampToValueAtTime(40, ac.currentTime + 0.5);
    g.gain.setValueAtTime(0.25, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.5);
    o.connect(g); g.connect(ac.destination);
    o.start(); o.stop(ac.currentTime + 0.5);
  } catch(e) {}
}

/* ---- ROAD PONEGLYPH DECRYPTOR & LAUGH TALE ---- */
let decryptedPoneglyphs = [];

function decryptedPoneglyph(id) {
  if (decryptedPoneglyphs.includes(id)) return;
  decryptedPoneglyphs.push(id);
  
  const el = document.getElementById(`poneglyph-${id}`);
  if (el) {
    el.classList.add('decrypted');
    el.querySelector('.pg-txt').textContent = `ROAD PONEGLYPH ${id} / IV [DECRYPTED ✓]`;
  }

  playQuestSound();
  addXP(100, `Road Poneglyph #${id} Decrypted!`);

  if (decryptedPoneglyphs.length === 4) {
    setTimeout(() => {
      openLaughTaleModal();
    }, 600);
  }
}

function openLaughTaleModal() {
  playHakiSound();
  addXP(1000, '🎉 DISCOVERED LAUGH TALE! + ฿1,000M BOUNTY!');
  const modal = document.getElementById('laughtale-modal');
  if (modal) modal.classList.add('open');
}

function closeLaughTaleModal() {
  playBlip(400);
  const modal = document.getElementById('laughtale-modal');
  if (modal) modal.classList.remove('open');
}

/* ---- PROJECT CATEGORY FILTER ---- */
function filterProjects(e, category) {
  playBlip(540);
  document.querySelectorAll('.proj-filter-btn').forEach(btn => btn.classList.remove('active'));
  if (e && e.currentTarget) e.currentTarget.classList.add('active');

  const cards = document.querySelectorAll('.proj-card-item');
  cards.forEach(card => {
    const catAttr = card.dataset.category || '';
    if (category === 'all' || catAttr.includes(category)) {
      card.classList.remove('hidden-proj');
    } else {
      card.classList.add('hidden-proj');
    }
  });
}

/* ---- SKILLS RADAR CHART ---- */
function initSkillsRadarChart() {
  const el = document.getElementById('skillsRadarChart');
  if (!el) return;
  new Chart(el, {
    type: 'radar',
    data: {
      labels: ['ML & AI', 'Advanced SQL', 'Power BI', 'AWS Cloud', 'Statistics & EDA', 'Data Engineering'],
      datasets: [{
        label: 'Captain Sai Narendra Mastery (%)',
        data: [92, 90, 88, 82, 91, 87],
        backgroundColor: 'rgba(0, 242, 254, 0.22)',
        borderColor: '#00f2fe',
        pointBackgroundColor: '#ff0033',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#ff0033',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.12)' },
          grid: { color: 'rgba(255, 255, 255, 0.08)' },
          pointLabels: { color: '#f0f6ff', font: { family: 'Outfit', size: 12, weight: 'bold' } },
          ticks: { color: '#8fa4c8', backdropColor: 'transparent' },
          min: 50, max: 100
        }
      },
      plugins: {
        legend: { labels: { color: '#f0f6ff', font: { family: 'Outfit' } } }
      }
    }
  });
}

