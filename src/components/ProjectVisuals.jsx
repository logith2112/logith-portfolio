import { useEffect, useRef } from "react";

// Project 1: Buoy Water Pollution & Algal Bloom Detection
export function WaterBuoyVisual() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 240;
    };
    resize();
    window.addEventListener("resize", resize);

    let offset = 0;
    const sensorNodes = [
      { x: 0.25, phase: 0, depth: 30, temp: 24.2, label: "pH: 7.2" },
      { x: 0.5, phase: Math.PI / 2, depth: 40, temp: 23.8, label: "DO: 6.8 mg/L" },
      { x: 0.75, phase: Math.PI, depth: 25, temp: 24.5, label: "ALGAL: LOW" }
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw grid lines in the background of canvas
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
      }
      for (let j = 0; j < h; j += 40) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(w, j);
        ctx.stroke();
      }

      // Draw waves
      ctx.lineWidth = 1.5;
      for (let waveIndex = 0; waveIndex < 3; waveIndex++) {
        ctx.strokeStyle = waveIndex === 0 ? "rgba(181, 255, 26, 0.4)" : "rgba(0, 240, 255, 0.2)";
        ctx.beginPath();
        for (let x = 0; x < w; x++) {
          const angle = (x / w) * Math.PI * 2 * 2 + offset + (waveIndex * Math.PI) / 3;
          const y = h / 2 + Math.sin(angle) * (15 - waveIndex * 3) + Math.cos(angle * 0.5) * 5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw sensory nodes / Buoys
      sensorNodes.forEach((node) => {
        const xPos = node.x * w;
        const angle = (xPos / w) * Math.PI * 2 * 2 + offset + node.phase;
        const yPos = h / 2 + Math.sin(angle) * 15 + Math.cos(angle * 0.5) * 5;

        // Draw buoy vertical telemetry connection line
        ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(xPos, yPos);
        ctx.lineTo(xPos, yPos + 60);
        ctx.stroke();
        ctx.setLineDash([]);

        // Sensor head
        ctx.fillStyle = "#b5ff1a";
        ctx.beginPath();
        ctx.arc(xPos, yPos, 4, 0, Math.PI * 2);
        ctx.fill();

        // Pulsating glow ring
        ctx.strokeStyle = "rgba(181, 255, 26, 0.3)";
        ctx.beginPath();
        ctx.arc(xPos, yPos, 8 + Math.sin(offset * 3) * 4, 0, Math.PI * 2);
        ctx.stroke();

        // Under-water anchor node
        ctx.fillStyle = "#00f0ff";
        ctx.beginPath();
        ctx.arc(xPos, yPos + 60, 3, 0, Math.PI * 2);
        ctx.fill();

        // Telemetry label
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.font = "9px ui-monospace, SFMono-Regular, monospace";
        ctx.fillText(node.label, xPos - 20, yPos - 12);
      });

      // Ambient dynamic text indicators
      ctx.fillStyle = "rgba(181, 255, 26, 0.5)";
      ctx.font = "8px ui-monospace, SFMono-Regular, monospace";
      ctx.fillText(`SENSOR_SYS: ONLINE // SAMPLE_RATE: 2.4GHz`, 15, 20);

      offset += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full bg-[#111215]/30 rounded-lg border border-white/[0.03]" />;
}

// Project 2: Human Activity Recognition System
export function ActivityRecognitionVisual() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 240;
    };
    resize();
    window.addEventListener("resize", resize);

    const historySize = 50;
    const dataPoints = [];
    for (let i = 0; i < historySize; i++) {
      dataPoints.push({ x: 0, y: 0, z: 0 });
    }

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Update data traces (simulating Walking -> Running -> Standing states)
      frame++;
      let state = "WALKING";
      let multiplier = 12;
      if ((frame % 600) < 200) {
        state = "STANDING";
        multiplier = 1;
      } else if ((frame % 600) < 400) {
        state = "WALKING";
        multiplier = 10;
      } else {
        state = "RUNNING";
        multiplier = 25;
      }

      const noiseX = Math.sin(frame * 0.1) * multiplier + (Math.random() - 0.5) * 5;
      const noiseY = Math.cos(frame * 0.12) * (multiplier * 0.8) + (Math.random() - 0.5) * 4;
      const noiseZ = Math.sin(frame * 0.08 + 1) * (multiplier * 1.2) + (Math.random() - 0.5) * 6;

      dataPoints.shift();
      dataPoints.push({ x: noiseX, y: noiseY, z: noiseZ });

      // Draw accelerometer traces
      const channels = [
        { key: "x", color: "#b5ff1a", label: "ACC_X" },
        { key: "y", color: "#00f0ff", label: "ACC_Y" },
        { key: "z", color: "rgba(255, 255, 255, 0.4)", label: "ACC_Z" }
      ];

      channels.forEach((chan, index) => {
        ctx.strokeStyle = chan.color;
        ctx.lineWidth = chan.key === "z" ? 1 : 1.5;
        ctx.beginPath();
        for (let i = 0; i < historySize; i++) {
          const xPos = (i / (historySize - 1)) * (w - 60) + 10;
          const val = dataPoints[i][chan.key];
          const yPos = h / 2 + val + (index - 1) * 15; // slightly offset channels visually
          if (i === 0) ctx.moveTo(xPos, yPos);
          else ctx.lineTo(xPos, yPos);
        }
        ctx.stroke();
      });

      // Label classification state
      ctx.fillStyle = "#b5ff1a";
      ctx.font = "9px ui-monospace, SFMono-Regular, monospace";
      ctx.fillText(`CLASSIFIER_STATE: ${state}`, 15, 20);

      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fillText(`FREQ: 50Hz // CHANNELS: 3D_ACCEL`, w - 160, 20);

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 240;
    };
    resize();
    window.addEventListener("resize", resize);

    let offset = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      for (let i = 0; i < w; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
      }
      for (let j = 0; j < h; j += 30) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(w, j);
        ctx.stroke();
      }

      // Draw chart paths
      const chartPoints = [];
      const steps = 15;
      for (let i = 0; i <= steps; i++) {
        const xVal = (i / steps) * (w - 40) + 20;
        const noise = Math.sin(i * 0.5 + offset) * 12 + Math.cos(i * 0.8) * 6;
        const yVal = h * 0.6 + noise - (i * 2); // gradual upward trend
        chartPoints.push({ x: xVal, y: yVal });
      }

      // Gradient Fill
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(0, 240, 255, 0.2)");
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

      // Secondary metric (lime dots)
      chartPoints.forEach((p, idx) => {
        if (idx % 3 === 0) {
          ctx.fillStyle = "#b5ff1a";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = "rgba(181, 255, 26, 0.2)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Telemetry telemetry
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "8px ui-monospace, SFMono-Regular, monospace";
      ctx.fillText(`PORTFOLIO_VALUE: +12.4% // DTD_AVG`, 15, 20);

      offset += 0.015;
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full bg-[#111215]/30 rounded-lg border border-white/[0.03]" />;
}

// Project 5: Radiusdia Studio Architectural Blueprint Grid
export function RadiusdiaVisual() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 240;
    };
    resize();
    window.addEventListener("resize", resize);

    let offset = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw isometric blueprint style grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let i = -w; i < w * 2; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i + offset, 0);
        ctx.lineTo(i + offset + h, h);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(i - offset, 0);
        ctx.lineTo(i - offset - h, h);
        ctx.stroke();
      }

      // Draw fine technical drawing wireframe (e.g. abstract room or building shape)
      ctx.strokeStyle = "rgba(181, 255, 26, 0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Cube vertices projection
      const cx = w / 2;
      const cy = h / 2;
      const scale = 40 + Math.sin(offset * 0.05) * 5;

      // Draw isometric cube frame
      ctx.moveTo(cx, cy - scale); // Top vertex
      ctx.lineTo(cx + scale * 1.5, cy - scale * 0.5);
      ctx.lineTo(cx + scale * 1.5, cy + scale * 0.5);
      ctx.lineTo(cx, cy + scale);
      ctx.lineTo(cx - scale * 1.5, cy + scale * 0.5);
      ctx.lineTo(cx - scale * 1.5, cy - scale * 0.5);
      ctx.closePath();
      ctx.stroke();

      // Inside edges
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

      offset = (offset + 0.3) % 30;
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
