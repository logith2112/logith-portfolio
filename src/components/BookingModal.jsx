import { useState, useEffect, useRef, useCallback } from "react";
import { X, Calendar, Clock, Sparkles, Send, CheckCircle2, Copy, AlertCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";

/**
 * BookingModal
 * 
 * Luxury booking & enquiry modal for "Book a call".
 * Sends request directly to logiththiru@gmail.com via EmailJS using browser-safe public key.
 * Reads credentials from:
 * - VITE_EMAILJS_SERVICE_ID
 * - VITE_EMAILJS_TEMPLATE_ID
 * - VITE_EMAILJS_PUBLIC_KEY
 * 
 * Clarifies that this submits a meeting request and does not claim an automated booking or slot reservation.
 */
export default function BookingModal({ isOpen, onClose }) {
  const [topic, setTopic] = useState("AI / ML Project Discussion");
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });
  const [timeWindow, setTimeWindow] = useState("Morning (10:00 AM - 1:00 PM IST)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const dialogRef = useRef(null);

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setCopied(false);
    setSendError("");
    onClose();
  }, [onClose]);

  const topics = [
    "AI / ML Project Discussion",
    "Full-Stack Web Application",
    "Interactive UI/UX Experience",
    "Internship or Research Collaboration",
    "General Technical Consultation"
  ];

  const timeWindows = [
    "Morning (10:00 AM - 1:00 PM IST)",
    "Afternoon (2:00 PM - 5:00 PM IST)",
    "Evening (6:00 PM - 9:00 PM IST)",
    "Flexible / Open to suggestions"
  ];

  // Keyboard escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const emailBodyText = `Hi Logith,

I'd like to book a call with you to discuss ${topic}.

Preferred Date: ${preferredDate || "Flexible"}
Preferred Window: ${timeWindow}
From: ${name || "Prospective Client / Collaborator"} (${email || "Not specified"})

Project Details / Notes:
${notes || "Looking forward to speaking with you!"}

