import { useState } from "react";
import SplitHeading from "../components/SplitHeading";
import { Search, PenTool, Code2, CheckSquare, Rocket, Sparkles, ArrowRight } from "lucide-react";

/**
 * Process Section
 * 
 * Implements Phase 5 requirements:
 * - Heading: "Great Ideas Deserve a Great Process."
 * - Description: "From understanding the problem to building the final experience, I follow a clear and thoughtful development approach."
 * - 5 Steps:
 *   01 — Discover (Understand the problem, goals and user needs)
 *   02 — Design (Plan the user experience, interface and technical approach)
 *   03 — Develop (Build responsive, functional and scalable applications)
 *   04 — Test (Check functionality, usability, performance and reliability)
 *   05 — Deliver (Prepare a polished, maintainable solution for release)
 */
export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      name: "Discover",
      summary: "Understand the problem, goals and user needs.",
      details:
        "Deep-dive analysis of core user requirements, system constraints, dataset availability, and architectural objectives before writing a line of code.",
      icon: <Search className="w-5 h-5 text-[#E8C77A]" />,
      deliverables: ["Requirement Specification", "Data Pipeline Feasibility", "User Flow Mapping"],
    },
    {
      num: "02",
      name: "Design",
      summary: "Plan the user experience, interface and technical approach.",
      details:
        "Architecting clean, modular component structures, database schemas, neural model designs, and fluid editorial UI interactions tailored to the user journey.",
      icon: <PenTool className="w-5 h-5 text-[#E8C77A]" />,
      deliverables: ["System Architecture", "Wireframing & Prototypes", "API Contract Definition"],
    },
    {
      num: "03",
      name: "Develop",
      summary: "Build responsive, functional and scalable applications.",
      details:
        "Writing robust, well-documented code using modern React, Three.js, Python, or machine learning libraries with focus on reusability, performance, and clean paradigms.",
      icon: <Code2 className="w-5 h-5 text-[#E8C77A]" />,
      deliverables: ["Full-Stack Implementation", "ML Training Loops", "Accessible Components"],
    },
    {
      num: "04",
      name: "Test",
      summary: "Check functionality, usability, performance and reliability.",
      details:
        "Rigorous verification across desktop, tablet, and mobile viewports, sensor stress-testing, validation of ML inference precision, and responsive performance profiling.",
      icon: <CheckSquare className="w-5 h-5 text-[#E8C77A]" />,
      deliverables: ["Cross-Device Auditing", "Model Evaluation Metrics", "Zero Console Errors"],
    },
    {
      num: "05",
      name: "Deliver",
      summary: "Prepare a polished, maintainable solution for release.",
      details:
        "Optimizing bundle sizes, configuring automated build pipelines, production deployments, and ensuring documentation for seamless ongoing maintenance.",
      icon: <Rocket className="w-5 h-5 text-[#E8C77A]" />,
      deliverables: ["Production Deployment", "Source Documentation", "Post-Launch Monitoring"],
    },
  ];

  return (
    <section
      id="process"
      className="py-24 sm:py-32 border-t border-[#2A2418] bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Background subtle radial glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#E8C77A]/[0.025] filter blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col gap-4 text-left max-w-3xl mb-16 sm:mb-24">
          <div className="reveal-up flex items-center gap-3">
            <span className="text-[10px] tracking-[0.25em] font-mono text-[#E8C77A] uppercase font-bold px-3 py-1 rounded-full bg-[#141414] border border-[#2A2418]">
              METHODOLOGY // ENGINEERING PHILOSOPHY
            </span>
          </div>

          <div className="reveal-up" style={{ transitionDelay: "100ms" }}>
            <SplitHeading
              as="h2"
              text="Great Ideas Deserve a Great Process."
              className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-[#F5F1E8] leading-tight"
            />
          </div>

          <p
            className="reveal-up text-[#A6A6A6] text-sm sm:text-base font-light leading-relaxed mt-1"
            style={{ transitionDelay: "200ms" }}
          >
            From understanding the problem to building the final experience, I follow a clear and thoughtful development approach.
          </p>
        </div>

        {/* 5-Step Process Timeline / Interactive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Step Selector & Preview */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`reveal-left p-5 sm:p-6 rounded-xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? "bg-[#141414] border-[#E8C77A] shadow-[0_4px_24px_rgba(232,199,122,0.12)]"
                      : "bg-[#111111]/70 border-[#2A2418] hover:border-[#E8C77A]/40"
                  }`}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  {/* Left accent bar on active */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E8C77A]" />
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl sm:text-2xl font-serif font-bold text-[#E8C77A]">
                        {step.num}
                      </span>
                      <span className="text-base sm:text-lg font-serif font-semibold text-[#F5F2EA]">
                        {step.name}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#0E0E0E] border border-[#2A2418] flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A6A6A6] mt-2 font-light leading-relaxed">
                    {step.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Card for Active Step */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="p-8 sm:p-12 rounded-2xl bg-[#111111] border border-[#2A2418] text-left relative overflow-hidden shadow-2xl">
              {/* Subtle gold badge in corner */}
              <div className="absolute top-6 right-6 font-mono text-5xl sm:text-7xl font-bold text-stroke-gold opacity-30 select-none pointer-events-none">
                {steps[activeStep].num}
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#E8C77A] uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Step {steps[activeStep].num} of 05
              </div>

              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#F5F2EA] tracking-tight">
                {steps[activeStep].name}
              </h3>

              <div className="text-base sm:text-lg text-[#E8C77A] font-medium mt-2">
                {steps[activeStep].summary}
              </div>

              <p className="text-sm sm:text-base text-[#A6A6A6] mt-4 font-light leading-relaxed">
                {steps[activeStep].details}
              </p>

              <div className="mt-8 pt-6 border-t border-[#2A2418]">
                <div className="text-[10px] font-mono tracking-widest text-[#A6A6A6]/70 uppercase mb-3">
                  Key Deliverables & Outcomes
                </div>
                <div className="flex flex-wrap gap-2">
                  {steps[activeStep].deliverables.map((item) => (
                    <span
                      key={item}
                      className="px-3.5 py-1.5 rounded-full text-xs font-sans text-[#F5F2EA] bg-[#161616] border border-[#2A2418] flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8C77A]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#2A2418]">
                <button
                  type="button"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="text-xs font-sans tracking-wider text-[#A6A6A6] hover:text-[#F5F2EA] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  ← Previous Step
                </button>

                <div className="flex items-center gap-1.5">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveStep(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        activeStep === i ? "w-6 bg-[#E8C77A]" : "w-1.5 bg-[#2A2418] hover:bg-[#A6A6A6]"
                      }`}
                      aria-label={`Jump to step ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  disabled={activeStep === steps.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  className="text-xs font-sans tracking-wider text-[#E8C77A] hover:text-[#FFD700] disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 cursor-pointer font-medium"
                >
                  Next Step <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

