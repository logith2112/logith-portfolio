import { Award, ShieldCheck, Cpu } from "lucide-react";

export default function Credentials() {
  const credentials = [
    {
      id: 1,
      title: "IBM Professional Certificate",
      issuer: "IBM",
      subject: "Artificial Intelligence",
      icon: <Award className="w-6 h-6 text-cyber-lime" />,
      code: "IBM-AI-77894A",
      details: "Comprehensive training in neural networks, machine learning algorithms, deep learning models, and NLP architectures."
    },
    {
      id: 2,
      title: "Google Cloud Platform Training",
      issuer: "Coursera",
      subject: "Google Cloud Console & Infrastructure",
      icon: <ShieldCheck className="w-6 h-6 text-cyber-cyan" />,
      code: "GCP-GC-90124B",
      details: "Focused on deploying workloads, container management, storage options, and cloud administration workflows."
    }
  ];

  return (
    <section id="credentials" className="py-24 sm:py-32 border-t border-white/[0.03] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="text-[10px] tracking-[0.3em] font-display text-cyber-lime uppercase font-semibold">
              CREDENTIALS // ACHIEVEMENTS
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-display font-bold tracking-tighter text-white leading-none uppercase">
              LEARNING.<br />
              BUILDING.<br />
              EVOLVING.
            </h2>
            
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-2 font-light">
              Continuous learning is core to building intelligent systems. I actively pursue industry certifications and structured specializations to supplement my academic curriculum.
            </p>

            <div className="flex items-center gap-2 mt-4 text-[10px] text-slate-500 font-mono">
              <Cpu className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>TOTAL_INDEXED_CREDS: 02 // SECURE_SHA256</span>
            </div>
          </div>

          {/* Right Column: Achievements */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {credentials.map((cred) => (
              <div
                key={cred.id}
                className="noise-card p-6 sm:p-8 rounded-lg border border-white/[0.02] bg-white/[0.01] hover:border-cyber-lime/30 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Visual decorative line in background */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10 group-hover:bg-cyber-lime transition-colors duration-300" />
                
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#111215] border border-white/5 flex items-center justify-center shrink-0">
                      {cred.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-display font-bold text-white tracking-tight">
                        {cred.title}
                      </h3>
                      <div className="text-xs text-cyber-cyan font-medium mt-0.5">
                        {cred.issuer} — {cred.subject}
                      </div>
                      <p className="text-xs text-slate-500 mt-3 leading-relaxed font-light">
                        {cred.details}
                      </p>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 self-end sm:self-start bg-[#090a0c] border border-white/[0.03] px-2.5 py-1 rounded">
                    {cred.code}
                  </div>
                </div>

                {/* Aesthetic tech details in background */}
                <div className="absolute right-4 bottom-2 text-[8px] font-mono text-white/[0.01] select-none uppercase pointer-events-none tracking-widest">
                  SECURE_METRICS // DIGITAL_SIG_VERIFIED
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
