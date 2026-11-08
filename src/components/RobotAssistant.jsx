import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { RobotModel } from "./RobotModel";
import {
  X,
  Minus,
  Bot,
  User,
  FolderGit2,
  Cpu,
  GraduationCap,
  Award,
  FileText,
  Mail,
  ArrowUpRight,
} from "lucide-react";

/**
 * RobotAssistant
 * 
 * Interactive 3D Robot Assistant component.
 * Positioned in bottom-right corner.
 * Fully responsive, keyboard accessible, and preserves site performance.
 */
export default function RobotAssistant() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const robotRef = useRef(null);
  const animFrameRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  // UI state
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [isSpeechVisible, setIsSpeechVisible] = useState(false);
  const [webGlAvailable] = useState(() => {
    try {
      const c = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (c.getContext("webgl") || c.getContext("experimental-webgl"))
      );
    } catch {
      return false;
    }
  });
  const speechTimerRef = useRef(null);
  const visitedSectionsRef = useRef(new Set());

  // Show speech bubble with auto-dismiss
  const showSpeech = useCallback((text, duration = 4500) => {
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    setSpeechText(text);
    setIsSpeechVisible(true);
    speechTimerRef.current = setTimeout(() => {
      setIsSpeechVisible(false);
    }, duration);
  }, []);

  // --- Three.js Scene Setup & Loop ---
  useEffect(() => {
    if (isClosed || isMinimized || !webGlAvailable) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Verify WebGL availability safely
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (err) {
      console.warn("WebGL not supported or disabled in environment:", err);
      return;
    }

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = canvas.clientWidth || 150;
    const height = canvas.clientHeight || 180;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, 1.45, 3.8);
    camera.lookAt(0, 1.25, 0);
    cameraRef.current = camera;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    rendererRef.current = renderer;

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 1.5);
    keyLight.position.set(2.5, 4.0, 3.0);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xC9A227, 1.2);
    rimLight.position.set(-3.0, 2.5, -2.0);
    scene.add(rimLight);

    const frontGoldFill = new THREE.PointLight(0xE5C76B, 0.8, 5.0);
    frontGoldFill.position.set(0, 1.5, 2.5);
    scene.add(frontGoldFill);

    // 3. Initialize Robot Character
    const robot = new RobotModel();
    scene.add(robot.group);
    robotRef.current = robot;

    // Initial greeting triggered on first mount after brief delay
    const initialGreetingTimer = setTimeout(() => {
      if (robotRef.current) {
        robotRef.current.playGreeting();
        showSpeech("Hey! Welcome to Logith's Portfolio.");
      }
    }, 900);

    // 4. Resize Observer
    const handleResize = () => {
      if (!canvas || !rendererRef.current || !cameraRef.current) return;
      const w = canvas.clientWidth || 150;
      const h = canvas.clientHeight || 180;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h, false);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    // 5. Mouse tracking logic (Desktop only)
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isTouchDevice && !prefersReducedMotion) {
      robot.setTracking(true);
      const onPointerMove = (e) => {
        if (!canvasRef.current || !robotRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const robotCenterX = rect.left + rect.width / 2;
        const robotCenterY = rect.top + rect.height * 0.35; // Head height

        const dx = e.clientX - robotCenterX;
        const dy = e.clientY - robotCenterY;

        const nx = THREE.MathUtils.clamp(dx / (window.innerWidth * 0.45), -1.0, 1.0);
        const ny = THREE.MathUtils.clamp(dy / (window.innerHeight * 0.45), -1.0, 1.0);

        robotRef.current.setCursor(nx, ny);
      };

      const onMouseLeave = () => {
        if (robotRef.current) robotRef.current.setCursor(0, 0);
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("mouseleave", onMouseLeave);

      canvas._cleanupMouse = () => {
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("mouseleave", onMouseLeave);
      };
    } else {
      robot.setTracking(false);
    }

    // 6. Animation Render Loop
    let lastTime = performance.now();
    let isTabVisible = !document.hidden;

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      lastTime = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const renderLoop = (time) => {
      animFrameRef.current = requestAnimationFrame(renderLoop);
      if (!isTabVisible) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (robotRef.current) {
        robotRef.current.update(delta);
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    // Cleanup
    return () => {
      clearTimeout(initialGreetingTimer);
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (canvas._cleanupMouse) canvas._cleanupMouse();
      resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      if (robotRef.current) {
        robotRef.current.dispose();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [isClosed, isMinimized, showSpeech, webGlAvailable]);

  // --- Section Observers (Reactions on Scroll) ---
  useEffect(() => {
    if (isClosed) return;

    const sectionConfigs = [
      {
        id: "projects",
        action: () => {
          if (robotRef.current) robotRef.current.playPointing();
          showSpeech("Explore my projects!");
        },
      },
      {
        id: "skills",
        action: () => {
          if (robotRef.current) robotRef.current.playThinking();
          showSpeech("Let's explore my skills!");
        },
      },
      {
        id: "about",
        action: () => {
          if (robotRef.current) robotRef.current.playWave();
          showSpeech("Here's a little about me!");
        },
      },
      {
        id: "contact",
        action: () => {
          if (robotRef.current) robotRef.current.playWave();
          showSpeech("Let's connect!");
        },
      },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            // Only trigger ONCE per section visit, never looping continuously
            if (!visitedSectionsRef.current.has(sectionId)) {
              visitedSectionsRef.current.add(sectionId);
              const cfg = sectionConfigs.find((s) => s.id === sectionId);
              if (cfg) {
                setTimeout(() => {
                  if (!isPanelOpen) {
                    cfg.action();
                  }
                }, 400);
              }
            }
          } else {
            visitedSectionsRef.current.delete(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionConfigs.forEach((cfg) => {
      const el = document.getElementById(cfg.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isClosed, isPanelOpen, showSpeech]);

  // --- Click on Robot ---
  const handleRobotClick = () => {
    if (robotRef.current) {
      robotRef.current.playClickReaction();
    }
    setIsPanelOpen(true);
    showSpeech("How can I assist your portfolio tour?", 3000);
  };

  // --- Assistant Panel Action Navigation ---
  const handleNavigate = (targetId, isResume = false) => {
    if (isResume) {
      if (robotRef.current) robotRef.current.playThumbsUp();
      showSpeech("Opening Logith's Resume PDF!");
      window.open(
        `${import.meta.env.BASE_URL}Logith_T_Resume.pdf`,
        "_blank",
        "noopener,noreferrer"
      );
      setIsPanelOpen(false);
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      if (robotRef.current) {
        if (targetId === "projects") robotRef.current.playPointing();
        else if (targetId === "skills") robotRef.current.playThinking();
        else robotRef.current.playThumbsUp();
      }

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      targetEl.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });

      if (history.pushState) history.pushState(null, "", `#${targetId}`);
      else window.location.hash = `#${targetId}`;

      setIsPanelOpen(false);
    }
  };

  // If permanently closed, offer small unobtrusive reopen trigger in corner
  if (isClosed) {
    return (
      <div className="fixed bottom-4 right-4 z-40 pointer-events-auto">
        <button
          onClick={() => {
            setIsClosed(false);
            setIsMinimized(false);
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14120e]/90 border border-[#2A2418] text-[#C9A227] hover:border-[#C9A227] hover:text-[#E5C76B] text-[10px] font-sans font-semibold tracking-wider uppercase backdrop-blur-md shadow-xl transition-all duration-300 active:scale-95 cursor-pointer"
          aria-label="Summon 3D Robot Assistant"
          title="Summon 3D Robot Assistant"
        >
          <Bot className="w-3.5 h-3.5 text-[#C9A227]" />
          <span>AI Assistant</span>
        </button>
      </div>
    );
  }

  // Minimized Floating Pill
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 pointer-events-auto animate-fade-in">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#161616]/95 border border-[#C9A227]/70 text-[#F5F1E8] hover:border-[#E5C76B] shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_12px_rgba(201,162,39,0.25)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
          aria-label="Expand 3D Robot Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-[#0A0A0A] border border-[#C9A227] flex items-center justify-center text-[#C9A227]">
            <Bot className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-[10px] font-sans tracking-[0.18em] font-semibold text-[#E5C76B] uppercase">
            AI ASSISTANT
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
        </button>
      </div>
    );
  }

  return (
    <aside
      ref={containerRef}
      aria-label="3D Robot Assistant"
      className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 pointer-events-none select-none"
    >
      {/* Speech Bubble */}
      <div
        className={`absolute bottom-[105%] right-2 sm:right-4 max-w-[220px] sm:max-w-[260px] pointer-events-auto transition-all duration-300 origin-bottom-right ${
          isSpeechVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="relative p-3 rounded-xl bg-[#14120e]/95 border border-[#C9A227]/70 text-[#F5F1E8] text-xs font-sans leading-relaxed shadow-[0_8px_30px_rgba(0,0,0,0.7),0_0_15px_rgba(201,162,39,0.18)] backdrop-blur-md">
          {speechText}
          <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-[#14120e] border-r border-b border-[#C9A227]/70 transform rotate-45" />
        </div>
      </div>

      {/* Robot Canvas & Wrapper */}
      <div className="relative pointer-events-auto flex flex-col items-center group">
        {/* Top Control Bar (Minimize / Close) */}
        <div className="absolute -top-7 right-2 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={() => setIsMinimized(true)}
            className="w-5 h-5 rounded-full bg-[#161616]/90 border border-[#2A2418] hover:border-[#C9A227] text-[#A8A29E] hover:text-[#F5F1E8] flex items-center justify-center transition-colors shadow-md cursor-pointer"
            aria-label="Minimize Robot Assistant"
            title="Minimize"
          >
            <Minus className="w-2.5 h-2.5" />
          </button>
          <button
            onClick={() => setIsClosed(true)}
            className="w-5 h-5 rounded-full bg-[#161616]/90 border border-[#2A2418] hover:border-[#ef4444] text-[#A8A29E] hover:text-[#f87171] flex items-center justify-center transition-colors shadow-md cursor-pointer"
            aria-label="Close Robot Assistant"
            title="Close"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* 3D WebGL Canvas or Resilient Fallback Character */}
        <div
          onClick={handleRobotClick}
          onMouseEnter={() => robotRef.current?.setHover(true)}
          onMouseLeave={() => robotRef.current?.setHover(false)}
          className="w-[110px] h-[135px] sm:w-[145px] sm:h-[175px] cursor-pointer touch-manipulation relative transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
          title="Click to interact with Logith's AI Assistant"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleRobotClick();
            }
          }}
          aria-label="Interactive 3D Robot Assistant. Click to open Assistant menu."
        >
          {webGlAvailable ? (
            <canvas
              ref={canvasRef}
              aria-label="Interactive 3D Robot Assistant Canvas"
              className="w-full h-full block filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
            />
          ) : (
            /* Resilient Fallback Vector Character (for environments without GPU WebGL context) */
            <div className="w-full h-full flex flex-col items-center justify-center animate-bounce-subtle">
              <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
                {/* Antenna */}
                <line x1="50" y1="12" x2="50" y2="2" stroke="#C9A227" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="50" cy="2" r="3.5" fill="#E5C76B" className="animate-pulse" />
                {/* Ears */}
                <circle cx="15" cy="35" r="7" fill="#151B24" stroke="#C9A227" strokeWidth="1.5" />
                <circle cx="85" cy="35" r="7" fill="#151B24" stroke="#C9A227" strokeWidth="1.5" />
                {/* Head */}
                <rect x="20" y="12" width="60" height="46" rx="20" fill="#080B10" stroke="#2A2418" strokeWidth="2" />
                <rect x="25" y="16" width="50" height="38" rx="16" fill="#05070A" />
                {/* Eyes */}
                <circle cx="38" cy="32" r="6" fill="#E5C76B" />
                <circle cx="38" cy="32" r="2.5" fill="#1A1406" />
                <circle cx="62" cy="32" r="6" fill="#E5C76B" />
                <circle cx="62" cy="32" r="2.5" fill="#1A1406" />
                {/* Smile */}
                <path d="M 42 42 Q 50 48 58 42" fill="none" stroke="#E5C76B" strokeWidth="2" strokeLinecap="round" />
                {/* Neck */}
                <rect x="44" y="58" width="12" height="6" fill="#C9A227" rx="2" />
                {/* Body */}
                <rect x="28" y="64" width="44" height="32" rx="8" fill="#151B24" stroke="#2A2418" strokeWidth="1.5" />
                {/* Chest Core */}
                <circle cx="50" cy="78" r="6" fill="#E5C76B" stroke="#C9A227" strokeWidth="1.5" className="animate-pulse" />
                {/* Arms */}
                <rect x="18" y="67" width="8" height="22" rx="4" fill="#080B10" stroke="#C9A227" strokeWidth="1" />
                <rect x="74" y="67" width="8" height="22" rx="4" fill="#080B10" stroke="#C9A227" strokeWidth="1" />
                {/* Legs */}
                <rect x="36" y="96" width="9" height="18" rx="3" fill="#080B10" stroke="#C9A227" strokeWidth="1" />
                <rect x="55" y="96" width="9" height="18" rx="3" fill="#080B10" stroke="#C9A227" strokeWidth="1" />
              </svg>
            </div>
          )}

          {/* Golden Floor Glow Disc Under Robot */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-[#C9A227]/20 blur-[6px] pointer-events-none" />
        </div>
      </div>

      {/* Assistant Modal Panel */}
      {isPanelOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="assistant-dialog-title"
          className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-8 z-50 pointer-events-auto flex items-end sm:items-auto justify-center sm:justify-end p-4 sm:p-0"
        >
          {/* Mobile backdrop */}
          <div
            onClick={() => setIsPanelOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm sm:hidden z-0"
          />

          {/* Panel Card (Black & Gold Theme) */}
          <div className="relative z-10 w-full max-w-sm sm:w-[320px] rounded-2xl bg-[#14120e]/95 border border-[#2A2418] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_20px_rgba(201,162,39,0.15)] backdrop-blur-xl animate-scale-up">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#2A2418]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#1a160c] border border-[#C9A227] flex items-center justify-center text-[#C9A227] shadow-[0_0_8px_rgba(201,162,39,0.25)]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    id="assistant-dialog-title"
                    className="text-xs font-sans tracking-[0.16em] uppercase font-bold text-[#F5F1E8]"
                  >
                    Meet My AI Assistant
                  </h3>
                  <span className="text-[9px] font-mono text-[#E5C76B]">PORTFOLIO COMPANION</span>
                </div>
              </div>

              <button
                onClick={() => setIsPanelOpen(false)}
                className="w-7 h-7 rounded-full bg-[#161616] border border-[#2A2418] hover:border-[#C9A227] text-[#A8A29E] hover:text-[#F5F1E8] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Assistant Menu"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Greeting */}
            <p className="text-xs text-[#A8A29E] font-light leading-relaxed mb-4">
              Hi! I'm Logith's portfolio assistant. What would you like to explore?
            </p>

            {/* 7 Action Buttons */}
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => handleNavigate("about")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#161616] hover:bg-[#1f1a10] border border-[#2A2418] hover:border-[#C9A227] text-[#F5F1E8] text-xs font-sans transition-all duration-200 group cursor-pointer text-left"
              >
                <span className="flex items-center gap-2.5">
                  <User className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>About Me</span>
                </span>
                <span className="text-[9px] font-mono text-[#A8A29E] group-hover:text-[#E5C76B]">#about</span>
              </button>

              <button
                onClick={() => handleNavigate("projects")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#161616] hover:bg-[#1f1a10] border border-[#2A2418] hover:border-[#C9A227] text-[#F5F1E8] text-xs font-sans transition-all duration-200 group cursor-pointer text-left"
              >
                <span className="flex items-center gap-2.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>My Projects</span>
                </span>
                <span className="text-[9px] font-mono text-[#A8A29E] group-hover:text-[#E5C76B]">#projects</span>
              </button>

              <button
                onClick={() => handleNavigate("skills")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#161616] hover:bg-[#1f1a10] border border-[#2A2418] hover:border-[#C9A227] text-[#F5F1E8] text-xs font-sans transition-all duration-200 group cursor-pointer text-left"
              >
                <span className="flex items-center gap-2.5">
                  <Cpu className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Technical Skills</span>
                </span>
                <span className="text-[9px] font-mono text-[#A8A29E] group-hover:text-[#E5C76B]">#skills</span>
              </button>

              <button
                onClick={() => handleNavigate("credentials")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#161616] hover:bg-[#1f1a10] border border-[#2A2418] hover:border-[#C9A227] text-[#F5F1E8] text-xs font-sans transition-all duration-200 group cursor-pointer text-left"
              >
                <span className="flex items-center gap-2.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Education</span>
                </span>
                <span className="text-[9px] font-mono text-[#A8A29E] group-hover:text-[#E5C76B]">#credentials</span>
              </button>

              <button
                onClick={() => handleNavigate("credentials")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#161616] hover:bg-[#1f1a10] border border-[#2A2418] hover:border-[#C9A227] text-[#F5F1E8] text-xs font-sans transition-all duration-200 group cursor-pointer text-left"
              >
                <span className="flex items-center gap-2.5">
                  <Award className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Certifications</span>
                </span>
                <span className="text-[9px] font-mono text-[#A8A29E] group-hover:text-[#E5C76B]">#credentials</span>
              </button>

              <button
                onClick={() => handleNavigate("", true)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#161616] hover:bg-[#1f1a10] border border-[#2A2418] hover:border-[#C9A227] text-[#F5F1E8] text-xs font-sans transition-all duration-200 group cursor-pointer text-left"
              >
                <span className="flex items-center gap-2.5">
                  <FileText className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Resume</span>
                </span>
                <span className="flex items-center gap-1 text-[9px] font-mono text-[#E5C76B]">
                  PDF <ArrowUpRight className="w-2.5 h-2.5" />
                </span>
              </button>

              <button
                onClick={() => handleNavigate("contact")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#1a160c] hover:bg-[#C9A227] border border-[#C9A227] text-[#E5C76B] hover:text-[#0A0A0A] text-xs font-sans font-semibold transition-all duration-200 group cursor-pointer text-left mt-1"
              >
                <span className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Me</span>
                </span>
                <span className="text-[9px] font-mono opacity-80">#contact</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
