/* -------------------------------------------------------------
 *  ADVANCED DATA ANALYTICS COMMAND CENTER ENGINE
 *  Candidate: Kurugodu Sai Narendra (MSc Data Analytics)
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initScrollProgress();
  initParticleCanvas();
  initHologramCore();
  initTypedEffect();
  initCounters();
  initSkillBars();
  initNavbarScroll();
  initBenchmarkChart();
  initTiltAndSpotlight();
  initCardSpotlightTracking();
  initMatrixRain();
  initGlobalButtonParticles();
});

/* 1. THEME MATRIX SWITCHER */
function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  playSciFiBlip(440, 0.08);
}

/* 2. WEB AUDIO API SCI-FI SOUND FX SYNTHESIZER */
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playSciFiBlip(freq = 600, duration = 0.08, type = 'sine') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    // Silent fail if audio disabled
  }
}

/* 3. 3D HOLOGRAM DATA CORE ENGINE */
function initHologramCore() {
  const canvas = document.getElementById('hologram-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = 360);
  let height = (canvas.height = 360);

  const radius = 100;
  const nodeCount = 60;
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    nodes.push({
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.sin(phi) * Math.sin(theta),
      z: radius * Math.cos(phi),
      baseX: 0, baseY: 0, baseZ: 0
    });
  }

  let angleX = 0.005;
  let angleY = 0.008;

  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.0001;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.0001;
  });

  function renderHologram() {
    ctx.clearRect(0, 0, width, height);

    const rotX = angleX + mouseY;
    const rotY = angleY + mouseX;

    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

    const projected = [];

    nodes.forEach((n) => {
      // Rotate 3D point
      let y = n.y * cosX - n.z * sinX;
      let z = n.y * sinX + n.z * cosX;
      let x = n.x * cosY + z * sinY;
      z = -n.x * sinY + z * cosY;

      n.x = x; n.y = y; n.z = z;

      const scale = 250 / (250 + z);
      const projX = width / 2 + x * scale;
      const projY = height / 2 + y * scale;

      projected.push({ x: projX, y: projY, z: z, scale: scale });
    });

    // Draw connecting 3D core lines
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const dx = projected[i].x - projected[j].x;
        const dy = projected[i].y - projected[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 55) {
          ctx.beginPath();
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[j].x, projected[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${(1 - dist / 55) * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw glowing 3D nodes
    projected.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
      ctx.fillStyle = p.z > 0 ? '#00f2fe' : '#7928ca';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f2fe';
      ctx.fill();
    });

    requestAnimationFrame(renderHologram);
  }

  renderHologram();
}

/* 4. CUSTOM NEON DUAL-RING CURSOR PHYSICS */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  if (!dot || !outline) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverables = document.querySelectorAll('a, button, .glass-card, input, select, textarea, .lab-tab');
  hoverables.forEach((elem) => {
    elem.addEventListener('mouseenter', () => outline.classList.add('hovered'));
    elem.addEventListener('mouseleave', () => outline.classList.remove('hovered'));
  });
}

/* 5. TOP SCROLL PROGRESS BAR */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    bar.style.width = `${progress}%`;
  });
}

/* 6. CARD MOUSE SPOTLIGHT TRACKING */
function initCardSpotlightTracking() {
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* 7. DYNAMIC DATA PARTICLE CANVAS */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 16), 80);

  let mouse = { x: null, y: null, radius: 170 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.9;
      this.vy = (Math.random() - 0.5) * 0.9;
      this.size = Math.random() * 2.5 + 1;
      this.color = Math.random() > 0.5 ? '#00f2fe' : '#7928ca';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2.5;
          this.y -= (dy / dist) * force * 2.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          let opacity = 1 - dist / 140;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${opacity * 0.28})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* 8. DYNAMIC TYPED TEXT EFFECT */
