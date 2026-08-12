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
  setupTheme();
}

/* ---- THEME ---- */
function setupTheme() {
  const saved = localStorage.getItem('kn-theme') || 'cyan';
  setTheme(saved);
}
function setTheme(name) {
  document.documentElement.setAttribute('data-theme', name);
  localStorage.setItem('kn-theme', name);
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.t-${name}`);
  if (btn) btn.classList.add('active');
  playBlip(440);
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

/* ---- FULL-PAGE NEURAL NETWORK CANVAS ---- */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes, mx = 0, my = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildNodes();
  }

  function buildNodes() {
    const count = Math.min(Math.floor(W / 20), 90);
    nodes = Array.from({length: count}, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      r: Math.random() * 2.2 + 1,
      hue: Math.random() > 0.6 ? 0 : Math.random() > 0.5 ? 270 : 190
    }));
  }

  // Get accent color from CSS
  function accentColor(alpha) {
    const theme = document.documentElement.getAttribute('data-theme') || 'cyan';
    switch(theme) {
      case 'violet':  return `rgba(192,132,252,${alpha})`;
      case 'emerald': return `rgba(0,255,135,${alpha})`;
      case 'pink':    return `rgba(255,0,127,${alpha})`;
      default:        return `rgba(0,242,254,${alpha})`;
    }
  }

  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  window.addEventListener('resize', resize);
  resize();

  let frameId;
  function draw() {
    ctx.clearRect(0, 0, W, H);

    nodes.forEach(n => {
      // Repel from mouse
      const dx = n.x - mx, dy = n.y - my;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 160) {
        const f = (160 - dist) / 160 * 1.8;
        n.vx += (dx / dist) * f * 0.06;
        n.vy += (dy / dist) * f * 0.06;
      }
      // Speed limit
      const spd = Math.sqrt(n.vx*n.vx + n.vy*n.vy);
      if (spd > 1.8) { n.vx *= 1.8/spd; n.vy *= 1.8/spd; }

      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // Draw edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 130) {
          const a = (1 - dist / 130) * 0.3;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = accentColor(a);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = accentColor(0.7);
      ctx.shadowBlur = 10;
      ctx.shadowColor = accentColor(1);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    frameId = requestAnimationFrame(draw);
  }
  draw();
}

/* ---- HERO ORB CANVAS (3D SPHERE) ---- */
function initOrbCanvas() {
  const canvas = document.getElementById('orb-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width  = 340;
  const H = canvas.height = 340;
  const cx = W / 2, cy = H / 2, R = 110;
  const nodeCount = 80;

  let nodes = Array.from({length: nodeCount}, () => {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    return {
      x: R * Math.sin(phi) * Math.cos(theta),
      y: R * Math.sin(phi) * Math.sin(theta),
      z: R * Math.cos(phi)
    };
  });

  let ax = 0, ay = 0;
  let mx = 0, my = 0;

  document.querySelector('.neural-orb-wrapper')?.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mx = (e.clientX - rect.left - W/2) / W;
    my = (e.clientY - rect.top  - H/2) / H;
  });

  function accentColor(alpha) {
    const theme = document.documentElement.getAttribute('data-theme') || 'cyan';
    switch(theme) {
      case 'violet':  return `rgba(192,132,252,${alpha})`;
      case 'emerald': return `rgba(0,255,135,${alpha})`;
      case 'pink':    return `rgba(255,0,127,${alpha})`;
      default:        return `rgba(0,242,254,${alpha})`;
    }
  }

  function rotateX(nodes, angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    return nodes.map(n => ({ x: n.x, y: n.y*c - n.z*s, z: n.y*s + n.z*c }));
  }
  function rotateY(nodes, angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    return nodes.map(n => ({ x: n.x*c + n.z*s, y: n.y, z: -n.x*s + n.z*c }));
  }

  function frame() {
    ax += 0.006 + my * 0.003;
    ay += 0.009 + mx * 0.003;

    let rotated = rotateX(nodes, ax);
    rotated = rotateY(rotated, ay);

    const projected = rotated.map(n => {
      const scale = 260 / (260 + n.z);
      return { px: cx + n.x * scale, py: cy + n.y * scale, z: n.z, s: scale };
    });

    ctx.clearRect(0, 0, W, H);

    // Central core glow
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
    grad.addColorStop(0, accentColor(0.12));
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Edges
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const dx = projected[i].px - projected[j].px;
        const dy = projected[i].py - projected[j].py;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 60) {
          ctx.beginPath();
          ctx.moveTo(projected[i].px, projected[i].py);
          ctx.lineTo(projected[j].px, projected[j].py);
          ctx.strokeStyle = accentColor((1 - d/60) * 0.45);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Nodes
    projected.forEach(p => {
      const brightness = (p.z + R) / (2 * R);
      ctx.beginPath();
      ctx.arc(p.px, p.py, 2.2 * p.s, 0, Math.PI * 2);
      ctx.fillStyle = accentColor(0.3 + brightness * 0.7);
      ctx.shadowBlur = 8 * brightness;
      ctx.shadowColor = accentColor(1);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(frame);
  }
  frame();
}

/* ---- CUSTOM CURSOR ---- */
function initCustomCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = innerWidth/2, my = innerHeight/2;
  let rx = mx, ry = my;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a,button,.glass-card,.lab-tab,.proj-cta').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
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
  const roles = [
    'Data Science Consultant Intern',
    'MSc Data Analytics Scholar',
    'ML Pipeline Specialist',
    'Predictive Analytics Expert'
  ];
  let ri = 0, ci = 0, deleting = false;
  function tick() {
    const r = roles[ri];
    el.textContent = deleting ? r.slice(0, ci-1) : r.slice(0, ci+1);
    deleting ? ci-- : ci++;
    let delay = deleting ? 38 : 78;
    if (!deleting && ci === r.length)    { delay = 2000; deleting = true; }
    else if (deleting && ci === 0)       { deleting = false; ri = (ri+1) % roles.length; delay = 380; }
    setTimeout(tick, delay);
  }
  tick();
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
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
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
      &nbsp;• <b>skills</b> — list technical proficiencies<br>
      &nbsp;• <b>projects</b> — list featured projects<br>
      &nbsp;• <b>whoami</b> — candidate profile<br>
      &nbsp;• <b>contact</b> — contact details<br>
      &nbsp;• <b>matrix</b> — toggle matrix rain overlay<br>
      &nbsp;• <b>clear</b> — clear terminal
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
