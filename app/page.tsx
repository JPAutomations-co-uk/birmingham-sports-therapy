"use client";

import Image from "next/image";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight, CheckCircle2, Hand, Circle, Droplets,
  Flame, ArrowDownUp, Sun, Star, TrendingUp, Clock,
  ShieldCheck, MapPin, Phone, Send, X, ZoomIn, Bone,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── SAMPLE DATA ─── */
const SERVICES = [
  { icon: Hand, title: "Sports Massage", subtitle: "Deep Tissue Recovery", desc: "Targeted deep tissue manipulation to break down scar tissue, release chronic tension, and restore full range of motion. The foundation of everything we do.", ideal: "Athletes, gym-goers, chronic muscle pain" },
  { icon: Circle, title: "Dry Cupping", subtitle: "Fascial Release", desc: "Suction therapy that lifts and separates fascial layers, flooding the area with fresh blood and oxygen. Rapidly reduces inflammation and speeds repair.", ideal: "Stiff joints, restricted movement, inflammation" },
  { icon: Droplets, title: "Wet Cupping (Hijama)", subtitle: "Traditional Detox", desc: "Combines suction with controlled micro-incisions to draw out stagnant blood and toxins. One of the oldest and most effective healing practices in the world.", ideal: "Chronic pain, detoxification, holistic healing" },
  { icon: Flame, title: "Fire Cupping", subtitle: "Heat-Activated Healing", desc: "Ancient glass cupping technique using flame to create deep suction. Heat penetrates tissue layers for powerful relief from stubborn knots and stiffness.", ideal: "Deep tension, chronic back pain, stress" },
  { icon: ArrowDownUp, title: "Compression Therapy", subtitle: "Active Recovery", desc: "Sequential pneumatic compression boots that systematically flush lactic acid and metabolic waste. The recovery tool used by elite athletes worldwide.", ideal: "Post-training recovery, leg fatigue, swelling" },
  { icon: Sun, title: "Infrared Therapy", subtitle: "Cellular Repair", desc: "Penetrating infrared light waves heat tissue from the inside out, boosting circulation by up to 400%. Accelerates cellular repair and reduces deep joint pain.", ideal: "Joint pain, circulation, injury rehab" },
  { icon: Bone, title: "Spinal Manipulation", subtitle: "Structural Realignment", desc: "Precise, controlled adjustments to restore proper spinal alignment and joint mobility. Relieves nerve compression, corrects posture imbalances, and unlocks movement patterns your body has been compensating around for years.", ideal: "Back pain, posture issues, nerve compression, restricted mobility" },
];

const CERTS = [
  { image: "/images/cert-ept.png", title: "Sports Therapy — EPT", issuer: "The Limetree Clinic Institute", desc: "Elite Performance Training — tissue manipulation, assessment, and advanced manual therapy." },
  { image: "/images/cert-cupping.png", title: "Hijama Cupping — EPT", issuer: "The Limetree Clinic Institute", desc: "Specialist certification in dry, wet, and fire cupping techniques." },
  { image: "/images/cert-ota.png", title: "MSK Conditions Masterclass", issuer: "OTA — CPD Approved", desc: "Manual therapy and musculoskeletal conditions. CPD accredited." },
  { image: "/images/cert-vitamins.png", title: "Vitamin & IM Injection", issuer: "High Level Wellness / CPDMA", desc: "B vitamins, C, D, and glutathione IM injection training." },
];

const STORY = [
  { n: "01", tag: "The Athlete", title: "Pushed Beyond the Limit", text: "As a former semi-professional footballer and competitive Muay Thai fighter, I pushed my body to its absolute limits. After a gruelling training camp and fighting in Thailand, I came home with an injury that threatened to end everything." },
  { n: "02", tag: "The System Failed", title: "Months of Waiting, Zero Results", text: "I sought professional help. Months navigating the NHS. Passed from department to department. Rehab that didn't work. Treatment that didn't stick. I felt completely failed by the system meant to help me." },
  { n: "03", tag: "The Decision", title: "If Nobody Will Fix It, I Will", text: "I realised if I wanted to get back to peak performance — and help others do the same — I had to take matters into my own hands. I trained. I qualified. I built the clinic I wish I'd had access to." },
];

