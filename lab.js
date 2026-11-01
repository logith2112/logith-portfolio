/**
 * =========================================================================
 * LAB.JS
 * Client-Side Interactive Lab for Logith T's Portfolio
 * 
 * Strict constraints adhered to:
 * - Plain JavaScript, zero external libraries, zero build step.
 * - Single file with editable CFG object at the top.
 * - Reuses existing colors (#C9A227, #E5C76B, #0A0A0A, #161616, #2A2418),
 *   fonts ('Inter', 'Space Grotesk', 'Playfair Display', font-mono),
 *   borders and card styles (.noise-card / .lab-card, .tilted-banner).
 * - Letter-spaced uppercase font style only on nav, tags, and labels.
 * - Normal body typography for all descriptions, metrics, and inputs.
 * - Respects prefers-reduced-motion, keyboard accessible, mobile responsive.
 * =========================================================================
 */

(function () {
  'use strict';

  /**
   * =======================================================================
   * EDITABLE CONFIGURATION (CFG)
   * Real project names, skills, and lab parameters defined here.
   * =======================================================================
   */
  const CFG = {
    // Real Portfolio Projects (from Logith's portfolio)
    projects: [
      {
        id: 'proj-buoy',
        name: 'AI-Enabled Buoy for Early Pollution & Algal Bloom Detection',
        shortName: 'AI Pollution Buoy',
        category: 'AI + IOT',
        skills: ['Python', 'Machine Learning', 'IoT & Sensors'],
      },
      {
        id: 'proj-har',
        name: 'Human Activity Recognition System',
        shortName: 'Human Activity Recognition',
        category: 'MACHINE LEARNING',
        skills: ['Python', 'Machine Learning', 'Data Processing'],
      },
      {
        id: 'proj-clinical',
        name: 'Clinical Note Summarization & Coding Assistant',
        shortName: 'Clinical NLP Assistant',
        category: 'HEALTHCARE AI',
        skills: ['Python', 'NLP & Transformers', 'Machine Learning'],
      },
      {
        id: 'proj-finance',
        name: 'Finance Market: Personal Finance Dashboard',
        shortName: 'Finance Dashboard',
        category: 'WEB APPLICATION',
        skills: ['React', 'Data Visualization', 'SQL & Databases'],
      },
      {
        id: 'proj-radiusdia',
        name: 'Radiusdia Studio',
        shortName: 'Radiusdia Studio Website',
        category: 'FRONTEND DEVELOPMENT',
        skills: ['React', 'Frontend & Web', 'Data Visualization'],
      },
    ],

    // Real Skills (from Logith's technical toolkit)
    skills: [
      { id: 'skill-python', name: 'Python', category: 'LANGUAGES' },
      { id: 'skill-sql', name: 'SQL & Databases', category: 'DATABASES' },
      { id: 'skill-react', name: 'React', category: 'FRAMEWORKS' },
      { id: 'skill-ml', name: 'Machine Learning', category: 'AI & ML' },
      { id: 'skill-nlp', name: 'NLP & Transformers', category: 'AI & ML' },
      { id: 'skill-iot', name: 'IoT & Sensors', category: 'HARDWARE' },
      { id: 'skill-dataviz', name: 'Data Visualization', category: 'ANALYTICS' },
      { id: 'skill-web', name: 'Frontend & Web', category: 'FRONTEND' },
    ],

    // Section Content
    section: {
      id: 'lab',
      tag: 'INTERACTIVE LAB // CLIENT-SIDE INTELLIGENCE',
      title: 'INTERACTIVE LAB',
      subtitle: 'Client-side machine learning inference, real-time sensor telemetry, and technical capability mapping.',
    },

    // 1. Sentiment Classifier Configuration
    sentiment: {
      tag: 'NLP // REAL-TIME INFERENCE',
      title: 'Text Sentiment Classifier',
      description: 'Lexicon model with contextual negation window handling ("not good", "not bad"). Shows polarity label, confidence percentage, and gold progress meter.',
      initialText: 'The environmental sensor pipeline is not good at handling high latency, but the buoy model accuracy is surprisingly great.',
      samples: [
        'The model accuracy is surprisingly fast and reliable.',
        'Sensor telemetry is not good, high failure rate and latency.',
        'Initial power consumption was not bad, solid stability overall.',
        'Critical buffer overflow: totally broken stream and terrible lag.'
      ],
      lexicon: {
        positive: {
          excellent: 3, amazing: 3, outstanding: 3, fantastic: 3, brilliant: 3, superior: 3, exceptional: 3, flawless: 3,
          good: 2, great: 2, wonderful: 2, robust: 2, optimal: 2, efficient: 2, intelligent: 2, love: 2, best: 2, perfect: 2, fast: 2, accurate: 2, reliable: 2, innovative: 2, solid: 2,
          nice: 1, fine: 1, smooth: 1, clean: 1, clear: 1, helpful: 1, useful: 1, decent: 1, like: 1, easy: 1, stable: 1, pleased: 1, valid: 1,
        },
        negative: {
          terrible: 3, horrible: 3, catastrophic: 3, worst: 3, broken: 3, crash: 3, unusable: 3, awful: 3,
          bad: 2, poor: 2, slow: 2, fail: 2, failure: 2, error: 2, fault: 2, defect: 2, flawed: 2, inaccurate: 2, buggy: 2, leak: 2, drop: 2, hate: 2, damage: 2,
          weak: 1, difficult: 1, hard: 1, warning: 1, delay: 1, concern: 1, issue: 1, odd: 1, noisy: 1, risky: 1, 'sub-optimal': 1, stale: 1,
        },
        negators: [
          'not', 'no', 'never', 'cannot', 'cant', "can't", 'wont', "won't", 'dont', "don't", 'doesnt', "doesn't",
          'didnt', "didn't", 'isnt', "isn't", 'arent', "aren't", 'wasnt', "wasn't", 'werent', "weren't",
          'hardly', 'scarcely', 'barely', 'without', 'lack', 'lacks', 'lacking'
        ],
        intensifiers: {
          very: 1.5, extremely: 2.0, highly: 1.7, incredibly: 1.8, really: 1.4, super: 1.5,
          absolutely: 1.9, completely: 1.6, totally: 1.6, slightly: 0.6, somewhat: 0.7,
        },
      },
    },

    // 2. IoT Sensor Stream Configuration
    iot: {
      tag: 'IoT TELEMETRY // STATISTICAL ANOMALY DETECTION',
      title: 'Simulated IoT Temperature Stream',
      description: 'Simulated buoy sensor temperature feed on a canvas with rolling Gaussian statistics and continuous Z-score anomaly alerting.',
      baselineTemp: 24.0,   // Baseline in °C
      noiseSigma: 0.35,     // Gaussian standard deviation
      driftSpeed: 0.06,     // Environmental fluctuation
      zThreshold: 3.0,      // Anomaly trigger cutoff (|z| >= 3.0)
      windowSize: 45,       // Data points visible on canvas
      tickInterval: 280,    // Update frequency in ms
      faultDelta: 7.5,      // Temperature spike on fault injection
    },

    // 3. Skill Map Configuration
    skillMap: {
      tag: 'RELATIONSHIP GRAPH // CAPABILITY MAPPING',
      title: 'Interactive Skill Map',
      description: 'Bilateral relationship graph linking core skills and projects. Hover or focus any node on either side to trace connections.',
    },

    // Navigation and Command Palette links
    navItems: [
      { name: 'ABOUT', href: '#about' },
      { name: 'PROJECTS', href: '#projects' },
      { name: 'SKILLS', href: '#skills' },
      { name: 'LAB', href: '#lab' },
      { name: 'CREDENTIALS', href: '#credentials' },
      { name: 'CONTACT', href: '#contact' },
    ],
  };

  /**
   * =======================================================================
   * 1. TEXT SENTIMENT CLASSIFIER
   * Small lexicon model with negation scope handling and confidence scoring.
   * =======================================================================
   */
  function analyzeSentiment(text, config) {
    if (!text || !text.trim()) {
      return { score: 0, label: 'Neutral', confidence: 50, matched: [], negationsFound: 0 };
    }

    const { positive, negative, negators, intensifiers } = config.lexicon;
    const negatorSet = new Set(negators.map(w => w.toLowerCase()));
    const tokens = text.toLowerCase().match(/\b[a-z0-9'-]+\b|[.!?,;]/gi) || [];

    let totalScore = 0;
    let sentimentCount = 0;
    let negationScope = 0;
    let activeMultiplier = 1;
    const matched = [];
    let negationsFound = 0;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].toLowerCase();

      // Reset negation and multiplier on punctuation
      if (token === '.' || token === '!' || token === '?' || token === ';' || token === ',') {
        negationScope = 0;
        activeMultiplier = 1;
        continue;
      }

      if (negatorSet.has(token)) {
        negationScope = 3;
        negationsFound++;
        continue;
      }

      if (intensifiers[token]) {
        activeMultiplier = intensifiers[token];
        if (negationScope > 0) negationScope--;
        continue;
      }

      let wordScore = 0;
      let isSentiment = false;

      if (Object.prototype.hasOwnProperty.call(positive, token)) {
        wordScore = positive[token];
        isSentiment = true;
      } else if (Object.prototype.hasOwnProperty.call(negative, token)) {
        wordScore = -negative[token];
        isSentiment = true;
      }

      if (isSentiment) {
        sentimentCount++;
        wordScore *= activeMultiplier;

        if (negationScope > 0) {
          // Negation inverts sentiment: "not good" -> negative; "not bad" -> positive
          wordScore = -wordScore * 0.9;
          matched.push({ word: token, negated: true, score: Math.round(wordScore * 10) / 10 });
          negationScope = 0;
        } else {
          matched.push({ word: token, negated: false, score: Math.round(wordScore * 10) / 10 });
        }

        totalScore += wordScore;
        activeMultiplier = 1;
      } else {
        if (negationScope > 0) negationScope--;
      }
    }

    let label = 'Neutral';
    if (totalScore > 0.25) label = 'Positive';
    else if (totalScore < -0.25) label = 'Negative';

    let confidence = 50;
    if (sentimentCount > 0) {
      const mag = Math.abs(totalScore);
      const boost = (mag / (mag + 1.6)) * 44;
      confidence = Math.min(99, Math.max(54, Math.round(55 + boost)));
    }

    return {
      score: Math.round(totalScore * 10) / 10,
      label,
      confidence,
      matched,
      negationsFound,
    };
  }

  function renderSentimentPanel(container) {
    const cfg = CFG.sentiment;
    container.innerHTML = `
      <div class="flex flex-col h-full justify-between gap-6">
        <div>
          <!-- Tag Style matching existing cards -->
          <div class="text-[9px] font-sans tracking-[0.25em] text-[#C9A227] uppercase font-semibold mb-2">
            ${cfg.tag}
          </div>
          <h3 class="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#F5F1E8] mb-2">
            ${cfg.title}
          </h3>
          <p class="text-[#A8A29E] text-xs sm:text-sm font-light leading-relaxed mb-4">
            ${cfg.description}
          </p>

          <label for="lab-sentiment-input" class="sr-only">Input text to evaluate</label>
          <textarea
            id="lab-sentiment-input"
            rows="3"
            class="w-full bg-[#0E0E0E] border border-[#2A2418] rounded p-3 text-xs sm:text-sm text-[#F5F1E8] focus:border-[#C9A227] focus:outline-none transition-colors duration-200 resize-none font-sans"
            placeholder="Type a sentence here..."
          >${cfg.initialText}</textarea>

          <!-- Sample chips -->
          <div class="flex flex-wrap gap-2 mt-3">
            ${cfg.samples.map((s, idx) => `
              <button
                type="button"
                class="lab-sample-chip text-[10px] tracking-wide font-sans px-2.5 py-1 rounded bg-[#14120e] text-[#A8A29E] border border-[#2A2418] hover:border-[#C9A227] hover:text-[#F5F1E8] transition-colors"
                data-text="${encodeURIComponent(s)}"
              >
                Sample ${idx + 1}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Evaluation Results Display -->
        <div class="p-4 rounded border border-[#2A2418] bg-[#111111]/80">
          <div class="flex items-center justify-between mb-2">
            <span id="lab-sentiment-badge" class="px-2.5 py-1 rounded-full text-[10px] tracking-widest font-mono font-bold uppercase border border-[#2A2418] text-[#A8A29E]">
              EVALUATING
            </span>
            <span id="lab-sentiment-confidence" class="text-xs font-mono font-semibold text-[#F5F1E8]">
              50% Confidence
            </span>
          </div>

          <!-- Gold Progress Bar -->
          <div class="w-full bg-[#14120e] border border-[#2A2418] h-2 rounded-full overflow-hidden" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" aria-label="Sentiment confidence">
            <div id="lab-sentiment-bar" class="lab-progress-bar" style="width: 50%;"></div>
          </div>

          <div id="lab-sentiment-breakdown" class="flex flex-wrap gap-2 mt-3 text-[11px] font-mono text-[#A8A29E]">
            <!-- Live details -->
          </div>
        </div>
      </div>
    `;

    const textarea = container.querySelector('#lab-sentiment-input');
    const badge = container.querySelector('#lab-sentiment-badge');
    const confText = container.querySelector('#lab-sentiment-confidence');
    const bar = container.querySelector('#lab-sentiment-bar');
    const breakdown = container.querySelector('#lab-sentiment-breakdown');

    function update() {
      const res = analyzeSentiment(textarea.value, cfg);

      // Label and styling
      badge.textContent = res.label.toUpperCase();
      if (res.label === 'Positive') {
        badge.className = 'px-2.5 py-1 rounded-full text-[10px] tracking-widest font-mono font-bold uppercase border border-[#10b981]/50 text-[#34d399] bg-[#10b981]/10';
      } else if (res.label === 'Negative') {
        badge.className = 'px-2.5 py-1 rounded-full text-[10px] tracking-widest font-mono font-bold uppercase border border-[#ef4444]/50 text-[#f87171] bg-[#ef4444]/10';
      } else {
        badge.className = 'px-2.5 py-1 rounded-full text-[10px] tracking-widest font-mono font-bold uppercase border border-[#2A2418] text-[#A8A29E] bg-[#14120e]';
      }

      // Confidence & Progress Bar (in gold)
      confText.textContent = `${res.confidence}% Confidence`;
      bar.style.width = `${res.confidence}%`;
      bar.parentElement.setAttribute('aria-valuenow', res.confidence);

      // Breakdown tags
      let html = `<span class="px-2 py-0.5 rounded bg-[#161616] border border-[#2A2418]">Net Score: ${res.score > 0 ? '+' : ''}${res.score}</span>`;
      if (res.negationsFound > 0) {
        html += `<span class="px-2 py-0.5 rounded bg-[#161616] border border-[#C9A227]/40 text-[#E5C76B]">Negation Active (${res.negationsFound})</span>`;
      }
      if (res.matched.length > 0) {
        const words = res.matched.slice(0, 3).map(m => `${m.negated ? '¬' : ''}${m.word}`).join(', ');
        html += `<span class="px-2 py-0.5 rounded bg-[#161616] border border-[#2A2418]">Tokens: ${words}</span>`;
      }
      breakdown.innerHTML = html;
    }

    textarea.addEventListener('input', update);

    container.querySelectorAll('.lab-sample-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        textarea.value = decodeURIComponent(btn.getAttribute('data-text') || '');
        update();
        textarea.focus();
      });
    });

    update();
  }

  /**
   * =======================================================================
   * 2. IoT SENSOR STREAM & Z-SCORE ANOMALY DETECTOR
   * Canvas-rendered temperature line with rolling mean, stddev, and anomaly alerting.
   * =======================================================================
   */
  class IoTStreamSimulator {
    constructor(config, onTick) {
      this.config = config;
      this.onTick = onTick;
      this.history = [];
      this.time = 0;
      this.faultQueue = [];
      this.timerId = null;
      this.isPaused = false;

      // Seed initial buffer
      for (let i = 0; i < config.windowSize; i++) {
        this.time++;
        const sample = this.computeSample(0);
        this.history.push({ time: this.time, temp: sample, isFault: false, zScore: 0 });
      }
      this.updateStats();
    }

    computeSample(fault) {
      const { baselineTemp, noiseSigma, driftSpeed } = this.config;
      const drift = Math.sin(this.time * driftSpeed) * 0.5;
      const u1 = Math.random() || 0.001;
      const u2 = Math.random() || 0.001;
      const noise = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2) * noiseSigma;
      return Math.round((baselineTemp + drift + noise + fault) * 100) / 100;
    }

    updateStats() {
      const n = this.history.length;
      if (n < 2) return;

      const nominal = this.history.filter(p => !p.isFault);
      const pool = nominal.length >= 10 ? nominal : this.history;

      const sum = pool.reduce((acc, p) => acc + p.temp, 0);
      const mean = sum / pool.length;
      const variance = pool.reduce((acc, p) => acc + Math.pow(p.temp - mean, 2), 0) / pool.length;
      const stdDev = Math.max(0.18, Math.sqrt(variance));

      const latest = this.history[n - 1];
      const zScore = (latest.temp - mean) / stdDev;
      latest.zScore = Math.round(zScore * 100) / 100;
      const isAnomaly = Math.abs(latest.zScore) >= this.config.zThreshold;

      this.currentStats = {
        temp: latest.temp,
        mean: Math.round(mean * 100) / 100,
        stdDev: Math.round(stdDev * 100) / 100,
        zScore: latest.zScore,
        isAnomaly,
        history: this.history,
      };
    }

    injectFault() {
      const delta = this.config.faultDelta;
      this.faultQueue.push(delta);
      this.faultQueue.push(delta * 0.7);
      this.faultQueue.push(delta * 0.35);
      this.faultQueue.push(delta * 0.15);
    }

    step() {
      this.time++;
      let faultOffset = 0;
      let isFault = false;

      if (this.faultQueue.length > 0) {
        faultOffset = this.faultQueue.shift();
        isFault = true;
      }

      const temp = this.computeSample(faultOffset);
      this.history.push({ time: this.time, temp, isFault, zScore: 0 });
      if (this.history.length > this.config.windowSize) {
        this.history.shift();
      }

      this.updateStats();
      if (this.onTick) this.onTick(this.currentStats);
    }

    start() {
      if (this.timerId) return;
      this.isPaused = false;
      this.timerId = setInterval(() => this.step(), this.config.tickInterval);
    }

    pause() {
      this.isPaused = true;
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    }

    togglePause() {
      if (this.isPaused) {
        this.start();
        return false;
      } else {
        this.pause();
        return true;
      }
    }
  }

  function renderIoTPanel(container) {
    const cfg = CFG.iot;
    container.innerHTML = `
      <div class="flex flex-col h-full justify-between gap-6">
        <div>
          <!-- Tag Style matching existing cards -->
          <div class="text-[9px] font-sans tracking-[0.25em] text-[#C9A227] uppercase font-semibold mb-2">
            ${cfg.tag}
          </div>
          <h3 class="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#F5F1E8] mb-2">
            ${cfg.title}
          </h3>
          <p class="text-[#A8A29E] text-xs sm:text-sm font-light leading-relaxed mb-4">
            ${cfg.description}
          </p>

          <!-- Telemetry HUD items -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
            <div class="p-2.5 rounded bg-[#111111] border border-[#2A2418]">
              <span class="block text-[9px] font-mono tracking-widest text-[#A8A29E] uppercase mb-1">Current</span>
              <span id="lab-iot-temp" class="text-sm font-mono font-bold text-[#F5F1E8]">24.00 °C</span>
            </div>
            <div class="p-2.5 rounded bg-[#111111] border border-[#2A2418]">
              <span class="block text-[9px] font-mono tracking-widest text-[#A8A29E] uppercase mb-1">Mean (μ)</span>
              <span id="lab-iot-mean" class="text-sm font-mono font-bold text-[#F5F1E8]">24.00 °C</span>
            </div>
            <div class="p-2.5 rounded bg-[#111111] border border-[#2A2418]">
              <span class="block text-[9px] font-mono tracking-widest text-[#A8A29E] uppercase mb-1">Std Dev (σ)</span>
              <span id="lab-iot-std" class="text-sm font-mono font-bold text-[#F5F1E8]">0.35 °C</span>
            </div>
            <div class="p-2.5 rounded bg-[#111111] border border-[#2A2418]">
              <span class="block text-[9px] font-mono tracking-widest text-[#A8A29E] uppercase mb-1">Z-Score</span>
              <span id="lab-iot-zscore" class="text-sm font-mono font-bold text-[#F5F1E8]">0.00</span>
            </div>
          </div>

          <!-- Anomaly Alert Banner -->
          <div id="lab-iot-alert" class="flex items-center justify-between px-3.5 py-2.5 rounded border border-[#2A2418] bg-[#14120e] text-xs font-mono text-[#A8A29E] mb-3 transition-all duration-300">
            <span>STATUS: ALL SENSOR READINGS NOMINAL</span>
            <span>|Z| &lt; 3.0σ</span>
          </div>

          <!-- Canvas Graph -->
          <div class="w-full h-44 sm:h-52 bg-[#0E0E0E] border border-[#2A2418] rounded overflow-hidden relative">
            <canvas id="lab-iot-canvas" class="w-full h-full block" role="img" aria-label="Simulated IoT telemetry line showing rolling temperature data and statistical anomaly thresholds"></canvas>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex flex-wrap items-center gap-3">
          <button type="button" id="lab-inject-fault" class="lab-btn-gold">
            ⚡ Inject a Fault
          </button>
          <button type="button" id="lab-pause-stream" class="lab-btn-subtle" aria-label="Pause or resume telemetry stream">
            Pause Stream
          </button>
        </div>
      </div>
    `;

    const canvas = container.querySelector('#lab-iot-canvas');
    const ctx = canvas.getContext('2d');
    const tempEl = container.querySelector('#lab-iot-temp');
    const meanEl = container.querySelector('#lab-iot-mean');
    const stdEl = container.querySelector('#lab-iot-std');
    const zscoreEl = container.querySelector('#lab-iot-zscore');
    const alertEl = container.querySelector('#lab-iot-alert');
    const injectBtn = container.querySelector('#lab-inject-fault');
    const pauseBtn = container.querySelector('#lab-pause-stream');

    function drawCanvas(stats) {
      if (!ctx || !canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width;
      const height = rect.height;

      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const history = stats.history;
      if (history.length < 2) {
        ctx.restore();
        return;
      }

      const temps = history.map(p => p.temp);
      const minTemp = Math.min(...temps, stats.mean - stats.stdDev * 3.5);
      const maxTemp = Math.max(...temps, stats.mean + stats.stdDev * 3.5);
      const range = Math.max(2.5, maxTemp - minTemp);

      const padTop = 16;
      const padBottom = 22;
      const padLeft = 36;
      const padRight = 14;
      const plotW = width - padLeft - padRight;
      const plotH = height - padTop - padBottom;

      const getY = (t) => padTop + plotH - ((t - minTemp) / range) * plotH;
      const getX = (idx) => padLeft + (idx / (history.length - 1)) * plotW;

      // Draw grid
      ctx.strokeStyle = 'rgba(42, 36, 24, 0.7)';
      ctx.fillStyle = '#A8A29E';
      ctx.font = '9px ui-monospace, monospace';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      const gridSteps = 3;
      for (let i = 0; i <= gridSteps; i++) {
        const val = minTemp + (range / gridSteps) * i;
        const y = getY(val);
        ctx.beginPath();
        ctx.moveTo(padLeft, y);
        ctx.lineTo(width - padRight, y);
        ctx.stroke();
        ctx.fillText(`${val.toFixed(1)}°`, padLeft - 5, y);
      }

      // Draw 3-sigma anomaly threshold lines
      const upperY = getY(stats.mean + stats.stdDev * cfg.zThreshold);
      const lowerY = getY(stats.mean - stats.stdDev * cfg.zThreshold);

      ctx.save();
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
      ctx.beginPath();
      ctx.moveTo(padLeft, upperY);
      ctx.lineTo(width - padRight, upperY);
      ctx.moveTo(padLeft, lowerY);
      ctx.lineTo(width - padRight, lowerY);
      ctx.stroke();
      ctx.restore();

      // Draw mean baseline
      ctx.save();
      ctx.setLineDash([2, 4]);
      ctx.strokeStyle = 'rgba(201, 162, 39, 0.35)';
      const meanY = getY(stats.mean);
      ctx.beginPath();
      ctx.moveTo(padLeft, meanY);
      ctx.lineTo(width - padRight, meanY);
      ctx.stroke();
      ctx.restore();

      // Area fill under temperature line
      const grad = ctx.createLinearGradient(0, padTop, 0, height - padBottom);
      grad.addColorStop(0, 'rgba(201, 162, 39, 0.22)');
      grad.addColorStop(1, 'rgba(201, 162, 39, 0.00)');

      ctx.beginPath();
      ctx.moveTo(getX(0), height - padBottom);
      for (let i = 0; i < history.length; i++) {
        ctx.lineTo(getX(i), getY(history[i].temp));
      }
      ctx.lineTo(getX(history.length - 1), height - padBottom);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Temperature curve line in gold
      ctx.beginPath();
      for (let i = 0; i < history.length; i++) {
        const x = getX(i);
        const y = getY(history[i].temp);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#C9A227';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw point markers
      for (let i = 0; i < history.length; i++) {
        const pt = history[i];
        const x = getX(i);
        const y = getY(pt.temp);
        const isAnomaly = Math.abs(pt.zScore) >= cfg.zThreshold;

        if (isAnomaly) {
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x, y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.fill();
          ctx.stroke();
        } else if (i === history.length - 1) {
          ctx.beginPath();
          ctx.arc(x, y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#E5C76B';
          ctx.strokeStyle = '#0A0A0A';
          ctx.lineWidth = 1.5;
          ctx.fill();
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    function onUpdate(stats) {
      tempEl.textContent = `${stats.temp.toFixed(2)} °C`;
      meanEl.textContent = `${stats.mean.toFixed(2)} °C`;
      stdEl.textContent = `${stats.stdDev.toFixed(2)} °C`;
      zscoreEl.textContent = (stats.zScore >= 0 ? '+' : '') + stats.zScore.toFixed(2);

      if (stats.isAnomaly) {
        alertEl.className = 'flex items-center justify-between px-3.5 py-2.5 rounded border border-[#ef4444] bg-[#ef4444]/15 text-xs font-mono text-[#fca5a5] shadow-[0_0_15px_rgba(239,68,68,0.3)] mb-3 transition-all duration-300';
        alertEl.innerHTML = `
          <span>🚨 ANOMALY DETECTED: Spike at ${stats.temp.toFixed(2)}°C</span>
          <span>|Z| = ${Math.abs(stats.zScore).toFixed(2)} ≥ 3.0σ</span>
        `;
      } else {
        alertEl.className = 'flex items-center justify-between px-3.5 py-2.5 rounded border border-[#2A2418] bg-[#14120e] text-xs font-mono text-[#A8A29E] mb-3 transition-all duration-300';
        alertEl.innerHTML = `
          <span>STATUS: ALL SENSOR READINGS NOMINAL</span>
          <span>|Z| = ${Math.abs(stats.zScore).toFixed(2)} &lt; 3.0σ</span>
        `;
      }

      drawCanvas(stats);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      cfg.tickInterval = 1200;
    }

    const sim = new IoTStreamSimulator(cfg, onUpdate);

    injectBtn.addEventListener('click', () => sim.injectFault());
    pauseBtn.addEventListener('click', () => {
      const paused = sim.togglePause();
      pauseBtn.textContent = paused ? 'Resume Stream' : 'Pause Stream';
    });

    window.addEventListener('resize', () => {
      if (sim && sim.currentStats) drawCanvas(sim.currentStats);
    }, { passive: true });

    sim.start();
  }

  /**
   * =======================================================================
   * 3. SKILL MAP (POLISHED NODE-LINK ARCHITECTURE)
   * Skills on left, projects on right, linked by smooth cubic Bézier SVG paths.
   * Flexbox nodes prevent text collisions at all viewports (1440, 1024, 768, 390).
   * Pointer Events support tap-to-select, tap-to-clear, drag-to-select.
   * Full keyboard accessibility, touch-friendly min 44px height, flowing dash lines.
   * =======================================================================
   */
  function renderSkillMap(container) {
    const cfg = CFG.skillMap;
    const skills = CFG.skills;
    const projects = CFG.projects;

    // Build connections list
    const connections = [];
    projects.forEach(p => {
      p.skills.forEach(sName => {
        const found = skills.find(s =>
          s.name.toLowerCase() === sName.toLowerCase() ||
          s.name.toLowerCase().includes(sName.toLowerCase()) ||
          sName.toLowerCase().includes(s.name.toLowerCase())
        );
        if (found) {
          connections.push({
            skillId: found.id,
            projId: p.id,
            skillName: found.name,
            projName: p.name,
          });
        }
      });
    });

    container.innerHTML = `
      <div class="flex flex-col h-full justify-between gap-6">
        <div>
          <!-- Tag Style matching existing cards -->
          <div class="text-[10px] tracking-[0.25em] font-mono text-[#E5C76B] uppercase font-bold mb-2">
            ${cfg.tag}
          </div>
          <h3 class="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#F5F1E8] mb-2">
            ${cfg.title}
          </h3>
          <p class="text-[#A8A29E] text-xs sm:text-sm font-light leading-relaxed mb-6 font-sans">
            ${cfg.description}
          </p>

          <!-- Interactive Node-Link Container -->
          <div class="skillmap-container" id="lab-skillmap-root">
            <!-- Background SVG Overlay for Connecting Paths -->
            <svg class="skillmap-overlay-svg" id="lab-skillmap-svg" aria-hidden="true">
              <g id="lab-skillmap-paths"></g>
            </svg>

            <!-- Columns of HTML Nodes -->
            <div class="skillmap-columns" id="lab-skillmap-cols">
              <!-- Left: Skills Column -->
              <div class="skillmap-col-skills" role="group" aria-label="Technical Skills">
                ${skills.map(s => `
                  <div
                    class="skillmap-node skill-node"
                    data-id="${s.id}"
                    tabindex="0"
                    role="button"
                    aria-pressed="false"
                    aria-label="Skill: ${s.name} (${s.category})"
                  >
                    <span class="skillmap-node-name">${s.name}</span>
                    <span class="skillmap-node-tag">${s.category}</span>
                  </div>
                `).join('')}
              </div>

              <!-- Right: Projects Column -->
              <div class="skillmap-col-projects" role="group" aria-label="Portfolio Projects">
                ${projects.map(p => `
                  <div
                    class="skillmap-node proj-node"
                    data-id="${p.id}"
                    tabindex="0"
                    role="button"
                    aria-pressed="false"
                    aria-label="Project: ${p.name}"
                  >
                    <span class="skillmap-node-name">${p.shortName || p.name}</span>
                    <span class="skillmap-node-tag">${p.category}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Dynamic Status/Caption Box -->
        <div class="flex items-center gap-3 p-3.5 rounded border border-[#2A2418] bg-[#111111]/80 text-xs text-[#A8A29E] font-sans">
          <span class="w-2 h-2 rounded-full bg-[#C9A227] shrink-0 shadow-[0_0_8px_#C9A227]"></span>
          <span id="lab-svg-status">Hover, tap, or drag across any skill or project above to trace technical relationships.</span>
        </div>
      </div>
    `;

    const rootContainer = container.querySelector('#lab-skillmap-root');
    const svgOverlay = container.querySelector('#lab-skillmap-svg');
    const pathsGroup = container.querySelector('#lab-skillmap-paths');
    const statusText = container.querySelector('#lab-svg-status');
    const allNodes = Array.from(rootContainer.querySelectorAll('.skillmap-node'));

    // Create SVG path elements for each connection
    connections.forEach((conn, idx) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', 'skillmap-path');
      path.setAttribute('data-skill', conn.skillId);
      path.setAttribute('data-proj', conn.projId);
      path.setAttribute('data-idx', String(idx));
      pathsGroup.appendChild(path);
      conn.path = path;
    });

    // Dynamic Bézier calculation relative to container
    function updateLines() {
      const cRect = rootContainer.getBoundingClientRect();
      if (cRect.width === 0 || cRect.height === 0) return;

      svgOverlay.setAttribute('viewBox', `0 0 ${cRect.width} ${cRect.height}`);

      connections.forEach(conn => {
        const sEl = rootContainer.querySelector(`.skill-node[data-id="${conn.skillId}"]`);
        const pEl = rootContainer.querySelector(`.proj-node[data-id="${conn.projId}"]`);
        const path = conn.path;
        if (!sEl || !pEl || !path) return;

        const sRect = sEl.getBoundingClientRect();
        const pRect = pEl.getBoundingClientRect();

        const isSideBySide = pRect.left >= sRect.right - 20;
        let x1, y1, x2, y2, c1x, c1y, c2x, c2y;

        if (isSideBySide) {
          x1 = sRect.right - cRect.left;
          y1 = sRect.top + sRect.height / 2 - cRect.top;
          x2 = pRect.left - cRect.left;
          y2 = pRect.top + pRect.height / 2 - cRect.top;

          const dx = x2 - x1;
          c1x = x1 + dx * 0.45;
          c1y = y1;
          c2x = x1 + dx * 0.55;
          c2y = y2;
        } else {
          // Stacking mode (skills above projects)
          x1 = sRect.left + sRect.width / 2 - cRect.left;
          y1 = sRect.bottom - cRect.top;
          x2 = pRect.left + pRect.width / 2 - cRect.left;
          y2 = pRect.top - cRect.top;

          const dy = y2 - y1;
          c1x = x1;
          c1y = y1 + dy * 0.45;
          c2x = x2;
          c2y = y1 + dy * 0.55;
        }

        path.setAttribute('d', `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`);
      });
    }

    // ResizeObserver and fonts ready listeners
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(updateLines);
    });
    ro.observe(rootContainer);
    window.addEventListener('resize', () => requestAnimationFrame(updateLines), { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(updateLines));
    }
    requestAnimationFrame(updateLines);

    // State management
    let selectedId = null;
    let selectedIsSkill = false;
    let isPointerDragging = false;

    function applyHighlight(id, isSkill, isPermanent) {
      const activeNode = rootContainer.querySelector(`.skillmap-node[data-id="${id}"]`);
      if (!activeNode) return;

      const connectedTargets = new Set();
      connections.forEach(c => {
        if (isSkill && c.skillId === id) connectedTargets.add(c.projId);
        else if (!isSkill && c.projId === id) connectedTargets.add(c.skillId);
      });

      // Update nodes
      allNodes.forEach(n => {
        const nId = n.getAttribute('data-id');
        n.classList.remove('selected', 'connected', 'dimmed');
        n.setAttribute('aria-pressed', 'false');

        if (nId === id) {
          n.classList.add(isPermanent ? 'selected' : 'connected');
          if (isPermanent) n.setAttribute('aria-pressed', 'true');
        } else if (connectedTargets.has(nId)) {
          n.classList.add('connected');
        } else {
          n.classList.add('dimmed');
        }
      });

      // Update SVG lines
      connections.forEach(c => {
        const path = c.path;
        if (!path) return;
        const isConnected = isSkill ? c.skillId === id : c.projId === id;
        if (isConnected) {
          path.classList.remove('dimmed');
          path.classList.add('highlighted');
          path.parentNode.appendChild(path); // Bring to front
        } else {
          path.classList.remove('highlighted');
          path.classList.add('dimmed');
        }
      });

      // Update status caption
      if (isSkill) {
        const s = skills.find(item => item.id === id);
        const pNames = projects.filter(p => connectedTargets.has(p.id)).map(p => p.shortName || p.name);
        statusText.innerHTML = `<strong class="text-[#E5C76B]">${s ? s.name : ''}</strong> is utilized across <strong>${pNames.length}</strong> project${pNames.length !== 1 ? 's' : ''}: ${pNames.join(' • ')}`;
      } else {
        const p = projects.find(item => item.id === id);
        const sNames = skills.filter(s => connectedTargets.has(s.id)).map(s => s.name);
        statusText.innerHTML = `<strong class="text-[#E5C76B]">${p ? p.name : ''}</strong> integrates <strong>${sNames.length}</strong> technical skills: ${sNames.join(' • ')}`;
      }
    }

    function clearHighlights() {
      allNodes.forEach(n => {
        n.classList.remove('selected', 'connected', 'dimmed');
        n.setAttribute('aria-pressed', 'false');
      });

      connections.forEach(c => {
        if (c.path) {
          c.path.classList.remove('highlighted', 'dimmed');
        }
      });

      statusText.textContent = 'Hover, tap, or drag across any skill or project above to trace technical relationships.';
    }

    function selectNode(id, isSkill) {
      if (selectedId === id) {
        // Tap same node again -> clear
        selectedId = null;
        selectedIsSkill = false;
        clearHighlights();
      } else {
        selectedId = id;
        selectedIsSkill = isSkill;
        applyHighlight(id, isSkill, true);
      }
    }

    // Pointer Events: Tap, Drag across nodes, and Empty space tap
    rootContainer.addEventListener('pointerdown', (e) => {
      const node = e.target.closest('.skillmap-node');
      if (node) {
        isPointerDragging = true;
        const id = node.getAttribute('data-id');
        const isSkill = node.classList.contains('skill-node');
        selectNode(id, isSkill);
      } else {
        // Tap empty space -> clear
        selectedId = null;
        selectedIsSkill = false;
        clearHighlights();
      }
    });

    window.addEventListener('pointermove', (e) => {
      if (!isPointerDragging) return;
      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (!target) return;
      const node = target.closest('.skillmap-node');
      if (node) {
        const id = node.getAttribute('data-id');
        const isSkill = node.classList.contains('skill-node');
        if (selectedId !== id) {
          selectedId = id;
          selectedIsSkill = isSkill;
          applyHighlight(id, isSkill, true);
        }
      }
    });

    window.addEventListener('pointerup', () => {
      isPointerDragging = false;
    });

    window.addEventListener('pointercancel', () => {
      isPointerDragging = false;
    });

    // Hover listeners (when not permanently selected or dragging)
    allNodes.forEach(node => {
      const id = node.getAttribute('data-id');
      const isSkill = node.classList.contains('skill-node');

      node.addEventListener('pointerenter', () => {
        if (!selectedId && !isPointerDragging) {
          applyHighlight(id, isSkill, false);
        }
      });

      node.addEventListener('pointerleave', () => {
        if (!selectedId && !isPointerDragging) {
          clearHighlights();
        }
      });

      node.addEventListener('focus', () => {
        if (!selectedId) {
          applyHighlight(id, isSkill, false);
        }
      });

      node.addEventListener('blur', () => {
        if (!selectedId) {
          clearHighlights();
        }
      });

      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectNode(id, isSkill);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          selectedId = null;
          selectedIsSkill = false;
          clearHighlights();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          const colNodes = isSkill
            ? Array.from(rootContainer.querySelectorAll('.skill-node'))
            : Array.from(rootContainer.querySelectorAll('.proj-node'));
          const curIdx = colNodes.indexOf(node);
          const nextIdx = e.key === 'ArrowDown'
            ? (curIdx + 1) % colNodes.length
            : (curIdx - 1 + colNodes.length) % colNodes.length;
          colNodes[nextIdx].focus();
        } else if (e.key === 'ArrowRight' && isSkill) {
          e.preventDefault();
          const pNodes = Array.from(rootContainer.querySelectorAll('.proj-node'));
          if (pNodes.length > 0) pNodes[0].focus();
        } else if (e.key === 'ArrowLeft' && !isSkill) {
          e.preventDefault();
          const sNodes = Array.from(rootContainer.querySelectorAll('.skill-node'));
          if (sNodes.length > 0) sNodes[0].focus();
        }
      });
    });
  }

  /**
   * =======================================================================
   * 4. COMMAND PALETTE (CTRL+K / CMD+K)
   * Built from existing nav links plus "Lab", styled to match floating nav pill.
   * =======================================================================
   */
  function setupCommandPalette() {
    if (document.getElementById('lab-palette-modal')) return;

    // Palette modal backdrop & dialog matching floating nav pill
    const backdrop = document.createElement('div');
    backdrop.id = 'lab-palette-modal';
    backdrop.className = 'lab-palette-backdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.setAttribute('aria-label', 'Command Palette Navigation');

    backdrop.innerHTML = `
      <div class="lab-palette-dialog p-2">
        <div class="flex items-center gap-3 px-4 py-3 border-b border-[#2A2418]">
          <svg class="w-4 h-4 text-[#C9A227] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            id="lab-palette-input"
            type="text"
            placeholder="Jump to section or search..."
            class="flex-1 bg-transparent border-none outline-none text-[#F5F1E8] font-sans text-sm placeholder-[#A8A29E]/50"
            autocomplete="off"
            spellcheck="false"
          />
          <kbd class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#161616] border border-[#2A2418] text-[#A8A29E]">ESC</kbd>
        </div>

        <ul id="lab-palette-results" class="list-none p-2 m-0 max-h-72 overflow-y-auto" role="listbox">
          <!-- Items injected here -->
        </ul>

        <div class="flex items-center justify-between px-4 py-2 border-t border-[#2A2418] text-[10px] font-mono text-[#A8A29E]/70 bg-[#0E0E0E]">
          <span>↑↓ Navigate</span>
          <span>↵ Jump</span>
          <span>ESC Close</span>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    // Floating launcher button matching floating pill nav
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.id = 'lab-palette-trigger';
    trigger.className = 'fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14120e]/80 border border-[#2A2418]/90 backdrop-blur-md shadow-2xl text-[10px] font-sans tracking-[0.18em] font-semibold text-[#A8A29E] hover:text-[#F5F1E8] hover:border-[#C9A227] transition-all duration-300 uppercase cursor-pointer';
    trigger.setAttribute('aria-label', 'Open navigation palette (Ctrl+K / Cmd+K)');
    trigger.innerHTML = `
      <span>NAV</span>
      <kbd class="text-[9px] font-mono px-1 py-0.2 rounded bg-[#161616] text-[#C9A227] border border-[#2A2418]">⌘K</kbd>
    `;
    document.body.appendChild(trigger);

    const input = backdrop.querySelector('#lab-palette-input');
    const resultsList = backdrop.querySelector('#lab-palette-results');
    let activeIdx = 0;
    let filteredList = [];
    let previousActiveEl = null;

    function getNavLinks() {
      const items = [];
      const seen = new Set();

      // Query live nav links
      document.querySelectorAll('nav a[href^="#"]').forEach(a => {
        const href = a.getAttribute('href');
        if (!href || href === '#' || seen.has(href)) return;
        seen.add(href);
        const name = a.textContent.trim().replace(/\s+/g, ' ');
        if (name) items.push({ name, href });
      });

      // Ensure all standard items + Lab are present
      CFG.navItems.forEach(item => {
        if (!seen.has(item.href)) {
          seen.add(item.href);
          items.push(item);
        }
      });

      return items;
    }

    function renderList(matches) {
      filteredList = matches;
      if (activeIdx >= matches.length) activeIdx = 0;
      if (activeIdx < 0) activeIdx = Math.max(0, matches.length - 1);

      if (matches.length === 0) {
        resultsList.innerHTML = `<li class="py-6 text-center text-xs text-[#A8A29E] font-sans">No matching sections found</li>`;
        return;
      }

      resultsList.innerHTML = matches.map((item, idx) => `
        <li
          class="flex items-center justify-between px-3.5 py-2.5 rounded-full cursor-pointer transition-all duration-200 ${
            idx === activeIdx
              ? 'text-[#0A0A0A] bg-[#C9A227] shadow-[0_2px_10px_rgba(201,162,39,0.35)] font-semibold'
              : 'text-[#A8A29E] hover:text-[#F5F1E8] hover:bg-[#161616]'
          }"
          role="option"
          data-index="${idx}"
          aria-selected="${idx === activeIdx ? 'true' : 'false'}"
        >
          <span class="text-[11px] font-sans tracking-[0.18em] uppercase font-semibold">
            ${item.name}
          </span>
          <span class="text-[10px] font-mono opacity-70">
            ${item.href}
          </span>
        </li>
      `).join('');

      const sel = resultsList.children[activeIdx];
      if (sel) sel.scrollIntoView({ block: 'nearest' });
    }

    function openPalette() {
      previousActiveEl = document.activeElement;
      activeIdx = 0;
      input.value = '';
      renderList(getNavLinks());
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => input.focus(), 40);
    }

    function closePalette() {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
      if (previousActiveEl && typeof previousActiveEl.focus === 'function') {
        previousActiveEl.focus();
      }
    }

    function jumpTo(idx) {
      const item = filteredList[idx];
      if (!item) return;

      closePalette();
      const target = document.querySelector(item.href);
      if (target) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        if (history.pushState) history.pushState(null, '', item.href);
        else window.location.hash = item.href;
      }
    }

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      const all = getNavLinks();
      const filtered = q
        ? all.filter(item => item.name.toLowerCase().includes(q) || item.href.toLowerCase().includes(q))
        : all;
      activeIdx = 0;
      renderList(filtered);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (filteredList.length > 0) {
          activeIdx = (activeIdx + 1) % filteredList.length;
          renderList(filteredList);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (filteredList.length > 0) {
          activeIdx = (activeIdx - 1 + filteredList.length) % filteredList.length;
          renderList(filteredList);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        jumpTo(activeIdx);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closePalette();
      }
    });

    resultsList.addEventListener('click', (e) => {
      const li = e.target.closest('li[data-index]');
      if (!li) return;
      const idx = parseInt(li.getAttribute('data-index') || '0', 10);
      jumpTo(idx);
    });

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closePalette();
    });

    trigger.addEventListener('click', openPalette);

    window.addEventListener('keydown', (e) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (isCmdOrCtrl && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (backdrop.classList.contains('open')) closePalette();
        else openPalette();
      } else if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        e.preventDefault();
        closePalette();
      }
    });
  }

  /**
   * =======================================================================
   * 5. INJECT "LAB" NAV PILL INTO LIVE REACT NAV
   * Ensures the pill appears before Credentials with exact existing styles.
   * =======================================================================
   */
  function syncNavPill() {
    // Desktop floating pill navigation container
    const navContainers = document.querySelectorAll('nav .backdrop-blur-md, nav');
    navContainers.forEach(container => {
      const credLink = container.querySelector('a[href="#credentials"]');
      if (credLink && !container.querySelector('a[href="#lab"]')) {
        const labLink = document.createElement('a');
        labLink.href = '#lab';
        labLink.textContent = 'LAB';
        labLink.className = credLink.className;
        credLink.before(labLink);

        labLink.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById('lab');
          if (target) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            if (history.pushState) history.pushState(null, '', '#lab');
            else window.location.hash = '#lab';
          }
        });
      }
    });

    // Mobile navigation overlay container
    const mobileLinks = document.querySelectorAll('div[class*="fixed inset-0"] a[href="#credentials"]');
    mobileLinks.forEach(credLink => {
      const parent = credLink.parentElement;
      if (parent && !parent.querySelector('a[href="#lab"]')) {
        const labLink = document.createElement('a');
        labLink.href = '#lab';
        labLink.textContent = 'LAB';
        labLink.className = credLink.className;
        credLink.before(labLink);
      }
    });
  }

  /**
   * =======================================================================
   * 6. INITIALIZATION & SECTION MOUNTING
   * Checks if #lab exists in index.html; fills it if empty.
   * Places #lab before #credentials in the document flow.
   * =======================================================================
   */
  function initLab() {
    // 1. Locate or create #lab section container
    let lab = document.getElementById('lab');
    if (!lab) {
      lab = document.createElement('section');
      lab.id = 'lab';
      lab.className = 'py-24 sm:py-32 border-t border-[#2A2418] bg-[#0A0A0A] relative overflow-hidden';
    }

    // If #lab already exists but is empty, fill it instead of creating a second one
    if (!lab.hasChildNodes() || lab.innerHTML.trim() === '') {
      lab.innerHTML = `
        <!-- Subtle gold background radial glow matching existing sections -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glow-orb w-[500px] h-[500px] bg-[#C9A227]/[0.03] opacity-60 pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <!-- Section Heading matching existing portfolio editorial headers -->
          <div class="flex flex-col gap-4 text-left mb-16 sm:mb-20">
            <div class="reveal-up flex items-center gap-3">
              <span class="tilted-banner text-[10px] tracking-[0.25em] font-mono text-[#E5C76B] uppercase font-bold">
                ${CFG.section.tag}
              </span>
            </div>
            <div class="reveal-up">
              <h2 class="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-[#F5F1E8] uppercase leading-none">
                ${CFG.section.title}
              </h2>
            </div>
            <p class="reveal-up text-[#A8A29E] text-xs sm:text-sm max-w-md mt-1 font-light leading-relaxed">
              ${CFG.section.subtitle}
            </p>
          </div>

          <!-- 3 Feature Panels Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Panel 1: Sentiment Classifier -->
            <div id="lab-sentiment-panel" class="lab-card"></div>

            <!-- Panel 2: IoT Sensor Stream -->
            <div id="lab-iot-panel" class="lab-card"></div>
          </div>

          <!-- Panel 3: Interactive Skill Map (Full Width) -->
          <div id="lab-skillmap-panel" class="lab-card"></div>
        </div>
      `;

      // Render the 3 panels
      renderSentimentPanel(lab.querySelector('#lab-sentiment-panel'));
      renderIoTPanel(lab.querySelector('#lab-iot-panel'));
      renderSkillMap(lab.querySelector('#lab-skillmap-panel'));
    }

    // 2. Position #lab before #credentials in DOM if credentials exists
    const credentials = document.getElementById('credentials');
    if (credentials && lab.nextElementSibling !== credentials) {
      credentials.before(lab);
    } else if (!lab.parentElement) {
      document.body.appendChild(lab);
    }

    // 3. Setup command palette and sync nav pill
    setupCommandPalette();
    syncNavPill();

    // 4. MutationObserver for React hydration/loader completion
    const observer = new MutationObserver(() => {
      const cred = document.getElementById('credentials');
      if (cred && lab.nextElementSibling !== cred) {
        cred.before(lab);
      }
      syncNavPill();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Run on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLab);
  } else {
    initLab();
  }

})();

