import { useEffect, useRef } from "react";

// Performance optimizer helper hook for Canvas
function useCanvasOptimizer(canvasRef, drawFrame) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let isVisible = false;
    let lastTime = 0;
    const fpsInterval = 1000 / 30; // Limit to 30 FPS

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || canvas.parentElement?.clientWidth || 300;
      const height = 240;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    resize();
    
    // Use passive listener for resize
    window.addEventListener("resize", resize, { passive: true });

    const loop = (timestamp) => {
      if (!isVisible || document.visibilityState === "hidden") {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;

      if (elapsed >= fpsInterval) {
        lastTime = timestamp - (elapsed % fpsInterval);
        
        const rect = canvas.getBoundingClientRect();
        const w = rect.width || canvas.width;
        const h = 240;
        
        ctx.clearRect(0, 0, w, h);
        
        const isMobile = window.innerWidth < 768;
        drawFrame(ctx, w, h, isMobile);
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [drawFrame]);
}

// Project 1: Buoy Water Pollution & Algal Bloom Detection
export function WaterBuoyVisual() {
  const canvasRef = useRef(null);
  const offsetRef = useRef(0);

  const drawFrame = (ctx, w, h, isMobile) => {
    // Increment offset
    offsetRef.current += 0.02;
    const offset = offsetRef.current;

    // Draw background grid lines (simplified on mobile)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
    ctx.lineWidth = 1;
    const gridSize = isMobile ? 80 : 40;
    
    for (let i = 0; i < w; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
    }
    for (let j = 0; j < h; j += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(w, j);
      ctx.stroke();
    }

    // Draw waves (draw fewer waves on mobile)
    ctx.lineWidth = 1.5;
    const waveCount = isMobile ? 1 : 3;
    for (let waveIndex = 0; waveIndex < waveCount; waveIndex++) {
      ctx.strokeStyle = waveIndex === 0 ? "rgba(181, 255, 26, 0.4)" : "rgba(0, 240, 255, 0.2)";
      ctx.beginPath();
      
      // Step size is wider on mobile to save CPU cycles
      const step = isMobile ? 6 : 2;
      for (let x = 0; x < w; x += step) {
        const angle = (x / w) * Math.PI * 2 * 2 + offset + (waveIndex * Math.PI) / 3;
        const y = h / 2 + Math.sin(angle) * (15 - waveIndex * 3) + Math.cos(angle * 0.5) * 5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Sensor buoy nodes
    const sensorNodes = [
      { x: 0.25, phase: 0, label: "pH: 7.2" },
      { x: 0.5, phase: Math.PI / 2, label: "DO: 6.8 mg/L" },
      { x: 0.75, phase: Math.PI, label: "ALGAL: LOW" }
    ];

    sensorNodes.forEach((node) => {
      const xPos = node.x * w;
      const angle = (xPos / w) * Math.PI * 2 * 2 + offset + node.phase;
      const yPos = h / 2 + Math.sin(angle) * 15 + Math.cos(angle * 0.5) * 5;

      // Vertical line
      ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(xPos, yPos);
      ctx.lineTo(xPos, yPos + (isMobile ? 40 : 60));
      ctx.stroke();
      ctx.setLineDash([]);

      // Buoy head
      ctx.fillStyle = "#b5ff1a";
      ctx.beginPath();
      ctx.arc(xPos, yPos, 4, 0, Math.PI * 2);
      ctx.fill();

      // Anchor node
      ctx.fillStyle = "#00f0ff";
      ctx.beginPath();
      ctx.arc(xPos, yPos + (isMobile ? 40 : 60), 3, 0, Math.PI * 2);
      ctx.fill();

      // Label (Skip text rendering on small screens to save load)
      if (!isMobile) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.font = "9px ui-monospace, SFMono-Regular, monospace";
        ctx.fillText(node.label, xPos - 20, yPos - 12);
      }
    });

    ctx.fillStyle = "rgba(181, 255, 26, 0.5)";
    ctx.font = "8px ui-monospace, SFMono-Regular, monospace";
    ctx.fillText(`SENSOR_SYS: ONLINE // SAMPLE_RATE: 2.4GHz`, 15, 20);
  };

  useCanvasOptimizer(canvasRef, drawFrame);

  return <canvas ref={canvasRef} className="w-full bg-[#111215]/30 rounded-lg border border-white/[0.03]" />;
}

// Project 2: Human Activity Recognition System
export function ActivityRecognitionVisual() {
  const canvasRef = useRef(null);
  const dataPointsRef = useRef(Array(50).fill({ x: 0, y: 0, z: 0 }));
  const frameRef = useRef(0);

  const drawFrame = (ctx, w, h, isMobile) => {
    frameRef.current++;
    const frame = frameRef.current;
    
    let state = "WALKING";
    let multiplier = 12;
    if ((frame % 300) < 100) {
      state = "STANDING";
      multiplier = 1;
    } else if ((frame % 300) < 200) {
      state = "WALKING";
      multiplier = 10;
    } else {
      state = "RUNNING";
      multiplier = 25;
    }

    const noiseX = Math.sin(frame * 0.1) * multiplier + (Math.random() - 0.5) * 5;
    const noiseY = Math.cos(frame * 0.12) * (multiplier * 0.8) + (Math.random() - 0.5) * 4;
    const noiseZ = Math.sin(frame * 0.08 + 1) * (multiplier * 1.2) + (Math.random() - 0.5) * 6;

    dataPointsRef.current.shift();
    dataPointsRef.current.push({ x: noiseX, y: noiseY, z: noiseZ });

    const channels = [
      { key: "x", color: "#b5ff1a" },
      { key: "y", color: "#00f0ff" },
      { key: "z", color: "rgba(255, 255, 255, 0.4)" }
    ];

    const dataPoints = dataPointsRef.current;
    const historySize = dataPoints.length;

    // On mobile, only render X and Y channels to optimize layout
    const activeChannels = isMobile ? channels.slice(0, 2) : channels;

    activeChannels.forEach((chan, index) => {
      ctx.strokeStyle = chan.color;
      ctx.lineWidth = chan.key === "z" ? 1 : 1.5;
      ctx.beginPath();
      
      for (let i = 0; i < historySize; i++) {
        const xPos = (i / (historySize - 1)) * (w - 60) + 10;
        const val = dataPoints[i][chan.key];
        const yPos = h / 2 + val + (index - 1) * 15;
        if (i === 0) ctx.moveTo(xPos, yPos);
        else ctx.lineTo(xPos, yPos);
      }
      ctx.stroke();
    });

    ctx.fillStyle = "#b5ff1a";
    ctx.font = "9px ui-monospace, SFMono-Regular, monospace";
    ctx.fillText(`CLASSIFIER_STATE: ${state}`, 15, 20);

    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillText(`FREQ: 50Hz // CHANNELS: 3D_ACCEL`, w - (isMobile ? 140 : 160), 20);
  };

  useCanvasOptimizer(canvasRef, drawFrame);

  return <canvas ref={canvasRef} className="w-full bg-[#111215]/30 rounded-lg border border-white/[0.03]" />;
}

// Project 3: Clinical Note Summarization & Coding Assistant
export function ClinicalNLPVisual() {
  return (
    <div className="w-full h-[240px] bg-[#111215]/40 rounded-lg border border-white/[0.03] p-4 font-mono text-[10px] sm:text-xs overflow-hidden flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-white/[0.03] pb-2 text-[10px] text-slate-500">
        <span>PATIENT_RECORD_SUMMARIZER_V1.0</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-lime animate-pulse"></span>
          READY
        </span>
      </div>

      <div className="flex-1 py-3 flex flex-col gap-2.5 text-slate-300">
        <div>
          <span className="text-[#686f7a]">&gt;_ INPUT_NOTE:</span>
          <p className="leading-relaxed mt-1 text-slate-400">
            Patient presents with severe dyspnea and productive cough. Checked vitals: Temp{" "}
            <span className="px-1 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan font-semibold">
              38.5C [FEVER]
            </span>
            , HR 105. Suspected acute bronchial infection. Prescribed{" "}
            <span className="px-1 py-0.5 rounded bg-cyber-lime/10 border border-cyber-lime/30 text-cyber-lime font-semibold">
              Amoxicillin [RX]
            </span>{" "}
            500mg.
          </p>
        </div>

        <div className="border-t border-white/[0.03] pt-2">
          <span className="text-[#686f7a]">&gt;_ AI_SUMMARY_NER:</span>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="p-1.5 rounded bg-white/[0.02] border border-white/[0.04]">
              <div className="text-[9px] text-slate-500">ICD-10 CODE REC</div>
              <div className="text-cyber-lime font-semibold">J20.9 (Bronchitis)</div>
            </div>
            <div className="p-1.5 rounded bg-white/[0.02] border border-white/[0.04]">
              <div className="text-[9px] text-slate-500">MEDICATIONS FOUND</div>
              <div className="text-cyber-cyan font-semibold">Amoxicillin (500mg)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Project 4: Finance Market Dashboard
export function FinanceVisual() {
  const canvasRef = useRef(null);
  const offsetRef = useRef(0);

  const drawFrame = (ctx, w, h, isMobile) => {
    offsetRef.current += 0.015;
    const offset = offsetRef.current;

    // Draw Grid (Wider spacings on mobile)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
    ctx.lineWidth = 1;
    const gridSize = isMobile ? 60 : 30;
    
    for (let i = 0; i < w; i += gridSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
    }
    for (let j = 0; j < h; j += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(w, j);
      ctx.stroke();
    }

    // Chart points
    const chartPoints = [];
    const steps = isMobile ? 8 : 15; // half the calculations on mobile
    for (let i = 0; i <= steps; i++) {
      const xVal = (i / steps) * (w - 40) + 20;
      const noise = Math.sin(i * 0.5 + offset) * 12 + Math.cos(i * 0.8) * 6;
      const yVal = h * 0.6 + noise - (i * 2);
      chartPoints.push({ x: xVal, y: yVal });
    }

    // Gradient Fill
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "rgba(0, 240, 255, 0.15)");
    grad.addColorStop(1, "rgba(0, 240, 255, 0.0)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(chartPoints[0].x, h);
    chartPoints.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.lineTo(chartPoints[chartPoints.length - 1].x, h);
    ctx.closePath();
    ctx.fill();

    // Main line
    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    chartPoints.forEach((p, idx) => {
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();

    // Secondary points
    chartPoints.forEach((p, idx) => {
      if (idx % 3 === 0) {
        ctx.fillStyle = "#b5ff1a";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "8px ui-monospace, SFMono-Regular, monospace";
    ctx.fillText(`PORTFOLIO_VALUE: +12.4% // DTD_AVG`, 15, 20);
  };

  useCanvasOptimizer(canvasRef, drawFrame);

  return <canvas ref={canvasRef} className="w-full bg-[#111215]/30 rounded-lg border border-white/[0.03]" />;
}

// Project 5: Radiusdia Studio Architectural Blueprint Grid
export function RadiusdiaVisual() {
  const canvasRef = useRef(null);
  const offsetRef = useRef(0);

  const drawFrame = (ctx, w, h, isMobile) => {
    offsetRef.current = (offsetRef.current + 0.3) % 30;
    const offset = offsetRef.current;

    // Draw blueprint lines (Skip full grid lines on mobile)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    const spacing = isMobile ? 60 : 30;
    
    for (let i = -w; i < w * 2; i += spacing) {
      ctx.beginPath();
      ctx.moveTo(i + offset, 0);
      ctx.lineTo(i + offset + h, h);
      ctx.stroke();

      if (!isMobile) {
        ctx.beginPath();
        ctx.moveTo(i - offset, 0);
        ctx.lineTo(i - offset - h, h);
        ctx.stroke();
      }
    }

    // Technical cube projection
    ctx.strokeStyle = "rgba(181, 255, 26, 0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    const cx = w / 2;
    const cy = h / 2;
    const scale = 40 + Math.sin(offset * 0.05) * 5;

    // Outer cube
    ctx.moveTo(cx, cy - scale);
    ctx.lineTo(cx + scale * 1.5, cy - scale * 0.5);
    ctx.lineTo(cx + scale * 1.5, cy + scale * 0.5);
    ctx.lineTo(cx, cy + scale);
    ctx.lineTo(cx - scale * 1.5, cy + scale * 0.5);
    ctx.lineTo(cx - scale * 1.5, cy - scale * 0.5);
    ctx.closePath();
    ctx.stroke();

    // Internal connecting lines
    ctx.beginPath();
    ctx.moveTo(cx, cy - scale);
    ctx.lineTo(cx, cy + scale);
    ctx.moveTo(cx, cy + scale);
    ctx.lineTo(cx + scale * 1.5, cy - scale * 0.5);
    ctx.moveTo(cx, cy + scale);
    ctx.lineTo(cx - scale * 1.5, cy - scale * 0.5);
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "8px ui-monospace, SFMono-Regular, monospace";
    ctx.fillText(`VECTOR_CAD: ACTIVE // ORTHO_PROJ`, 15, 20);
  };

  useCanvasOptimizer(canvasRef, drawFrame);

  return <canvas ref={canvasRef} className="w-full bg-[#111215]/30 rounded-lg border border-white/[0.03]" />;
}

// Master Component Switcher
export default function ProjectVisual({ index }) {
  switch (index) {
    case 1:
      return <WaterBuoyVisual />;
    case 2:
      return <ActivityRecognitionVisual />;
    case 3:
      return <ClinicalNLPVisual />;
    case 4:
      return <FinanceVisual />;
    case 5:
      return <RadiusdiaVisual />;
    default:
      return null;
  }
}