const IMPACTS = ["Sleep quality", "Work performance", "Family & social life", "Daily mobility", "Athletic performance"];

/* ─── ANIMATED COUNTER ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const c = animate(count, target, { duration: 2, ease: [0.16, 1, 0.3, 1] });
      return c.stop;
    }
  }, [inView, count, target]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplay(v));
  }, [rounded]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ─── TREATMENT CAROUSEL BADGE ─── */
function TreatmentBadge() {
  const treatments = ["Sports Massage", "Dry Cupping", "Hijama", "Fire Cupping", "Compression", "Infrared"];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIdx((p) => (p + 1) % treatments.length), 2000);
    return () => clearInterval(interval);
  }, [treatments.length]);

  return (
    <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mb-6">
      <div className="relative">
        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
        <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
      </div>
      <span className="text-[11px] font-medium text-accent tracking-wide font-mono">
        Now offering: {treatments[idx]}
      </span>
    </div>
  );
}

/* ─── RESULTS TICKER (replaces HeadlineTicker) ─── */
function ResultsTicker() {
  const results = [
    { name: "Client — Chronic Neck Pain", outcome: "Pain-free after 2 sessions", weeks: "2 weeks", rating: 5 },
    { name: "Client — Lower Back (6 months)", outcome: "Full mobility restored", weeks: "1 week", rating: 5 },
    { name: "Client — Shoulder Injury", outcome: "Back to training in 10 days", weeks: "10 days", rating: 5 },
    { name: "Client — Sciatica", outcome: "Sleeping through the night again", weeks: "2 sessions", rating: 5 },
    { name: "Client — Post-Surgery Rehab", outcome: "Ahead of recovery timeline", weeks: "3 weeks", rating: 5 },
    { name: "Client — IT Band / Runner's Knee", outcome: "Completed first marathon", weeks: "2 weeks", rating: 5 },
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveIdx((p) => (p + 1) % results.length), 3000);
    return () => clearInterval(interval);
  }, [results.length]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-bg-card/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-white/[0.02]">
        <div className="relative">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
        </div>
        <span className="text-[10px] font-mono text-txt-tertiary tracking-wider uppercase">Client Results</span>
        <span className="text-[10px] font-mono text-txt-tertiary ml-auto">100+ treated</span>
      </div>

      <div className="p-1.5 space-y-0.5">
        {results.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.12, duration: 0.4, ease }}
            className={`flex items-start gap-2.5 p-2.5 rounded-lg transition-all duration-300 ${
              activeIdx === i ? "bg-accent/[0.07] border-l-2 border-l-accent" : "border-l-2 border-l-transparent"
            }`}
          >
            <div className="flex-1 min-w-0">
              <p className={`text-[12px] font-medium leading-snug line-clamp-1 transition-colors duration-300 ${
                activeIdx === i ? "text-accent" : "text-txt-primary"
              }`}>{r.outcome}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[8px] px-1.5 py-0.5 rounded border bg-accent/15 text-accent border-accent/25">{r.name}</span>
                <span className="text-[8px] text-txt-tertiary">{r.weeks}</span>
              </div>
            </div>
            {activeIdx === i && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="shrink-0 flex items-center gap-1 text-[8px] text-accent bg-accent/10 px-1.5 py-0.5 rounded"
              >
                <Star className="w-2.5 h-2.5 fill-current" />
                <span>5.0</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── NAV (jpautomations style) ─── */
function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[1000] h-[90px] md:h-[130px] transition-all duration-300 ${scrolled ? "bg-black/70 backdrop-blur-[20px] border-b border-[var(--border)]" : ""}`}>
        <div className="max-w-6xl mx-auto px-5 md:px-6 h-full flex items-center justify-between">
          <a href="#" className="z-[1001]">
            <Image src="/images/logo.png" alt="Birmingham Sports Therapy" width={600} height={150} className="h-[75px] md:h-[110px] w-auto" priority />
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-[50px]">
            <a href="#services" className="text-[15px] text-txt-tertiary hover:text-txt-primary transition-colors tracking-[.08em]">Services</a>
            <a href="#reviews" className="text-[15px] text-txt-tertiary hover:text-txt-primary transition-colors tracking-[.08em]">Reviews</a>
            <a href="#certifications" className="text-[15px] text-txt-tertiary hover:text-txt-primary transition-colors tracking-[.08em]">Credentials</a>
            <a href="https://wa.me/447955586565" target="_blank" rel="noopener noreferrer" className="text-[15px] font-semibold bg-accent text-white px-[30px] py-[13px] rounded-lg hover:bg-accent-hover transition-colors tracking-[.08em]">
              BOOK NOW
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden flex-col gap-[7px] p-2 z-[1001]"
            aria-label="Toggle menu"
          >
            <span className={`block w-7 h-[2px] bg-white transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[9px]" : ""}`} />
            <span className={`block w-7 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-7 h-[2px] bg-white transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[9px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/[.98] z-[999] overflow-y-auto"
        >
          <div className="flex flex-col min-h-full pt-[90px] pb-10 px-8">
            <div className="flex flex-col gap-1 mb-8">
              {[
                { label: "Services", href: "#services" },
                { label: "Reviews", href: "#reviews" },
                { label: "Credentials", href: "#certifications" },
                { label: "Our Story", href: "#story" },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.35 }}
                  className="block text-[clamp(28px,8vw,44px)] font-extrabold uppercase text-white py-1 font-display"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto">
              <motion.a
                href="https://wa.me/447955586565"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="flex items-center justify-center gap-2 w-full bg-accent text-white py-4 rounded-lg text-[13px] font-semibold hover:bg-accent-hover transition-colors tracking-[.1em] uppercase"
              >
                BOOK NOW
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

/* ─── GOOGLE REVIEWS ─── */
const REVIEWS = [
  { name: "James T.", date: "2 weeks ago", text: "Had chronic shoulder pain for over a year — tried physio, painkillers, the lot. Saifulhaq found the root cause in the first session and I was genuinely pain-free after the second. Wish I'd come here sooner.", rating: 5 },
  { name: "Ahmed R.", date: "1 month ago", text: "I was sceptical about cupping but desperate enough to try anything for my back. Best decision I've made. The Hijama session was professional, clean, and I felt immediate relief. Highly recommend.", rating: 5 },
  { name: "Marcus D.", date: "3 weeks ago", text: "Train MMA 5 days a week and my body was falling apart. The compression therapy and sports massage combo has been a game changer for my recovery. I'm performing better than I have in years.", rating: 5 },
  { name: "Daniel W.", date: "1 week ago", text: "Couldn't sleep properly for months because of neck pain. After one session the difference was night and day — literally. Slept through the whole night for the first time in ages. Genuinely grateful.", rating: 5 },
  { name: "Raj P.", date: "2 months ago", text: "Really impressed by how thorough the assessment was. He didn't just treat the symptoms, he explained exactly what was going on and gave me a rehab plan to follow. Felt like he genuinely cared.", rating: 5 },
  { name: "Tom H.", date: "3 weeks ago", text: "Booked in for infrared therapy after a knee injury. The whole experience was brilliant — flexible with times, explained everything clearly, and I'm already seeing progress after two visits.", rating: 5 },
];

function ReviewsSection() {
  return (
    <section id="reviews" className="max-w-6xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-1.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
          ))}
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-txt-primary">
          5.0 on{" "}
          <span className="text-accent">Google Reviews</span>
        </h2>
        <p className="text-txt-secondary mt-3 max-w-md mx-auto">Don&apos;t take our word for it — here&apos;s what our clients say.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REVIEWS.map((review, i) => (
          <motion.div
            key={review.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease }}
            viewport={{ once: true }}
            className="bg-bg-card rounded-xl border border-[var(--border)] p-5 group hover:border-accent/20 transition-all"
          >
            <div className="flex items-center gap-1 mb-3">
              {[...Array(review.rating)].map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-txt-secondary leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center text-[11px] font-semibold text-accent">
                  {review.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-txt-primary">{review.name}</span>
              </div>
              <span className="text-[10px] text-txt-tertiary">{review.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <a
          href="https://www.google.com/maps"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-txt-tertiary hover:text-accent transition-colors"
        >
          See all reviews on Google
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </section>
  );
}

/* ─── LIGHTBOX ─── */
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 cursor-pointer"
      onClick={onClose}
    >
      <button className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors" onClick={onClose}>
        <X size={28} />
      </button>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-full max-w-3xl aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt="Certificate" fill className="object-contain p-8" sizes="90vw" />
      </motion.div>
    </motion.div>
  );
}

/* ─── MAIN LANDING PAGE ─── */
export default function LandingPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-bg-primary overflow-hidden">
      {/* Scan line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent z-50 pointer-events-none"
        animate={{ y: ["-1px", "100vh"] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 8, ease: "linear" }}
      />

      {/* ─── NAV ─── */}
      <StickyNav />

      {/* ─── HERO ─── */}
      <section className="max-w-6xl mx-auto px-6 pt-[100px] sm:pt-[120px] pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <TreatmentBadge />

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-txt-primary leading-[1.1] tracking-tight">
              Sports recovery that{" "}
              <span className="text-accent">actually works.</span>
            </h1>

            <p className="mt-5 text-lg text-txt-secondary max-w-md leading-relaxed">
              Deep tissue massage, cupping therapy, compression &amp; infrared — for athletes and active people in Birmingham who need results, not waiting lists.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://wa.me/447955586565"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors"
              >
                Book Free Consultation
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-txt-tertiary">Same-week appointments</span>
            </div>

            {/* Proof pills */}
            <div className="mt-8 flex items-center gap-2 flex-wrap">
              {["100+ clients", "2-session avg", "5★ Google", "Fully certified"].map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                  className="flex items-center gap-1.5 bg-white/5 border border-[var(--border)] rounded-md px-2.5 py-1.5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-[11px] text-txt-secondary font-mono">{src}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease }}
          >
            <ResultsTicker />
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES (replaces Sources) ─── */}
      <section id="services" className="border-y border-[var(--border)] bg-white/[0.01] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease }}
                  viewport={{ once: true }}
                  className="bg-bg-card rounded-xl border border-[var(--border)] p-5 group hover:border-accent/20 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/15 transition-colors">
                      <Icon className="w-[18px] h-[18px]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-txt-primary">{svc.title}</p>
                      <span className="text-[10px] text-accent font-mono">{svc.subtitle}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-txt-tertiary leading-relaxed mb-3">{svc.desc}</p>
                  <div className="pt-3 border-t border-[var(--border)]">
                    <p className="text-[10px] text-txt-tertiary"><span className="text-txt-secondary font-medium">Best for:</span> {svc.ideal}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {/* Coming soon */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 text-center"
          >
            <span className="inline-flex items-center gap-2 bg-bg-card border border-[var(--border)] rounded-full px-3 py-1.5 text-[11px] text-txt-tertiary">
              <span className="relative"><span className="w-1.5 h-1.5 rounded-full bg-accent block" /><span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-accent animate-ping" /></span>
              IV Drips &amp; Vitamin Therapy — coming soon
            </span>
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS (replaces Steps) ─── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-3 gap-6 relative">
          <div className="hidden sm:block absolute top-5 left-[16.66%] right-[16.66%] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              viewport={{ once: true }}
              className="h-full bg-gradient-to-r from-accent/30 via-accent/15 to-accent/30 origin-left"
            />
          </div>

          {[
            { n: "01", title: "Book", desc: "Fill in the form or call us directly. No referral needed — we'll get you booked in this week, not in 3 months." },
            { n: "02", title: "Assess", desc: "We find the root cause — not just where it hurts, but why. A full assessment before any treatment begins." },
            { n: "03", title: "Recover", desc: "Targeted treatment plus a structured rehab plan. Most clients are pain-free within 2 sessions, not 2 months." },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.5, ease }}
              viewport={{ once: true }}
              className="relative"
            >
              <span className="inline-block font-mono text-[11px] text-accent/60 tracking-wider bg-accent/[0.07] px-2 py-0.5 rounded">{step.n}</span>
              <h3 className="font-display text-xl font-bold text-txt-primary mt-3">{step.title}</h3>
              <p className="text-sm text-txt-secondary mt-2 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── RESULTS (replaces Dashboard Preview) ─── */}
      <section id="results" className="max-w-5xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="bg-bg-card rounded-2xl border border-[var(--border)] shadow-[0_8px_60px_rgba(107,163,214,0.04)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent/50" />
            <span className="ml-3 text-[10px] text-txt-tertiary font-mono">proven-results</span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[var(--border)] border-b border-[var(--border)]">
            {[
              { icon: TrendingUp, value: 100, suffix: "+", label: "Clients Helped" },
              { icon: Clock, value: 2, suffix: "", label: "Sessions Avg" },
              { icon: Star, value: 5, suffix: ".0", label: "Google Rating" },
              { icon: ShieldCheck, value: 4, suffix: "", label: "Certifications" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease }}
                viewport={{ once: true }}
                className="p-6 text-center"
              >
                <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                <p className="font-display text-3xl font-bold text-txt-primary"><Counter target={stat.value} suffix={stat.suffix} /></p>
                <p className="text-[11px] text-txt-tertiary mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Impact areas */}
          <div className="p-6">
            <p className="text-txt-secondary text-sm mb-3">Areas clients see the biggest improvement:</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {IMPACTS.map((impact, i) => (
                <motion.span
                  key={impact}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.3, ease }}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20 font-medium"
                >
                  {impact}
                </motion.span>
              ))}
            </div>
            <div className="pt-4 border-t border-[var(--border)]">
              <p className="text-txt-secondary text-sm">
                <span className="text-txt-primary font-medium">Most cases resolved in just 2 sessions</span> — followed by structured rehab programmes. Don&apos;t take our word for it — check our Google reviews.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── GOOGLE REVIEWS ─── */}
      <ReviewsSection />

      {/* ─── STORY ─── */}
      <section id="story" className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-txt-primary">
            Why Birmingham Sports Therapy{" "}
            <span className="text-accent">Exists</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-6 relative">
          <div className="hidden sm:block absolute top-5 left-[16.66%] right-[16.66%] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              viewport={{ once: true }}
              className="h-full bg-gradient-to-r from-accent/30 via-accent/15 to-accent/30 origin-left"
            />
          </div>
          {STORY.map((chapter, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.5, ease }}
              viewport={{ once: true }}
              className="relative"
            >
              <span className="inline-block font-mono text-[11px] text-accent/60 tracking-wider bg-accent/[0.07] px-2 py-0.5 rounded">{chapter.n}</span>
              <p className="text-[10px] font-semibold text-accent tracking-widest uppercase mt-2">{chapter.tag}</p>
              <h3 className="font-display text-xl font-bold text-txt-primary mt-2">{chapter.title}</h3>
              <p className="text-sm text-txt-secondary mt-2 leading-relaxed">{chapter.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section id="certifications" className="border-y border-[var(--border)] bg-white/[0.01] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-txt-primary">
              Certified in every{" "}
              <span className="text-accent">treatment we offer</span>
            </h2>
            <p className="text-txt-secondary mt-3 max-w-lg mx-auto">Full transparency — every qualification on display. Your safety isn&apos;t negotiable.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTS.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease }}
                viewport={{ once: true }}
                className="bg-bg-card rounded-xl border border-[var(--border)] overflow-hidden group hover:border-accent/20 transition-all cursor-pointer"
                onClick={() => setLightbox(cert.image)}
              >
                <div className="relative w-full aspect-[4/3] bg-white overflow-hidden">
                  <Image src={cert.image} alt={cert.title} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-4 border-t border-[var(--border)]">
                  <p className="text-[10px] text-accent font-mono mb-1">{cert.issuer}</p>
                  <p className="text-sm font-medium text-txt-primary">{cert.title}</p>
                  <p className="text-[11px] text-txt-tertiary mt-1 leading-relaxed">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT / CTA ─── */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-txt-primary">
              Stop waiting.{" "}
              <span className="text-accent">Start recovering.</span>
            </h2>
            <p className="text-txt-secondary mt-4 max-w-md leading-relaxed">
              Whether you know exactly what you need or want honest advice on the best treatment — reach out. No waiting lists. No runaround. Usually reply same day.
            </p>

            <div className="mt-8 space-y-3">
              {[
                { icon: CheckCircle2, text: "Free initial consultation" },
                { icon: CheckCircle2, text: "Same-week appointments available" },
                { icon: CheckCircle2, text: "No referral needed" },
                { icon: CheckCircle2, text: "Honest advice — even if we're not the right fit" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2.5"
                >
                  <item.icon className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-sm text-txt-secondary">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 space-y-3">
              {[
                { icon: MapPin, title: "Birmingham, UK", detail: "Mobile & clinic-based sessions" },
                { icon: Clock, title: "Flexible Hours", detail: "Early mornings, evenings & weekends" },
                { icon: Phone, title: "Quick Response", detail: "Usually reply within a few hours" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-bg-card rounded-lg border border-[var(--border)] p-3 hover:border-[var(--border-hover)] transition-all">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-txt-primary">{item.title}</p>
                    <p className="text-[11px] text-txt-tertiary">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
            viewport={{ once: true }}
            className="bg-bg-card rounded-xl border border-[var(--border)] p-6 space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <h3 className="text-lg font-semibold text-txt-primary font-display">Request a Callback</h3>
              <p className="text-[11px] text-txt-tertiary mt-0.5">Fill this in — we&apos;ll be in touch, usually same day.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Name" className="col-span-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm text-txt-primary placeholder:text-txt-tertiary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors" />
              <input type="tel" placeholder="Phone" className="col-span-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm text-txt-primary placeholder:text-txt-tertiary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors" />
            </div>
            <input type="email" placeholder="Email" className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm text-txt-primary placeholder:text-txt-tertiary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors" />
            <select className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm text-txt-secondary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors appearance-none">
              <option value="">Select a treatment</option>
              <option>Sports Massage</option>
              <option>Dry Cupping</option>
              <option>Wet Cupping (Hijama)</option>
              <option>Fire Cupping</option>
              <option>Compression Therapy</option>
              <option>Infrared Therapy</option>
              <option>Not sure — advise me</option>
            </select>
            <textarea rows={3} placeholder="Where's the pain? How long? What have you tried?" className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-sm text-txt-primary placeholder:text-txt-tertiary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors resize-none" />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors"
            >
              <Send className="w-4 h-4" />
              Send &amp; Book Consultation
            </button>
            <p className="text-[10px] text-txt-tertiary text-center">No spam. No sales pitch. Just an honest conversation.</p>
          </motion.form>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="border-t border-[var(--border)] py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto px-6 text-center"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-txt-primary">
            Stop living with the pain.{" "}
            <span className="text-accent">Get it fixed.</span>
          </h2>
          <p className="text-txt-secondary mt-3">
            Your body shouldn&apos;t hold you back from the things you love.
          </p>
          <a
            href="https://wa.me/447955586565"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors mt-8"
          >
            Book Free Consultation
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[var(--border)] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-txt-tertiary">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="BST" width={120} height={30} className="h-6 w-auto opacity-60" />
          </div>
          <span>Professional sports therapy in Birmingham</span>
          <span>&copy; {new Date().getFullYear()} Birmingham Sports Therapy</span>
        </div>
      </footer>

      {/* Lightbox */}
      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}