Best regards,
${name || "Visitor"}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || isSending) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if configuration is present
    if (!serviceId || !templateId || !publicKey) {
      const missing = [];
      if (!serviceId) missing.push("VITE_EMAILJS_SERVICE_ID");
      if (!templateId) missing.push("VITE_EMAILJS_TEMPLATE_ID");
      if (!publicKey) missing.push("VITE_EMAILJS_PUBLIC_KEY");

      setSendError(
        `EmailJS configuration missing in .env.local: [${missing.join(", ")}]. Please configure these variables to enable automatic email delivery, or email logiththiru@gmail.com directly.`
      );
      return;
    }

    setIsSending(true);
    setSendError("");

    try {
      const templateParams = {
        topic: topic,
        preferred_date: preferredDate || "Flexible",
        time_window: timeWindow,
        from_name: name.trim(),
        reply_to: email.trim(),
        notes: notes.trim() || "No additional notes provided",
        message: emailBodyText,
        to_email: "logiththiru@gmail.com",
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS dispatch failed:", err);
      const errDetail = err?.text || err?.message || "Unknown error";
      setSendError(
        `Email delivery failed (${errDetail}). Please check your EmailJS service/template configuration or reach out to logiththiru@gmail.com directly.`
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(emailBodyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0E0E0E] border border-[#2A2418] p-6 sm:p-8 text-[#F5F2EA] shadow-2xl transition-all duration-300"
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#E8C77A]/5 blur-3xl pointer-events-none rounded-full" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#A6A6A6] hover:text-[#F5F2EA] hover:bg-[#161616] border border-transparent hover:border-[#2A2418] transition-colors cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center text-center py-6 gap-5">
            <div className="w-14 h-14 rounded-full bg-[#E8C77A]/10 border border-[#E8C77A]/30 flex items-center justify-center text-[#E8C77A]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#F5F2EA]">
                Meeting Request Sent
              </h3>
              <p className="text-xs sm:text-sm text-[#A6A6A6] mt-2 max-w-md leading-relaxed">
                Your request has been delivered to <span className="text-[#E8C77A] font-mono">logiththiru@gmail.com</span> via EmailJS.
              </p>
            </div>

            {/* Notice clarifying that this is a request, not a confirmed slot */}
            <div className="w-full p-3.5 rounded-xl bg-[#141414] border border-[#2A2418] text-xs text-[#A6A6A6] text-left leading-relaxed">
              <span className="text-[#E8C77A] font-semibold block mb-1">What happens next:</span>
              This form sends a meeting request and does not automatically reserve calendar time. Logith will review your preferred date and time window, and reply to <strong className="text-[#F5F2EA]">{email}</strong> within 24 hours with a calendar invitation and meeting link.
            </div>

            <div className="w-full p-4 rounded-xl bg-[#111111] border border-[#2A2418] text-left text-xs font-mono text-[#A6A6A6] whitespace-pre-wrap leading-relaxed max-h-44 overflow-y-auto">
              {emailBodyText}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full mt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-5 py-2.5 rounded-full text-xs font-sans tracking-wider font-semibold text-[#F5F2EA] bg-[#161616] border border-[#2A2418] hover:border-[#E8C77A] transition-colors flex items-center gap-2 cursor-pointer"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-[#E8C77A]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied to Clipboard!" : "Copy Request Summary"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 rounded-full text-xs font-sans tracking-wider font-semibold text-[#080808] bg-[#E8C77A] hover:bg-[#FFD700] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#161616] border border-[#2A2418] text-[10px] font-mono tracking-widest text-[#E8C77A] uppercase mb-3">
                <Sparkles className="w-3 h-3 text-[#E8C77A]" />
                Direct Inquiry
              </div>
              <h2 id="booking-modal-title" className="text-2xl sm:text-3xl font-serif font-bold text-[#F5F2EA] tracking-tight">
                Book a Call with Logith
              </h2>
              <p className="text-xs sm:text-sm text-[#A6A6A6] mt-1 font-light leading-relaxed">
                Submit a meeting request. Logith will review your preferred time and reply directly to coordinate the call.
              </p>
            </div>

            {/* Error notice if credentials missing or dispatch failed */}
            {sendError && (
              <div role="alert" className="p-3.5 rounded-xl bg-[#2A1810] border border-[#E8C77A]/40 text-xs text-[#F5F2EA] flex items-start gap-2.5 leading-relaxed">
                <AlertCircle className="w-4 h-4 text-[#E8C77A] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#E8C77A] mb-0.5">Configuration or Delivery Notice</div>
                  <div>{sendError}</div>
                </div>
              </div>
            )}

            {/* Topic selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-sans font-semibold tracking-wider text-[#A6A6A6] uppercase">
                Meeting Topic
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    className={`text-left text-xs px-3.5 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                      topic === t
                        ? "border-[#E8C77A] bg-[#E8C77A]/10 text-[#F5F2EA] font-medium"
                        : "border-[#2A2418] bg-[#141414] text-[#A6A6A6] hover:border-[#2A2418] hover:text-[#F5F2EA]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time Window */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-sans font-semibold tracking-wider text-[#A6A6A6] uppercase flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#E8C77A]" /> Preferred Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#141414] border border-[#2A2418] focus:border-[#E8C77A] rounded-lg px-3.5 py-2.5 text-xs text-[#F5F2EA] outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-sans font-semibold tracking-wider text-[#A6A6A6] uppercase flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#E8C77A]" /> Time Window
                </label>
                <select
                  value={timeWindow}
                  onChange={(e) => setTimeWindow(e.target.value)}
                  className="w-full bg-[#141414] border border-[#2A2418] focus:border-[#E8C77A] rounded-lg px-3.5 py-2.5 text-xs text-[#F5F2EA] outline-none transition-colors"
                >
                  {timeWindows.map((tw) => (
                    <option key={tw} value={tw} className="bg-[#141414]">
                      {tw}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-sans font-semibold tracking-wider text-[#A6A6A6] uppercase">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-[#141414] border border-[#2A2418] focus:border-[#E8C77A] rounded-lg px-3.5 py-2.5 text-xs text-[#F5F2EA] outline-none placeholder-[#A6A6A6]/40 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-sans font-semibold tracking-wider text-[#A6A6A6] uppercase">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#141414] border border-[#2A2418] focus:border-[#E8C77A] rounded-lg px-3.5 py-2.5 text-xs text-[#F5F2EA] outline-none placeholder-[#A6A6A6]/40 transition-colors"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-semibold tracking-wider text-[#A6A6A6] uppercase">
                Project Notes / Agenda (Optional)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Briefly describe your objectives, ideas, or questions..."
                className="w-full bg-[#141414] border border-[#2A2418] focus:border-[#E8C77A] rounded-lg p-3 text-xs text-[#F5F2EA] outline-none placeholder-[#A6A6A6]/40 resize-none transition-colors"
              />
            </div>

            {/* Submit & Disclaimer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-[#A6A6A6]/60">
                Dispatches directly to <span className="text-[#E8C77A]">logiththiru@gmail.com</span>
              </span>
              <button
                type="submit"
                disabled={isSending}
                className="px-6 py-2.5 rounded-full text-xs font-sans tracking-wider font-semibold text-[#080808] bg-[#E8C77A] hover:bg-[#FFD700] disabled:opacity-60 shadow-[0_2px_14px_rgba(232,199,122,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending Request…</span>
                  </>
                ) : (
                  <>
                    <span>Send Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