function initTypedEffect() {
  const typedSpan = document.getElementById('typed-text');
  if (!typedSpan) return;

  const roles = [
    'Data Science Consultant Intern',
    'MSc Data Analytics Scholar',
    'Machine Learning Pipeline Specialist',
    'Predictive Analytics Specialist'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typedSpan.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedSpan.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentRole.length) {
      typeSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* 9. COUNTER ANIMATION */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach((counter) => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const increment = Math.ceil(target / 40);

          const updateCount = () => {
            count += increment;
            if (count >= target) {
              counter.textContent = target;
            } else {
              counter.textContent = count;
              setTimeout(updateCount, 40);
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
}

/* 10. ANIMATED SKILL BARS */
function initSkillBars() {
  const skillSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  if (!skillSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth;
        });
      }
    });
  }, { threshold: 0.2 });

  observer.observe(skillSection);
}

/* 11. NAVBAR SCROLL & ACTIVE SPY */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

/* 12. INTERACTIVE ANALYTICS LAB SWITCHING & SIMULATORS */
function switchLabTab(tabName) {
  playSciFiBlip(520, 0.06);
  const tabs = document.querySelectorAll('.lab-tab');
  const panels = document.querySelectorAll('.lab-panel');

  tabs.forEach((tab) => tab.classList.remove('active'));
  panels.forEach((panel) => panel.classList.remove('active'));

  event.currentTarget.classList.add('active');
  const activePanel = document.getElementById(`panel-${tabName}`);
  if (activePanel) activePanel.classList.add('active');
}

