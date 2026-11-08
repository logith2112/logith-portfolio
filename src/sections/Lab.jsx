import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import SplitHeading from "../components/SplitHeading";
import { Zap, Play, Pause, Activity, RefreshCw } from "lucide-react";

/**
 * Real Portfolio Data for Lab Features
 */
const CFG = {
  projects: [
    {
      id: "proj-buoy",
      name: "AI-Enabled Buoy for Early Pollution & Algal Bloom Detection",
      shortName: "AI Pollution Buoy",
      category: "AI + IOT",
      skills: ["Python", "Machine Learning", "IoT & Sensors"],
    },
    {
      id: "proj-har",
      name: "Human Activity Recognition System",
      shortName: "Human Activity Recognition",
      category: "MACHINE LEARNING",
      skills: ["Python", "Machine Learning", "Data Processing"],
    },
    {
      id: "proj-clinical",
      name: "Clinical Note Summarization & Coding Assistant",
      shortName: "Clinical NLP Assistant",
      category: "HEALTHCARE AI",
      skills: ["Python", "NLP & Transformers", "Machine Learning"],
    },
    {
      id: "proj-finance",
      name: "Finance Market: Personal Finance Dashboard",
      shortName: "Finance Dashboard",
      category: "WEB APPLICATION",
      skills: ["React", "Data Visualization", "SQL & Databases"],
    },
    {
      id: "proj-radiusdia",
      name: "Radiusdia Studio",
      shortName: "Radiusdia Studio Website",
      category: "FRONTEND DEVELOPMENT",
      skills: ["React", "Frontend & Web", "Data Visualization"],
    },
  ],

  skills: [
    { id: "skill-python", name: "Python", category: "LANGUAGES" },
    { id: "skill-sql", name: "SQL & Databases", category: "DATABASES" },
    { id: "skill-react", name: "React", category: "FRAMEWORKS" },
    { id: "skill-ml", name: "Machine Learning", category: "AI & ML" },
    { id: "skill-nlp", name: "NLP & Transformers", category: "AI & ML" },
    { id: "skill-iot", name: "IoT & Sensors", category: "HARDWARE" },
    { id: "skill-dataviz", name: "Data Visualization", category: "ANALYTICS" },
    { id: "skill-web", name: "Frontend & Web", category: "FRONTEND" },
  ],

  sentiment: {
    tag: "NLP // REAL-TIME INFERENCE",
    title: "Text Sentiment Classifier",
    description:
      'Lexicon model with contextual negation window handling ("not good", "not bad"). Shows polarity label, confidence percentage, and gold progress meter.',
    initialText:
      "The environmental sensor pipeline is not good at handling high latency, but the buoy model accuracy is surprisingly great.",
    samples: [
      "The model accuracy is surprisingly fast and reliable.",
      "Sensor telemetry is not good, high failure rate and latency.",
      "Initial power consumption was not bad, solid stability overall.",
      "Critical buffer overflow: totally broken stream and terrible lag.",
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
        weak: 1, difficult: 1, hard: 1, warning: 1, delay: 1, concern: 1, issue: 1, odd: 1, noisy: 1, risky: 1, "sub-optimal": 1, stale: 1,
      },
      negators: [
        "not", "no", "never", "cannot", "cant", "can't", "wont", "won't", "dont", "don't", "doesnt", "doesn't",
        "didnt", "didn't", "isnt", "isn't", "arent", "aren't", "wasnt", "wasn't", "werent", "weren't",
        "hardly", "scarcely", "barely", "without", "lack", "lacks", "lacking",
      ],
      intensifiers: {
        very: 1.5, extremely: 2.0, highly: 1.7, incredibly: 1.8, really: 1.4, super: 1.5,
        absolutely: 1.9, completely: 1.6, totally: 1.6, slightly: 0.6, somewhat: 0.7,
      },
    },
  },

  iot: {
    tag: "IoT TELEMETRY // STATISTICAL ANOMALY DETECTION",
    title: "Simulated IoT Temperature Stream",
    description:
      "Simulated buoy sensor temperature feed on a canvas with rolling Gaussian statistics and continuous Z-score anomaly alerting.",
    baselineTemp: 24.0,
    noiseSigma: 0.35,
    driftSpeed: 0.06,
    zThreshold: 3.0,
    windowSize: 45,
    tickInterval: 280,
    faultDelta: 7.5,
  },

  skillMap: {
    tag: "RELATIONSHIP GRAPH // CAPABILITY MAPPING",
    title: "Interactive Skill Map",
    description:
      "Bilateral relationship graph linking core skills and projects. Hover or focus any node on either side to trace connections.",
  },
};

