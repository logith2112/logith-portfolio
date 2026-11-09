import { useState } from "react";
import { Linkedin, Github, Mail, Phone, FileText, ArrowUpRight, Send, CheckCircle2, Copy, Calendar } from "lucide-react";
import SplitHeading from "../components/SplitHeading";

/**
 * Contact Section
 * 
 * Implements Phase 7 & Phase 8 requirements:
 * - Heading: "Have Something Great in Mind?"
 * - Supporting text: "Whether it's a website, an AI-powered application or a creative idea, let's explore how to bring it to life."
 * - Contact email: logiththiru@gmail.com
 * - GitHub: https://github.com/logith2112
 * - LinkedIn: https://www.linkedin.com/in/logith-t-635294378/
 * - Working contact form, validation, draft delivery feedback, social links, and "Book a call" trigger.
 */
export default function Contact({ onOpenBooking }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isDraftPrepared, setIsDraftPrepared] = useState(false);
  const [copied, setCopied] = useState(false);

  const contactLinks = [
    {
      name: "Email",
      value: "logiththiru@gmail.com",
      href: "mailto:logiththiru@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      action: "Send Email",
    },
    {
      name: "LinkedIn",
      value: "linkedin.com/in/logith-t-635294378",
      href: "https://www.linkedin.com/in/logith-t-635294378/",
      icon: <Linkedin className="w-5 h-5" />,
      action: "Connect",
    },
    {
      name: "GitHub",
      value: "github.com/logith2112",
      href: "https://github.com/logith2112",
      icon: <Github className="w-5 h-5" />,
      action: "Explore Repos",
    },
    {
      name: "Phone",
      value: "+91 9962295921",
      href: "tel:+919962295921",
      icon: <Phone className="w-5 h-5" />,
      action: "Call",
    },
    {
      name: "Resume PDF",
      value: "View PDF",
      href: `${import.meta.env.BASE_URL}Logith_T_Resume.pdf`,
      icon: <FileText className="w-5 h-5" />,
      action: "Download",
    },
  ];

  const emailDraftSubject = encodeURIComponent(
    formData.subject || `Inquiry from ${formData.name || "Portfolio Visitor"}`
  );
  const emailDraftBody = `Hi Logith,

${formData.message}

--
From: ${formData.name} (${formData.email})`;

  const mailtoUrl = `mailto:logiththiru@gmail.com?subject=${emailDraftSubject}&body=${encodeURIComponent(
    emailDraftBody
  )}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    // Launch email client
    window.location.href = mailtoUrl;
    setIsDraftPrepared(true);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(emailDraftBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 border-t border-[#2A2418] relative bg-[#080808] overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute bottom-0 inset-x-0 h-96 bg-[#E8C77A]/[0.025] filter blur-[150px] pointer-events-none rounded-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Heading & Subtitle */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4 mb-16 sm:mb-20">
          <div className="reveal-up flex items-center justify-center">
            <span className="text-[10px] tracking-[0.25em] font-mono text-[#E8C77A] uppercase font-bold px-3 py-1 rounded-full bg-[#141414] border border-[#2A2418]">
              GET IN TOUCH // INITIATE DIALOGUE
            </span>
          </div>

          <div className="reveal-up" style={{ transitionDelay: "100ms" }}>
            <SplitHeading
              as="h2"
              text="Have Something Great in Mind?"
              className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-[#F5F1E8] leading-tight"
            />
          </div>

          <p
            className="reveal-up text-[#A6A6A6] text-sm sm:text-base leading-relaxed max-w-xl font-light mt-1"
            style={{ transitionDelay: "200ms" }}
          >
            Whether it's a website, an AI-powered application or a creative idea, let's explore how to bring it to life.
          </p>
        </div>

        {/* Contact Form & Call Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#2A2418] text-left shadow-2xl">
            {isDraftPrepared ? (
              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center gap-3 text-[#E8C77A]">
                  <CheckCircle2 className="w-6 h-6" />
                  <h3 className="text-xl font-serif font-bold text-[#F5F2EA]">
                    Email Draft Initialized
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#A6A6A6] leading-relaxed">
                  Your mail app opened with your message pre-addressed to{" "}
                  <span className="text-[#E8C77A] font-mono">logiththiru@gmail.com</span>. Click below if you need to copy the content or re-open the composer:
                </p>

                <div className="p-4 rounded-xl bg-[#141414] border border-[#2A2418] text-xs font-mono text-[#A6A6A6] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                  {emailDraftBody}
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <a
                    href={mailtoUrl}
                    className="px-5 py-2.5 rounded-full text-xs font-sans tracking-wider font-semibold text-[#080808] bg-[#E8C77A] hover:bg-[#FFD700] transition-colors flex items-center gap-2"
                  >
                    Open Mail App <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="px-5 py-2.5 rounded-full text-xs font-sans tracking-wider font-semibold text-[#F5F2EA] bg-[#161616] border border-[#2A2418] hover:border-[#E8C77A] transition-colors flex items-center gap-2"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-[#E8C77A]" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy Text"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDraftPrepared(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="text-xs text-[#A6A6A6] hover:text-[#F5F2EA] underline ml-auto"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-serif font-bold text-[#F5F2EA]">
                    Send a Message
                  </h3>
                  <span className="text-[10px] font-mono text-[#A6A6A6]/60">
                    DIRECT DISPATCH
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-sans font-semibold tracking-wider text-[#A6A6A6] uppercase">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-[#161616] border border-[#2A2418] focus:border-[#E8C77A] rounded-lg px-3.5 py-2.5 text-xs text-[#F5F2EA] outline-none placeholder-[#A6A6A6]/40 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-sans font-semibold tracking-wider text-[#A6A6A6] uppercase">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-[#161616] border border-[#2A2418] focus:border-[#E8C77A] rounded-lg px-3.5 py-2.5 text-xs text-[#F5F2EA] outline-none placeholder-[#A6A6A6]/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-sans font-semibold tracking-wider text-[#A6A6A6] uppercase">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. AI Buoy Collaboration / Project Inquiry"
                    className="w-full bg-[#161616] border border-[#2A2418] focus:border-[#E8C77A] rounded-lg px-3.5 py-2.5 text-xs text-[#F5F2EA] outline-none placeholder-[#A6A6A6]/40 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-sans font-semibold tracking-wider text-[#A6A6A6] uppercase">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your goals, timeline, or requirements..."
                    className="w-full bg-[#161616] border border-[#2A2418] focus:border-[#E8C77A] rounded-lg p-3 text-xs text-[#F5F2EA] outline-none placeholder-[#A6A6A6]/40 resize-none transition-colors"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-[#A6A6A6]/70">
                    Recipient: <strong className="text-[#E8C77A]">logiththiru@gmail.com</strong>
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full text-xs font-sans tracking-wider font-semibold text-[#080808] bg-[#E8C77A] hover:bg-[#FFD700] shadow-[0_2px_14px_rgba(232,199,122,0.3)] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    Dispatch Message <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: "Book a call" Card + Direct Channels */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            
            {/* Book a Call Feature Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#141414] to-[#111111] border border-[#2A2418] shadow-xl relative overflow-hidden group">
              <div className="w-10 h-10 rounded-full bg-[#E8C77A]/10 border border-[#E8C77A]/30 flex items-center justify-center text-[#E8C77A] mb-4">
                <Calendar className="w-5 h-5" />
              </div>

              <div className="text-[10px] font-mono tracking-widest text-[#E8C77A] uppercase">
                FAST-TRACK CONSULTATION
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#F5F2EA] mt-1">
                Book a Direct Call
              </h3>
              <p className="text-xs text-[#A6A6A6] mt-2 font-light leading-relaxed">
                Prefer an interactive discussion? Select your preferred date and topic to schedule a conversation directly.
              </p>

              <button
                type="button"
                onClick={onOpenBooking}
                className="mt-6 w-full py-3 px-6 rounded-full font-sans text-xs tracking-widest font-semibold uppercase text-[#080808] bg-[#E8C77A] hover:bg-[#FFD700] shadow-[0_2px_14px_rgba(232,199,122,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" /> Book a call
              </button>
            </div>

            {/* Direct Connect Pills */}
            <div className="p-5 rounded-2xl bg-[#111111] border border-[#2A2418] flex flex-col gap-3">
              <div className="text-[10px] font-mono tracking-widest text-[#A6A6A6]/70 uppercase">
                Direct Channels
              </div>

              {contactLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.href.startsWith("http") || item.href.endsWith(".pdf") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#141414] border border-[#2A2418] hover:border-[#E8C77A] transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-[#E8C77A] group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#F5F2EA] group-hover:text-[#E8C77A] transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-[#A6A6A6] font-mono truncate max-w-[180px]">
                        {item.value}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#A6A6A6] group-hover:text-[#E8C77A] flex items-center gap-1 transition-colors">
                    {item.action} <ArrowUpRight className="w-3 h-3" />
                  </span>
                </a>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