function updateChurnSim() {
  const spend = +document.getElementById('spend-slider').value;
  const tenure = +document.getElementById('tenure-slider').value;
  const tickets = +document.getElementById('tickets-slider').value;

  document.getElementById('spend-val').textContent = `$${spend}`;
  document.getElementById('tenure-val').textContent = `${tenure} mos`;
  document.getElementById('tickets-val').textContent = tickets;

  let baseScore = 0.5;
  baseScore -= (tenure / 60) * 0.4;
  baseScore += (tickets / 10) * 0.5;
  if (spend < 200) baseScore += 0.2;
  else if (spend > 800) baseScore -= 0.15;

  let probability = Math.min(Math.max((baseScore * 100).toFixed(1), 3.2), 97.8);
  const scoreElem = document.getElementById('churn-score');
  const statusElem = document.getElementById('churn-status');

  scoreElem.textContent = `${probability}%`;

  if (probability < 35) {
    statusElem.innerHTML = `<i class="fas fa-check-circle"></i> Low Risk Customer (High Loyalty Target)`;
    statusElem.style.color = 'var(--green)';
  } else if (probability < 65) {
    statusElem.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Moderate Risk (Retention Campaign Advised)`;
    statusElem.style.color = 'var(--amber)';
  } else {
    statusElem.innerHTML = `<i class="fas fa-times-circle"></i> High Churn Risk (Immediate Intervention Required)`;
    statusElem.style.color = 'var(--pink)';
  }
}

function updateHeartSim() {
  const bp = +document.getElementById('bp-slider').value;
  const chol = +document.getElementById('chol-slider').value;
  const hr = +document.getElementById('hr-slider').value;

  document.getElementById('bp-val').textContent = bp;
  document.getElementById('chol-val').textContent = chol;
  document.getElementById('hr-val').textContent = hr;

  let riskScore = 10;
  if (bp > 140) riskScore += (bp - 140) * 0.4;
  if (chol > 240) riskScore += (chol - 240) * 0.3;
  if (hr < 110) riskScore += 15;

  let riskPct = Math.min(Math.max(riskScore.toFixed(1), 5.0), 95.0);
  const scoreElem = document.getElementById('heart-score');
  const statusElem = document.getElementById('heart-status');

  scoreElem.textContent = `${riskPct}%`;

  if (riskPct < 30) {
    statusElem.innerHTML = `<i class="fas fa-shield-alt"></i> Low Risk Biomarkers`;
    statusElem.style.color = 'var(--green)';
  } else if (riskPct < 60) {
    statusElem.innerHTML = `<i class="fas fa-exclamation-circle"></i> Elevated Cardiovascular Risk Factor`;
    statusElem.style.color = 'var(--amber)';
  } else {
    statusElem.innerHTML = `<i class="fas fa-heart-broken"></i> High Risk Indicator (Clinical Decision Support Alert)`;
    statusElem.style.color = 'var(--pink)';
  }
}

/* 13. LIVE SQL SANDBOX ENGINE */
const sqlQueries = {
  churn: {
    code: `SELECT customer_id, monthly_spend, tenure_months, churn_probability FROM customer_telemetry WHERE churn_probability > 0.65 ORDER BY monthly_spend DESC LIMIT 5;`,
    head: ['customer_id', 'monthly_spend', 'tenure_months', 'churn_probability'],
    body: [
      ['CUST_9402', '$1,240', '3 mos', '<span style="color: var(--pink); font-weight:700;">84.2%</span>'],
      ['CUST_8819', '$980', '5 mos', '<span style="color: var(--pink); font-weight:700;">76.5%</span>'],
      ['CUST_7210', '$850', '2 mos', '<span style="color: var(--pink); font-weight:700;">71.8%</span>']
    ],
    info: '⚡ Executed in 0.03ms | 3 rows returned | Cache Status: HIT'
  },
  high_spend: {
    code: `SELECT customer_id, rfm_segment, total_lifetime_val FROM rfm_analytics_clusters WHERE rfm_segment = 'VIP_Platinum' ORDER BY total_lifetime_val DESC LIMIT 3;`,
    head: ['customer_id', 'rfm_segment', 'total_lifetime_val'],
    body: [
      ['CUST_1042', '<span style="color: var(--cyan); font-weight:700;">VIP_Platinum</span>', '$14,250'],
      ['CUST_3081', '<span style="color: var(--cyan); font-weight:700;">VIP_Platinum</span>', '$11,900'],
      ['CUST_5520', '<span style="color: var(--cyan); font-weight:700;">VIP_Platinum</span>', '$9,840']
    ],
    info: '⚡ Executed in 0.02ms | 3 rows returned | Cache Status: HIT'
  },
  model_metrics: {
    code: `SELECT algorithm_name, accuracy_pct, precision_pct, recall_pct FROM model_evaluation_logs ORDER BY accuracy_pct DESC;`,
    head: ['algorithm_name', 'accuracy_pct', 'precision_pct', 'recall_pct'],
    body: [
      ['Random Forest Ensemble', '<span style="color: var(--green); font-weight:700;">90.2%</span>', '91.4%', '88.2%'],
      ['Artificial Neural Network', '88.5%', '89.1%', '87.6%'],
      ['Support Vector Machine', '85.7%', '86.4%', '84.0%']
    ],
    info: '⚡ Executed in 0.04ms | 3 rows returned | Cache Status: HIT'
  }
};

function loadPresetSQLQuery() {
  const sel = document.getElementById('sql-query-select').value;
  const q = sqlQueries[sel];
  document.getElementById('sql-query-display').textContent = q.code;
  executeSQLQuery();
}

function executeSQLQuery() {
  playSciFiBlip(780, 0.09);
  const sel = document.getElementById('sql-query-select').value;
  const q = sqlQueries[sel];

  const head = document.getElementById('sql-table-head');
  const body = document.getElementById('sql-table-body');
  const info = document.getElementById('sql-status-info');

  head.innerHTML = q.head.map(h => `<th>${h}</th>`).join('');
  body.innerHTML = q.body.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
  info.textContent = q.info;
}

/* 14. ML CONFUSION MATRIX CALCULATOR */
function updateConfusionMatrix() {
  const t = +document.getElementById('threshold-slider').value;
  document.getElementById('threshold-val').textContent = t.toFixed(2);

  // Dynamic confusion matrix cell calculations relative to threshold
  const tp = Math.round(500 * (1 - (t - 0.1) * 0.3));
  const fp = Math.round(80 * (1 - (t - 0.1) * 0.7));
  const fn = Math.round(30 + (t - 0.1) * 80);
  const tn = Math.round(900 + (t - 0.1) * 100);

  const precision = ((tp / (tp + fp)) * 100).toFixed(1);
  const recall = ((tp / (tp + fn)) * 100).toFixed(1);
  const f1 = ((2 * precision * recall) / (+precision + +recall)).toFixed(1);

  document.getElementById('cell-tp').textContent = tp;
  document.getElementById('cell-fp').textContent = fp;
  document.getElementById('cell-fn').textContent = fn;
  document.getElementById('cell-tn').textContent = tn;

  document.getElementById('mat-precision').textContent = `${precision}%`;
  document.getElementById('mat-recall').textContent = `${recall}%`;
  document.getElementById('mat-f1').textContent = `${f1}%`;
}

/* 15. ALGORITHM BENCHMARK CHART (CHART.JS) */
function initBenchmarkChart() {
  const ctx = document.getElementById('benchmarkChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Random Forest Ensemble', 'Artificial Neural Network', 'Support Vector Machine', 'Decision Tree Classifier'],
      datasets: [
        {
          label: 'Prediction Accuracy (%)',
          data: [90.2, 88.5, 85.7, 81.4],
          backgroundColor: [
            'rgba(0, 242, 254, 0.8)',
            'rgba(121, 40, 202, 0.8)',
            'rgba(79, 172, 254, 0.8)',
            'rgba(0, 255, 135, 0.8)'
          ],
          borderColor: [
            '#00f2fe',
            '#7928ca',
            '#4facfe',
            '#00ff87'
          ],
          borderWidth: 2,
          borderRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#f8fafc', font: { family: 'Outfit' } }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { color: '#94a3b8' },
          grid: { color: 'rgba(255, 255, 255, 0.05)' }
        },
        x: {
          ticks: { color: '#94a3b8' },
          grid: { color: 'rgba(255, 255, 255, 0.05)' }
        }
      }
    }
  });
}

/* 16. 3D TILT EFFECT */
function initTiltAndSpotlight() {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

/* 17. PROJECT MODALS */
function openProjectModal(projectKey) {
  playSciFiBlip(680, 0.08);
  const overlay = document.getElementById('project-modal');
  const content = document.getElementById('modal-content');

  if (projectKey === 'churn') {
    content.innerHTML = `
      <div style="font-family: var(--font-mono); color: var(--cyan); font-size: 0.85rem; margin-bottom: 8px;">CASE STUDY: MAY 2024 – JUN 2024</div>
      <h2 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 16px;">Smart Targeting & Churn Prevention System</h2>
      <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
        Designed and engineered an end-to-end customer churn analytics system utilizing Python, Flask, Random Forest, Artificial Neural Networks (ANN), and MySQL database integrations.
      </p>

      <h4 style="color: var(--cyan); margin-bottom: 10px;">Key Technical Innovations</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-muted); line-height: 1.8; margin-bottom: 20px;">
        <li>Attained <strong>90% model prediction accuracy</strong> using an ensemble voting classifier combining Random Forest and ANN architectures.</li>
        <li>Engineered RFM (Recency, Frequency, Monetary) feature extraction pipelines inside MySQL to segment high-value customer clusters.</li>
        <li>Built an executive dashboard interface with automated retention campaign triggers.</li>
      </ul>

      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <span class="tag">Python</span>
        <span class="tag">Flask</span>
        <span class="tag">Random Forest</span>
        <span class="tag">ANN</span>
        <span class="tag">MySQL</span>
      </div>
    `;
  } else if (projectKey === 'heart') {
    content.innerHTML = `
      <div style="font-family: var(--font-mono); color: var(--purple); font-size: 0.85rem; margin-bottom: 8px;">BIOSTATISTICS CASE STUDY: AUG 2024 – OCT 2024</div>
      <h2 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 16px;">Heart Disease Early Detection System</h2>
      <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
        Engineered a clinical decision support risk assessment platform using Python machine learning models (SVM & Random Forest) with visual biostatistics diagnostics.
      </p>

      <h4 style="color: var(--purple); margin-bottom: 10px;">Key Technical Innovations</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-muted); line-height: 1.8; margin-bottom: 20px;">
        <li>Interpretable risk scoring system designed specifically for clinical decision support.</li>
        <li>Comprehensive biostatistics feature correlations computed with Matplotlib and Seaborn heatmaps.</li>
        <li>Strict adherence to healthcare Ethical AI standards, model fairness, and false-negative minimization.</li>
      </ul>

      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <span class="tag">Python</span>
        <span class="tag">Random Forest</span>
        <span class="tag">SVM</span>
        <span class="tag">Matplotlib</span>
        <span class="tag">Seaborn</span>
      </div>
    `;
  } else if (projectKey === 'satyalens') {
    content.innerHTML = `
      <div style="font-family: var(--font-mono); color: var(--cyan); font-size: 0.85rem; margin-bottom: 8px;">GITHUB REPOSITORY: SatyaLens</div>
      <h2 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 16px;">SatyaLens — Truth Verification Engine</h2>
      <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
        SatyaLens is a specialized multimodal truth verification system designed in Python. It analyzes media content and data signals to detect deepfake manipulations, signal anomalies, and automated misinformation patterns.
      </p>

      <h4 style="color: var(--cyan); margin-bottom: 10px;">Key Technical Capabilities</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-muted); line-height: 1.8; margin-bottom: 20px;">
        <li>Multimodal signal processing combining computer vision features and spectral audio decomposition.</li>
        <li>Automated anomaly scoring engine giving confidence indices for real vs. synthesized media.</li>
        <li>Extensible Python pipeline architecture ready for API integration.</li>
      </ul>

      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px;">
        <span class="tag">Python</span>
        <span class="tag">Deep Learning</span>
        <span class="tag">Computer Vision</span>
        <span class="tag">Signal Processing</span>
      </div>
      <a href="https://github.com/Narendra6305/SatyaLens" target="_blank" class="btn btn-primary" style="padding: 8px 20px; font-size: 0.88rem;">
        <i class="fab fa-github"></i> View GitHub Repository
      </a>
    `;
  } else if (projectKey === 'employee') {
    content.innerHTML = `
      <div style="font-family: var(--font-mono); color: var(--green); font-size: 0.85rem; margin-bottom: 8px;">GITHUB REPOSITORY: Employee-Performance-Prediction</div>
      <h2 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 16px;">Employee Performance & Attrition Analysis</h2>
      <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
        Machine Learning project analyzing organizational workforce data to forecast individual performance ratings and pinpoint critical turnover drivers.
      </p>

      <h4 style="color: var(--green); margin-bottom: 10px;">Key Analytics Insights</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-muted); line-height: 1.8; margin-bottom: 20px;">
        <li>Comprehensive Exploratory Data Analysis (EDA) on employee demographics, work-life balance ratios, and department workloads.</li>
        <li>Supervised classification models evaluating feature importance ranking for retention strategy optimization.</li>
        <li>Actionable HR recommendations designed to improve workforce satisfaction.</li>
      </ul>

      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px;">
        <span class="tag">Jupyter Notebook</span>
        <span class="tag">Python</span>
        <span class="tag">Scikit-Learn</span>
        <span class="tag">Pandas</span>
      </div>
      <a href="https://github.com/Narendra6305/Employee-Performance-Prediction" target="_blank" class="btn btn-primary" style="padding: 8px 20px; font-size: 0.88rem;">
        <i class="fab fa-github"></i> View GitHub Repository
      </a>
    `;
  } else if (projectKey === 'texas') {
    content.innerHTML = `
      <div style="font-family: var(--font-mono); color: var(--amber); font-size: 0.85rem; margin-bottom: 8px;">GITHUB REPOSITORY: Texas-Salary-Prediction</div>
      <h2 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 16px;">Texas Public Employee Salary Forecast</h2>
      <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
        Data regression modeling project focused on predicting government employee salaries in Texas based on agency codes, job titles, experience level, and gender metrics.
      </p>

      <h4 style="color: var(--amber); margin-bottom: 10px;">Model Workflow</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-muted); line-height: 1.8; margin-bottom: 20px;">
        <li>Preprocessing & categorical encoding of state agency payroll records.</li>
        <li>Evaluation of multiple regression algorithms (Linear, Decision Trees, Gradient Boosting) for minimum RMSE error.</li>
        <li>Feature sensitivity analysis highlighting tenure vs. department impact on annual pay.</li>
      </ul>

      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px;">
        <span class="tag">Python</span>
        <span class="tag">Pandas</span>
        <span class="tag">Regression Analysis</span>
        <span class="tag">Data Mining</span>
      </div>
      <a href="https://github.com/Narendra6305/Texas-Salary-Prediction" target="_blank" class="btn btn-primary" style="padding: 8px 20px; font-size: 0.88rem;">
        <i class="fab fa-github"></i> View GitHub Repository
      </a>
    `;
  } else if (projectKey === 'medintel') {
    content.innerHTML = `
      <div style="font-family: var(--font-mono); color: var(--pink); font-size: 0.85rem; margin-bottom: 8px;">GITHUB REPOSITORY: Medintel-OS</div>
      <h2 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 16px;">Medintel-OS — Clinical Intelligence Dashboard</h2>
      <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
        A modern web interface designed for medical telemetry monitoring, clinical analytics, and interactive patient metric reporting.
      </p>

      <h4 style="color: var(--pink); margin-bottom: 10px;">Core Features</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-muted); line-height: 1.8; margin-bottom: 20px;">
        <li>Dynamic patient health record aggregation dashboard.</li>
        <li>Real-time visual diagnostic charts powered by JavaScript.</li>
        <li>Modular design tailored for healthcare telemetry streams.</li>
      </ul>

      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px;">
        <span class="tag">JavaScript</span>
        <span class="tag">Healthcare UI</span>
        <span class="tag">Chart.js</span>
        <span class="tag">HTML5/CSS3</span>
      </div>
      <a href="https://github.com/Narendra6305/Medintel-OS" target="_blank" class="btn btn-primary" style="padding: 8px 20px; font-size: 0.88rem;">
        <i class="fab fa-github"></i> View GitHub Repository
      </a>
    `;
  } else if (projectKey === 'admis') {
    content.innerHTML = `
      <div style="font-family: var(--font-mono); color: var(--cyan); font-size: 0.85rem; margin-bottom: 8px;">GITHUB REPOSITORY: ADMIS</div>
      <h2 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 16px;">ADMIS — Adaptive Data Intelligence System</h2>
      <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
        Enterprise data management and intelligence architecture written in TypeScript for structured query processing, data transformation, and system telemetry.
      </p>

      <h4 style="color: var(--cyan); margin-bottom: 10px;">Technical Highlights</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-muted); line-height: 1.8; margin-bottom: 20px;">
        <li>TypeScript type-safe data schema validation and transformation pipelines.</li>
        <li>Performant query optimization algorithms for analytical data views.</li>
        <li>Clean modular code structure ready for enterprise integration.</li>
      </ul>

      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px;">
        <span class="tag">TypeScript</span>
        <span class="tag">Node.js</span>
        <span class="tag">Data Engineering</span>
        <span class="tag">SQL</span>
      </div>
      <a href="https://github.com/Narendra6305/ADMIS" target="_blank" class="btn btn-primary" style="padding: 8px 20px; font-size: 0.88rem;">
        <i class="fab fa-github"></i> View GitHub Repository
      </a>
    `;
  } else if (projectKey === 'aegis') {
    content.innerHTML = `
      <div style="font-family: var(--font-mono); color: var(--purple); font-size: 0.85rem; margin-bottom: 8px;">GITHUB REPOSITORY: Aegis-Lite</div>
      <h2 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 16px;">Aegis-Lite — Anomaly & Threat Security System</h2>
      <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
        Python security analytics suite providing automated system log parsing, anomaly detection algorithms, and event risk classification.
      </p>

      <h4 style="color: var(--purple); margin-bottom: 10px;">Technical Features</h4>
      <ul style="list-style: square; padding-left: 20px; color: var(--text-muted); line-height: 1.8; margin-bottom: 20px;">
        <li>Lightweight log parser for security telemetric datasets.</li>
        <li>Machine Learning anomaly detection models categorizing risk threat levels.</li>
        <li>Real-time threshold alert notifications.</li>
      </ul>

      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px;">
        <span class="tag">Python</span>
        <span class="tag">Security Analytics</span>
        <span class="tag">Anomaly Detection</span>
      </div>
      <a href="https://github.com/Narendra6305/Aegis-Lite" target="_blank" class="btn btn-primary" style="padding: 8px 20px; font-size: 0.88rem;">
        <i class="fab fa-github"></i> View GitHub Repository
      </a>
    `;
  }

  overlay.classList.add('active');
}

function closeProjectModal() {
  document.getElementById('project-modal').classList.remove('active');
}

/* 18. DEVELOPER CLI TERMINAL ENGINE */
function toggleCLIModal() {
  playSciFiBlip(500, 0.08);
  const modal = document.getElementById('cli-modal');
  modal.classList.toggle('active');
  if (modal.classList.contains('active')) {
    setTimeout(() => document.getElementById('cli-input').focus(), 100);
  }
}

window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    toggleCLIModal();
  }
});

function handleCLISubmit(e) {
  if (e.key !== 'Enter') return;
  const input = document.getElementById('cli-input');
  const output = document.getElementById('cli-output');
  const cmd = input.value.trim().toLowerCase();

  const line = document.createElement('div');
  line.innerHTML = `<span style="color: var(--cyan);">narendra@analytics:~$</span> ${input.value}`;
  output.appendChild(line);

  const response = document.createElement('div');
  response.style.marginBottom = '10px';

  if (cmd === 'help') {
    response.innerHTML = `
      Available CLI Commands:<br>
      - <span style="color: var(--cyan);">skills</span>: View technical stack & proficiency percentages<br>
      - <span style="color: var(--cyan);">projects</span>: List featured Machine Learning & Data Engineering projects<br>
      - <span style="color: var(--cyan);">whoami</span>: Display candidate summary & education details<br>
      - <span style="color: var(--cyan);">matrix</span>: Toggle digital rain Matrix Mode overlay<br>
      - <span style="color: var(--cyan);">contact</span>: Display email, phone, and LinkedIn info<br>
      - <span style="color: var(--cyan);">clear</span>: Clear terminal screen
    `;
  } else if (cmd === 'skills') {
    response.innerHTML = `
      TECHNICAL STACK MATRIX:<br>
      - Python (Scikit-Learn, Pandas, NumPy): [████████████████████] 92%<br>
      - SQL (MySQL, Advanced Querying):     [███████████████████ ] 90%<br>
      - Power BI & Executive Dashboards:  [██████████████████  ] 88%<br>
      - Tableau & Data Visualization:    [█████████████████   ] 85%<br>
      - AWS Cloud Infrastructure:          [████████████████    ] 82%
    `;
  } else if (cmd === 'projects') {
    response.innerHTML = `
      FEATURED PROJECTS:<br>
      1. Smart Targeting & Churn Prevention System (90% Acc)<br>
      2. Heart Disease Early Detection System (Ethical AI)<br>
      3. SatyaLens — Truth Verification Engine<br>
      4. Employee Performance & Attrition Analysis<br>
      5. Texas Public Employee Salary Forecast<br>
      6. Medintel-OS & ADMIS Systems
    `;
  } else if (cmd === 'whoami') {
    response.innerHTML = `
      Candidate: KURUGODU SAI NARENDRA<br>
      Degree: MSc in Data Analytics | CHRIST (Deemed to be University), Bengaluru<br>
      GPA: 3.47 / 4.0 | Certified Data Scientist Distinction (Grade A)
    `;
  } else if (cmd === 'matrix') {
    toggleMatrixRain();
    response.innerHTML = `<span style="color: var(--green);">[SYSTEM] Matrix Rain Mode Toggled!</span>`;
  } else if (cmd === 'contact') {
    response.innerHTML = `
      Email: kurugodusai.narendra@arts.christuniversity.in<br>
      Phone: +91 6305525857 | LinkedIn: linkedin.com/in/kurugodusainarendra
    `;
  } else if (cmd === 'clear') {
    output.innerHTML = '';
    input.value = '';
    return;
  } else if (cmd !== '') {
    response.innerHTML = `<span style="color: var(--pink);">Command not found: '${cmd}'. Type 'help' for options.</span>`;
  }

  output.appendChild(response);
  input.value = '';
  document.getElementById('cli-body').scrollTop = document.getElementById('cli-body').scrollHeight;
}

/* 19. DIGITAL RAIN MATRIX MODE OVERLAY */
let matrixInterval = null;
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = '010101010101010101010101010101010101010101';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(7, 10, 18, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff87';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  window.matrixDraw = drawMatrix;
}

function toggleMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  if (canvas.style.display === 'block') {
    canvas.style.display = 'none';
    clearInterval(matrixInterval);
    matrixInterval = null;
  } else {
    canvas.style.display = 'block';
    if (!matrixInterval) {
      matrixInterval = setInterval(window.matrixDraw, 33);
    }
  }
}

/* 20. AUDIO VISUALIZER PULSE WIDGET */
function toggleAudioPulse() {
  playSciFiBlip(550, 0.1);
  const widget = document.getElementById('audio-widget');
  const text = document.getElementById('audio-status-text');
  widget.classList.toggle('active');

  if (widget.classList.contains('active')) {
    text.textContent = 'Audio Active';
    text.style.color = 'var(--cyan)';
  } else {
    text.textContent = 'Ambient Pulse';
    text.style.color = 'var(--text-main)';
  }
}

/* 21. CLICK STARDUST / CONFETTI EXPLOSION ENGINE */
function initGlobalButtonParticles() {
  window.addEventListener('click', (e) => {
    if (e.target.closest('button, .btn, .lab-tab, .glass-card')) {
      playSciFiBlip(700, 0.05);
      triggerStardustBurst(e.clientX, e.clientY);
    }
  });
}

function triggerStardustBurst(x, y) {
  const count = 16;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.style.position = 'fixed';
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.width = '6px';
    p.style.height = '6px';
    p.style.borderRadius = '50%';
    p.style.background = Math.random() > 0.5 ? 'var(--cyan)' : 'var(--pink)';
    p.style.boxShadow = `0 0 12px ${p.style.background}`;
    p.style.pointerEvents = 'none';
    p.style.zIndex = '99999';

    document.body.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 65 + 25;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    p.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
    ], {
      duration: 650,
      easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
    }).onfinish = () => p.remove();
  }
}

/* 22. CONTACT FORM SUBMISSION FEEDBACK */
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('sender-name').value;
  playSciFiBlip(880, 0.15);
  triggerStardustBurst(window.innerWidth / 2, window.innerHeight / 2);
  alert(`Thank you ${name}! Your message has been sent successfully. I will get back to you shortly.`);
  document.getElementById('contact-form').reset();
}