/**
 * Text Sentiment Analysis Engine
 */
function analyzeSentiment(text) {
  if (!text || !text.trim()) {
    return { score: 0, label: "Neutral", confidence: 50, matched: [], negationsFound: 0 };
  }

  const { positive, negative, negators, intensifiers } = CFG.sentiment.lexicon;
  const negatorSet = new Set(negators.map((w) => w.toLowerCase()));
  const tokens = text.toLowerCase().match(/\b[a-z0-9'-]+\b|[.!?,;]/gi) || [];

  let totalScore = 0;
  let sentimentCount = 0;
  let negationScope = 0;
  let activeMultiplier = 1;
  const matched = [];
  let negationsFound = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].toLowerCase();

    if (token === "." || token === "!" || token === "?" || token === ";" || token === ",") {
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

  let label = "Neutral";
  if (totalScore > 0.25) label = "Positive";
  else if (totalScore < -0.25) label = "Negative";

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

export default function Lab() {
  // --- Feature 1: Sentiment Classifier State ---
  const [inputText, setInputText] = useState(CFG.sentiment.initialText);
  const sentimentResult = useMemo(() => analyzeSentiment(inputText), [inputText]);

  // --- Feature 2: IoT Sensor Stream State ---
  const canvasRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [iotStats, setIotStats] = useState({
    temp: 24.0,
    mean: 24.0,
    stdDev: 0.35,
    zScore: 0.0,
    isAnomaly: false,
    history: [],
  });

  const iotStateRef = useRef({
    time: 0,
    history: [],
    faultQueue: [],
  });

  // Seed initial IoT history buffer once
  useEffect(() => {
    const state = iotStateRef.current;
    if (state.history.length === 0) {
      const cfg = CFG.iot;
      for (let i = 0; i < cfg.windowSize; i++) {
        state.time++;
        const drift = Math.sin(state.time * cfg.driftSpeed) * 0.5;
        const u1 = Math.random() || 0.001;
        const u2 = Math.random() || 0.001;
        const noise = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2) * cfg.noiseSigma;
        const temp = Math.round((cfg.baselineTemp + drift + noise) * 100) / 100;
        state.history.push({ time: state.time, temp, isFault: false, zScore: 0 });
      }

      // Compute initial stats
      const sum = state.history.reduce((acc, p) => acc + p.temp, 0);
      const mean = sum / state.history.length;
      const variance =
        state.history.reduce((acc, p) => acc + Math.pow(p.temp - mean, 2), 0) / state.history.length;
      const stdDev = Math.max(0.18, Math.sqrt(variance));
      const latest = state.history[state.history.length - 1];

      setIotStats({
        temp: latest.temp,
        mean: Math.round(mean * 100) / 100,
        stdDev: Math.round(stdDev * 100) / 100,
        zScore: 0.0,
        isAnomaly: false,
        history: [...state.history],
      });
    }
  }, []);

  // Run IoT Telemetry Interval
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const state = iotStateRef.current;
      const cfg = CFG.iot;

      state.time++;
      let faultOffset = 0;
      let isFault = false;

      if (state.faultQueue.length > 0) {
        faultOffset = state.faultQueue.shift();
        isFault = true;
      }

      const drift = Math.sin(state.time * cfg.driftSpeed) * 0.5;
      const u1 = Math.random() || 0.001;
      const u2 = Math.random() || 0.001;
      const noise = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2) * cfg.noiseSigma;
      const temp = Math.round((cfg.baselineTemp + drift + noise + faultOffset) * 100) / 100;

      state.history.push({ time: state.time, temp, isFault, zScore: 0 });
      if (state.history.length > cfg.windowSize) {
        state.history.shift();
      }

      const nominal = state.history.filter((p) => !p.isFault);
      const pool = nominal.length >= 10 ? nominal : state.history;
      const sum = pool.reduce((acc, p) => acc + p.temp, 0);
      const mean = sum / pool.length;
      const variance =
        pool.reduce((acc, p) => acc + Math.pow(p.temp - mean, 2), 0) / pool.length;
      const stdDev = Math.max(0.18, Math.sqrt(variance));

      const latest = state.history[state.history.length - 1];
      const zScore = (latest.temp - mean) / stdDev;
      latest.zScore = Math.round(zScore * 100) / 100;
      const isAnomaly = Math.abs(latest.zScore) >= cfg.zThreshold;

      setIotStats({
        temp: latest.temp,
        mean: Math.round(mean * 100) / 100,
        stdDev: Math.round(stdDev * 100) / 100,
        zScore: latest.zScore,
        isAnomaly,
        history: [...state.history],
      });
    }, CFG.iot.tickInterval);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Draw IoT Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height;

    if (width === 0 || height === 0) return;

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const history = iotStats.history;
    if (history.length < 2) {
      ctx.restore();
      return;
    }

    const temps = history.map((p) => p.temp);
    const minTemp = Math.min(...temps, iotStats.mean - iotStats.stdDev * 3.5);
    const maxTemp = Math.max(...temps, iotStats.mean + iotStats.stdDev * 3.5);
    const range = Math.max(2.5, maxTemp - minTemp);

    const padTop = 16;
    const padBottom = 22;
    const padLeft = 36;
    const padRight = 14;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    const getY = (t) => padTop + plotH - ((t - minTemp) / range) * plotH;
    const getX = (idx) => padLeft + (idx / (history.length - 1)) * plotW;

    // Draw horizontal grid lines
    ctx.strokeStyle = "rgba(42, 36, 24, 0.7)";
    ctx.fillStyle = "#A8A29E";
    ctx.font = "9px ui-monospace, monospace";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

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

    // Draw 3-sigma anomaly threshold lines (Red dashed)
    const upperY = getY(iotStats.mean + iotStats.stdDev * CFG.iot.zThreshold);
    const lowerY = getY(iotStats.mean - iotStats.stdDev * CFG.iot.zThreshold);

    ctx.save();
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = "rgba(239, 68, 68, 0.5)";
    ctx.beginPath();
    ctx.moveTo(padLeft, upperY);
    ctx.lineTo(width - padRight, upperY);
    ctx.moveTo(padLeft, lowerY);
    ctx.lineTo(width - padRight, lowerY);
    ctx.stroke();
    ctx.restore();

    // Draw mean baseline (Gold dashed)
    ctx.save();
    ctx.setLineDash([2, 4]);
    ctx.strokeStyle = "rgba(201, 162, 39, 0.35)";
    const meanY = getY(iotStats.mean);
    ctx.beginPath();
    ctx.moveTo(padLeft, meanY);
    ctx.lineTo(width - padRight, meanY);
    ctx.stroke();
    ctx.restore();

    // Area fill under curve
    const grad = ctx.createLinearGradient(0, padTop, 0, height - padBottom);
    grad.addColorStop(0, "rgba(201, 162, 39, 0.22)");
    grad.addColorStop(1, "rgba(201, 162, 39, 0.00)");

    ctx.beginPath();
    ctx.moveTo(getX(0), height - padBottom);
    for (let i = 0; i < history.length; i++) {
      ctx.lineTo(getX(i), getY(history[i].temp));
    }
    ctx.lineTo(getX(history.length - 1), height - padBottom);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line curve in gold
    ctx.beginPath();
    for (let i = 0; i < history.length; i++) {
      const x = getX(i);
      const y = getY(history[i].temp);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "#C9A227";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Anomaly points highlight
    for (let i = 0; i < history.length; i++) {
      const pt = history[i];
      if (Math.abs(pt.zScore) >= CFG.iot.zThreshold || pt.isFault) {
        const x = getX(i);
        const y = getY(pt.temp);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#EF4444";
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    ctx.restore();
  }, [iotStats]);

  const handleInjectFault = () => {
    const delta = CFG.iot.faultDelta;
    iotStateRef.current.faultQueue.push(delta, delta * 0.7, delta * 0.35, delta * 0.15);
  };

  // --- Feature 3: Interactive Skill Map State ---
  const skillMapContainerRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null); // { id: string, isSkill: boolean } | null
  const [hoveredNode, setHoveredNode] = useState(null); // { id: string, isSkill: boolean } | null
  const [svgPaths, setSvgPaths] = useState([]);

  // Compute connections between real skills & projects
  const connections = useMemo(() => {
    const conns = [];
    CFG.projects.forEach((proj) => {
      proj.skills.forEach((sName) => {
        const skill = CFG.skills.find(
          (s) =>
            s.name.toLowerCase() === sName.toLowerCase() ||
            sName.toLowerCase().includes(s.name.toLowerCase())
        );
        if (skill) {
          conns.push({
            skillId: skill.id,
            projId: proj.id,
            skillName: skill.name,
            projName: proj.name,
          });
        }
      });
    });
    return conns;
  }, []);

  // Update dynamic SVG Bézier curves
  const updateBezierPaths = useCallback(() => {
    const container = skillMapContainerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    if (cRect.width === 0 || cRect.height === 0) return;

    const paths = connections.map((conn, idx) => {
      const sEl = container.querySelector(`[data-node-id="${conn.skillId}"]`);
      const pEl = container.querySelector(`[data-node-id="${conn.projId}"]`);
      if (!sEl || !pEl) return null;

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

      const d = `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
      return { id: `path-${idx}`, d, skillId: conn.skillId, projId: conn.projId };
    });

    setSvgPaths(paths.filter(Boolean));
  }, [connections]);

  useEffect(() => {
    updateBezierPaths();
    const container = skillMapContainerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(updateBezierPaths);
    });
    ro.observe(container);

    window.addEventListener("resize", updateBezierPaths, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateBezierPaths);
    };
  }, [updateBezierPaths]);

  // Determine active target node (hover takes precedence, then click selection)
  const activeFocus = hoveredNode || selectedNode;

  const connectedTargetIds = useMemo(() => {
    if (!activeFocus) return new Set();
    const set = new Set();
    connections.forEach((c) => {
      if (activeFocus.isSkill && c.skillId === activeFocus.id) {
        set.add(c.projId);
      } else if (!activeFocus.isSkill && c.projId === activeFocus.id) {
        set.add(c.skillId);
      }
    });
    return set;
  }, [activeFocus, connections]);

  // Status text description for capability mapping
  const statusCaption = useMemo(() => {
    if (!activeFocus) {
      return "Hover, tap, or focus any skill or project above to trace technical relationships.";
    }
    if (activeFocus.isSkill) {
      const s = CFG.skills.find((item) => item.id === activeFocus.id);
      const pNames = CFG.projects
        .filter((p) => connectedTargetIds.has(p.id))
        .map((p) => p.shortName || p.name);
      return (
        <span>
          <strong className="text-[#E5C76B]">{s?.name}</strong> is utilized across{" "}
          <strong>{pNames.length}</strong> project{pNames.length !== 1 ? "s" : ""}: {pNames.join(" • ")}
        </span>
      );
    } else {
      const p = CFG.projects.find((item) => item.id === activeFocus.id);
      const sNames = CFG.skills
        .filter((s) => connectedTargetIds.has(s.id))
        .map((s) => s.name);
      return (
        <span>
          <strong className="text-[#E5C76B]">{p?.name}</strong> integrates{" "}
          <strong>{sNames.length}</strong> technical skills: {sNames.join(" • ")}
        </span>
      );
    }
  }, [activeFocus, connectedTargetIds]);

  const handleNodeClick = (id, isSkill) => {
    if (selectedNode?.id === id) {
      setSelectedNode(null);
    } else {
      setSelectedNode({ id, isSkill });
    }
  };

  return (
    <section
      id="lab"
      className="py-24 sm:py-32 border-t border-[#2A2418] bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glow-orb w-[500px] h-[500px] bg-[#C9A227]/[0.03] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Editorial Header */}
        <div className="flex flex-col gap-4 text-left mb-16 sm:mb-20">
          <div className="reveal-up flex items-center gap-3">
            <span className="tilted-banner text-[10px] tracking-[0.25em] font-mono text-[#E5C76B] uppercase font-bold">
              INTERACTIVE LAB // CLIENT-SIDE INTELLIGENCE
            </span>
          </div>

          <div className="reveal-up">
            <SplitHeading
              as="h2"
              text="INTERACTIVE LAB"
              className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-[#F5F1E8] uppercase leading-none"
            />
          </div>

          <p className="reveal-up text-[#A8A29E] text-xs sm:text-sm max-w-md mt-1 font-light leading-relaxed">
            Client-side machine learning inference, real-time sensor telemetry, and technical capability mapping.
          </p>
        </div>

        {/* 2-Column Grid: Sentiment & IoT Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Panel 1: Text Sentiment Classifier */}
          <div className="lab-card flex flex-col justify-between gap-6">
            <div>
              <div className="text-[9px] font-sans tracking-[0.25em] text-[#C9A227] uppercase font-semibold mb-2">
                {CFG.sentiment.tag}
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#F5F1E8] mb-2">
                {CFG.sentiment.title}
              </h3>
              <p className="text-[#A8A29E] text-xs sm:text-sm font-light leading-relaxed mb-4">
                {CFG.sentiment.description}
              </p>

              {/* Sample Test Chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {CFG.sentiment.samples.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setInputText(s)}
                    className="px-2.5 py-1 text-[11px] rounded-full bg-[#111111] border border-[#2A2418] text-[#A8A29E] hover:text-[#F5F1E8] hover:border-[#C9A227] transition-all duration-200 cursor-pointer"
                  >
                    Sample {idx + 1}
                  </button>
                ))}
              </div>

              {/* Text Input */}
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={3}
                className="w-full bg-[#0E0E0E] border border-[#2A2418] focus:border-[#C9A227] rounded p-3 text-xs sm:text-sm text-[#F5F1E8] outline-none transition-colors duration-300 resize-none font-sans"
                placeholder="Type or paste any phrase to test client-side sentiment inference..."
              />

              {/* Output Metres */}
              <div className="mt-4 p-3.5 rounded bg-[#111111] border border-[#2A2418]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-semibold tracking-wider text-[#A8A29E] uppercase">
                    Classification
                  </span>
                  <span
                    className={`text-xs font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      sentimentResult.label === "Positive"
                        ? "bg-[#C9A227]/20 text-[#E5C76B] border border-[#C9A227]/40"
                        : sentimentResult.label === "Negative"
                        ? "bg-red-500/20 text-red-400 border border-red-500/40"
                        : "bg-gray-500/20 text-gray-300 border border-gray-500/40"
                    }`}
                  >
                    {sentimentResult.label}
                  </span>
                </div>

                {/* Gold Confidence Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-[11px] font-mono text-[#A8A29E] mb-1">
                    <span>Confidence Meter</span>
                    <span>{sentimentResult.confidence}% Confidence</span>
                  </div>
                  <div
                    className="w-full h-1.5 rounded-full bg-[#1F1F1F] overflow-hidden"
                    role="progressbar"
                    aria-valuenow={sentimentResult.confidence}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="lab-progress-bar"
                      style={{ width: `${sentimentResult.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Token & Negation Breakdown */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#2A2418] text-[10px] font-mono text-[#A8A29E]">
                  <span className="px-2 py-0.5 rounded bg-[#161616] border border-[#2A2418]">
                    Net Score: {sentimentResult.score > 0 ? "+" : ""}
                    {sentimentResult.score}
                  </span>
                  {sentimentResult.negationsFound > 0 && (
                    <span className="px-2 py-0.5 rounded bg-[#161616] border border-[#C9A227]/40 text-[#E5C76B]">
                      Negation Active ({sentimentResult.negationsFound})
                    </span>
                  )}
                  {sentimentResult.matched.length > 0 && (
                    <span className="px-2 py-0.5 rounded bg-[#161616] border border-[#2A2418]">
                      Tokens:{" "}
                      {sentimentResult.matched
                        .slice(0, 3)
                        .map((m) => `${m.negated ? "¬" : ""}${m.word}`)
                        .join(", ")}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-[#A8A29E]/60">
              <Activity className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>INFERENCE: LEXICON_NEGATION_V2 // LATENCY: &lt;1ms</span>
            </div>
          </div>

          {/* Panel 2: IoT Sensor Stream & Z-Score Anomaly Detector */}
          <div className="lab-card flex flex-col justify-between gap-6">
            <div>
              <div className="text-[9px] font-sans tracking-[0.25em] text-[#C9A227] uppercase font-semibold mb-2">
                {CFG.iot.tag}
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#F5F1E8] mb-2">
                {CFG.iot.title}
              </h3>
              <p className="text-[#A8A29E] text-xs sm:text-sm font-light leading-relaxed mb-4">
                {CFG.iot.description}
              </p>

              {/* Telemetry HUD */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
                <div className="p-2.5 rounded bg-[#111111] border border-[#2A2418]">
                  <span className="block text-[9px] font-mono tracking-widest text-[#A8A29E] uppercase mb-1">
                    Current
                  </span>
                  <span className="text-sm font-mono font-bold text-[#F5F1E8]">
                    {iotStats.temp.toFixed(2)} °C
                  </span>
                </div>
                <div className="p-2.5 rounded bg-[#111111] border border-[#2A2418]">
                  <span className="block text-[9px] font-mono tracking-widest text-[#A8A29E] uppercase mb-1">
                    Mean (μ)
                  </span>
                  <span className="text-sm font-mono font-bold text-[#F5F1E8]">
                    {iotStats.mean.toFixed(2)} °C
                  </span>
                </div>
                <div className="p-2.5 rounded bg-[#111111] border border-[#2A2418]">
                  <span className="block text-[9px] font-mono tracking-widest text-[#A8A29E] uppercase mb-1">
                    Std Dev (σ)
                  </span>
                  <span className="text-sm font-mono font-bold text-[#F5F1E8]">
                    {iotStats.stdDev.toFixed(2)} °C
                  </span>
                </div>
                <div className="p-2.5 rounded bg-[#111111] border border-[#2A2418]">
                  <span className="block text-[9px] font-mono tracking-widest text-[#A8A29E] uppercase mb-1">
                    Z-Score
                  </span>
                  <span
                    className={`text-sm font-mono font-bold ${
                      Math.abs(iotStats.zScore) >= CFG.iot.zThreshold
                        ? "text-red-400"
                        : "text-[#F5F1E8]"
                    }`}
                  >
                    {iotStats.zScore > 0 ? "+" : ""}
                    {iotStats.zScore.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Anomaly Alert Banner */}
              <div
                className={`flex items-center justify-between px-3.5 py-2.5 rounded border text-xs font-mono transition-all duration-300 mb-3 ${
                  iotStats.isAnomaly
                    ? "border-red-500/60 bg-red-950/30 text-red-400 font-bold animate-pulse"
                    : "border-[#2A2418] bg-[#14120e] text-[#A8A29E]"
                }`}
              >
                <span>
                  {iotStats.isAnomaly
                    ? "ALERT: 3.0σ STATISTICAL ANOMALY DETECTED"
                    : "STATUS: ALL SENSOR READINGS NOMINAL"}
                </span>
                <span>|Z| &ge; 3.0σ</span>
              </div>

              {/* Canvas Graph */}
              <div className="w-full h-44 sm:h-52 bg-[#0E0E0E] border border-[#2A2418] rounded overflow-hidden relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full block"
                  role="img"
                  aria-label="Simulated IoT telemetry line showing rolling temperature data and statistical anomaly thresholds"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleInjectFault}
                className="lab-btn-gold flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" /> Inject a Fault
              </button>
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="lab-btn-subtle flex items-center gap-1.5"
                aria-label="Pause or resume telemetry stream"
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                {isPaused ? "Resume Stream" : "Pause Stream"}
              </button>
            </div>
          </div>
        </div>

        {/* Panel 3: Interactive Skill Map (Full Width) */}
        <div className="lab-card">
          <div className="text-[10px] tracking-[0.25em] font-mono text-[#E5C76B] uppercase font-bold mb-2">
            {CFG.skillMap.tag}
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#F5F1E8] mb-2">
            {CFG.skillMap.title}
          </h3>
          <p className="text-[#A8A29E] text-xs sm:text-sm font-light leading-relaxed mb-6 font-sans">
            {CFG.skillMap.description}
          </p>

          {/* Interactive Node-Link Graph Container */}
          <div className="skillmap-container" ref={skillMapContainerRef}>
            {/* Background SVG Overlay for Connecting Paths */}
            <svg className="skillmap-overlay-svg" aria-hidden="true">
              <g>
                {svgPaths.map((p) => {
                  const isHighlighted =
                    activeFocus &&
                    (activeFocus.isSkill
                      ? activeFocus.id === p.skillId
                      : activeFocus.id === p.projId);
                  const isDimmed = activeFocus && !isHighlighted;

                  return (
                    <path
                      key={p.id}
                      d={p.d}
                      className={`skillmap-path ${isHighlighted ? "highlighted" : ""} ${
                        isDimmed ? "dimmed" : ""
                      }`}
                      fill="none"
                      stroke={isHighlighted ? "#C9A227" : "rgba(201, 162, 39, 0.3)"}
                      strokeWidth={isHighlighted ? 2.5 : 1.5}
                      strokeLinecap="round"
                    />
                  );
                })}
              </g>
            </svg>

            {/* Columns of Nodes */}
            <div className="skillmap-columns">
              {/* Left Column: Skills */}
              <div className="skillmap-col-skills" role="group" aria-label="Technical Skills">
                {CFG.skills.map((s) => {
                  const isSelected = selectedNode?.id === s.id;
                  const isHovered = hoveredNode?.id === s.id;
                  const isConnected =
                    activeFocus && !activeFocus.isSkill && connectedTargetIds.has(s.id);
                  const isDimmed =
                    activeFocus &&
                    activeFocus.id !== s.id &&
                    !(activeFocus.isSkill ? false : isConnected);

                  return (
                    <div
                      key={s.id}
                      data-node-id={s.id}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isSelected}
                      aria-label={`Skill: ${s.name} (${s.category})`}
                      onClick={() => handleNodeClick(s.id, true)}
                      onMouseEnter={() => setHoveredNode({ id: s.id, isSkill: true })}
                      onMouseLeave={() => setHoveredNode(null)}
                      onFocus={() => setHoveredNode({ id: s.id, isSkill: true })}
                      onBlur={() => setHoveredNode(null)}
                      className={`skillmap-node skill-node ${isSelected ? "selected" : ""} ${
                        isConnected || isHovered ? "connected" : ""
                      } ${isDimmed ? "dimmed" : ""}`}
                    >
                      <span className="skillmap-node-name">{s.name}</span>
                      <span className="skillmap-node-tag">{s.category}</span>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Projects */}
              <div className="skillmap-col-projects" role="group" aria-label="Portfolio Projects">
                {CFG.projects.map((p) => {
                  const isSelected = selectedNode?.id === p.id;
                  const isHovered = hoveredNode?.id === p.id;
                  const isConnected =
                    activeFocus && activeFocus.isSkill && connectedTargetIds.has(p.id);
                  const isDimmed =
                    activeFocus &&
                    activeFocus.id !== p.id &&
                    !(activeFocus.isSkill ? isConnected : false);

                  return (
                    <div
                      key={p.id}
                      data-node-id={p.id}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isSelected}
                      aria-label={`Project: ${p.name}`}
                      onClick={() => handleNodeClick(p.id, false)}
                      onMouseEnter={() => setHoveredNode({ id: p.id, isSkill: false })}
                      onMouseLeave={() => setHoveredNode(null)}
                      onFocus={() => setHoveredNode({ id: p.id, isSkill: false })}
                      onBlur={() => setHoveredNode(null)}
                      className={`skillmap-node proj-node ${isSelected ? "selected" : ""} ${
                        isConnected || isHovered ? "connected" : ""
                      } ${isDimmed ? "dimmed" : ""}`}
                    >
                      <span className="skillmap-node-name">{p.shortName || p.name}</span>
                      <span className="skillmap-node-tag">{p.category}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dynamic Status / Caption Footer */}
          <div className="flex items-center gap-3 p-3.5 rounded border border-[#2A2418] bg-[#111111]/80 text-xs text-[#A8A29E] font-sans mt-6">
            <span className="w-2 h-2 rounded-full bg-[#C9A227] shrink-0 shadow-[0_0_8px_#C9A227]" />
            <div className="flex-1">{statusCaption}</div>
            {selectedNode && (
              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="text-[10px] font-mono text-[#C9A227] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
