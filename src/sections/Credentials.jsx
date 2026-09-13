import { Award, ShieldCheck, Cpu } from "lucide-react";
import SplitHeading from "../components/SplitHeading";

export default function Credentials() {
  const credentials = [
    {
      id: 1,
      title: "IBM Professional Certificate",
      issuer: "IBM",
      subject: "Artificial Intelligence",
      icon: <Award className="w-6 h-6 text-[#C9A227]" />,
      code: "IBM-AI-77894A",
      details:
        "Comprehensive training in neural networks, machine learning algorithms, deep learning models, and NLP architectures.",
    },
    {
      id: 2,
      title: "Google Cloud Platform Training",
      issuer: "Coursera",
      subject: "Google Cloud Console & Infrastructure",
      icon: <ShieldCheck className="w-6 h-6 text-[#E5C76B]" />,
      code: "GCP-GC-90124B",
      details:
        "Focused on deploying workloads, container management, storage options, and cloud administration workflows.",
    },
  ];

  return (
    <section id="credentials" className="py-24 sm:py-32 border-t border-[#2A2418] bg-[#111111] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left: Heading (slides in from left) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="reveal-left text-[10px] tracking-[0.3em] font-sans text-[#C9A227] uppercase font-semibold">
              Credentials // Achievements
            </div>

            <div className="reveal-left" style={{ transitionDelay: "100ms" }}>
              <SplitHeading
                as="h2"
                text="LEARNING. BUILDING. EVOLVING."
                className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-[#F5F1E8] leading-none uppercase"
              />
            </div>

            <p className="reveal-left text-[#A8A29E] text-sm sm:text-base leading-relaxed mt-1 font-light" style={{ transitionDelay: "200ms" }}>
              Continuous learning is core to building intelligent systems. I actively pursue industry certifications and structured specializations to supplement my academic curriculum.
            </p>

            <div className="reveal-left flex items-center gap-2 mt-2 text-[10px] text-[#A8A29E]/60 font-mono" style={{ transitionDelay: "300ms" }}>
              <Cpu className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>TOTAL_INDEXED_CREDS: 02 // SECURE_SHA256</span>
            </div>
          </div>

          {/* Right: Cards (progressive stagger from right) */}
          <div className="stagger-container lg:col-span-7 flex flex-col gap-5 text-left">
            {credentials.map((cred) => (
              <div
                key={cred.id}
                className="stagger-item reveal-right noise-card p-6 sm:p-8 rounded-lg border border-[#2A2418] hover:border-[#C9A227]/40 relative group overflow-hidden bg-[#161616]"
              >
                {/* Left accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#2A2418] group-hover:bg-[#C9A227] transition-colors duration-[450ms]" />

                <div className="flex flex-col sm:flex-row justify-between items-start gap-5">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#111111] border border-[#2A2418] flex items-center justify-center shrink-0">
                      {cred.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-sans font-bold text-[#F5F1E8] tracking-tight">
                        {cred.title}
                      </h3>
                      <div className="text-xs text-[#E5C76B] font-medium mt-1">
                        {cred.issuer} — {cred.subject}
                      </div>
                      <p className="text-xs text-[#A8A29E] mt-3 leading-relaxed font-light max-w-md">
                        {cred.details}
                      </p>
                    </div>
                  </div>
                  <div className="text-[9px] font-mono text-[#A8A29E]/60 self-end sm:self-start bg-[#0E0E0E] border border-[#2A2418] px-2.5 py-1 rounded shrink-0">
                    {cred.code}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
