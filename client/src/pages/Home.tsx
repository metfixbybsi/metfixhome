/**
 * MetFix Homepage — Strategic Funnel Rebuild
 * Funnel: Hero → Affiliate Outcomes → Free Class → Courses + Affiliation
 *         → Foundations → Emily Story → Resource Library → The Gap
 *         → Testimonials → Newsletter → FAQ → Footer
 *
 * RULES: No em-dashes. No inflated stats. No Daily Fix repetition.
 * Colors: #0A0A0A bg | #C9A96E gold | #EFEFEF text
 * Fonts: Playfair Display (display) · DM Sans (body) · DM Mono (labels)
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  ArrowRight,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { assetUrl, basePath, HOME_SCROLL_KEY, scrollToHomeSection } from "@/const";
import { Link } from "wouter";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Responsive hook ───────────────────────────────────────────
function useIsDesktop(breakpoint = 900) {
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= breakpoint : true);
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isDesktop;
}

// ─── Hero Image ────────────────────────────────────────────────
const HERO_IMG = assetUrl("/hero.png");

// ─── Athlete Image (uploaded asset) ───────────────────────────
const ATHLETE_IMG = assetUrl("/manus-storage/emily_athlete_9856284c.jpeg");
const COURSE_HERO_IMG = assetUrl("/what-is-metfix-course-hero.png");
const AFFILIATION_BG_IMG = assetUrl("/affiliation-bg.png");
const METFIX_MAP_URL = "https://brokenscience.org/metfix/metfix-map/";
const MAILCHIMP_NEWSLETTER_ACTION =
  "https://brokenscience.us13.list-manage.com/subscribe/post?u=473a65a0067d6101d3a6277c8&id=abdc550935&f_id=001a53eaf0";

// ─── Affiliate Outcome Stories ────────────────────────────────
const AFFILIATE_STORIES = [
  {
    headline: "A client left the doctor's office with their best blood work in years.",
    coach: "Rose City MetFix",
    location: "",
    tag: "Metabolic Reversal",
  },
  {
    headline: "250 pounds gone from two clients in under a year.",
    coach: "Dusty",
    location: "MetFix Affiliate",
    tag: "Body Composition",
    note: "* figures being confirmed",
  },
  {
    headline: "Classes filling with women navigating menopause through strength, not surrender.",
    coach: "Krish",
    location: "MetFix Affiliate",
    tag: "Women's Health",
  },
  {
    headline: "An entire school district. Health class. PE. Science. Two after-school clubs.",
    coach: "John N.",
    location: "MetFix Affiliate",
    tag: "Youth Education",
  },
  {
    headline: "Police departments cutting workers comp costs and early retirement by implementing MetFix.",
    coach: "Multiple Departments",
    location: "Law Enforcement",
    tag: "First Responders",
  },
  {
    headline: "Firehouses rebuilding community through family-style meals and shared suffering in workouts.",
    coach: "Fire Departments",
    location: "MetFix Affiliate",
    tag: "Fire Service",
  },
  {
    headline: "An ER doctor who affiliated because MetFix is the prescription he had been missing.",
    coach: "Dr. Luke Palmisano",
    location: "MetFix Affiliate",
    tag: "Medical",
  },
  {
    headline: "A nursing home. Live streams. Workouts. Meal planning. Together.",
    coach: "Albert Lu",
    location: "MetFix Affiliate",
    tag: "Senior Health",
  },
];

// ─── Courses ──────────────────────────────────────────────────
const COURSES = [
  {
    label: "Professional",
    name: "MetFix Essentials Advanced",
    desc: "The complete professional curriculum. Every mechanism, every protocol, every conversation you need to coach metabolic health at the highest level.",
    href: "#",
    tag: "Coming Soon",
    live: false,
  },
  {
    label: "Specialty",
    name: "Fit for Duty",
    desc: "Metabolic health programming built for law enforcement, fire service, and military. The health crisis hiding in every department.",
    href: "https://brokenscience.org/fit-for-life-mailing-list/",
    tag: "Coming Soon",
    live: false,
    notify: true,
  },
  {
    label: "Specialty",
    name: "The Missing Manual",
    desc: "The course on puberty, perimenopause, and women's metabolic health that every coach working with women needs.",
    href: "https://brokenscience.org/the-missing-manual-mailing-list/",
    tag: "Coming Soon",
    live: false,
    notify: true,
  },
  {
    label: "Specialty",
    name: "Medical Nutrition Training",
    desc: "For physicians, PAs, and medical professionals who want to prescribe nutrition with clinical precision.",
    href: "#",
    tag: "Coming Soon",
    live: false,
  },
  {
    label: "Specialty",
    name: "The Prepared Patient",
    desc: "For people who are tired of being managed. The metabolic science your doctor never had time to explain, and what you can actually do about it.",
    href: "#",
    tag: "Coming Soon",
    live: false,
  },
  {
    label: "Specialty",
    name: "ATP, Athletic Teen Performance",
    desc: "Teenage athletes are not small adults. Their metabolic needs are different. This is the course that treats them that way.",
    href: "#",
    tag: "Coming Soon",
    live: false,
  },
  {
    label: "Coming Soon",
    name: "Coaching GLPs",
    desc: "How to coach clients on GLP-1 medications without losing muscle, metabolic function, or long-term results.",
    href: "#",
    tag: "Coming Soon",
    live: false,
  },
  {
    label: "Coming Soon",
    name: "Optimal Athletic Fueling",
    desc: "Periodized nutrition for performance. The metabolic science behind fueling athletes who want to win and stay healthy.",
    href: "#",
    tag: "Coming Soon",
    live: false,
  },
];

// ─── Resource Library Samples ─────────────────────────────────
const LIBRARY_SAMPLES = [
  {
    category: "Unbreakable Keynote",
    title: "A Body of Lies – Emily Kaplan",
    desc: "At the 2026 Unbreakable Health Retreat in Miami, Emily Kaplan presents the chronic disease epidemic not as bad luck or failed willpower, but as the product of decades of flawed science, institutional corruption, and incentives that reward disease management over health.",
    tag: "42 min",
    href: "https://brokenscience.org/a-body-of-lies-emily-kaplan/",
    author: "Emily Kaplan",
    badge: "Free",
    image: assetUrl("/emily-kaplan-keynote.png"),
    videoId: null,
    featured: true,
  },
  {
    category: "Journal Club",
    title: "Insulin Resistance Precedes Type 2 Diabetes by a Decade",
    desc: "Critical analysis of landmark research showing insulin resistance begins 10+ years before diagnosis and what that means for your coaching practice.",
    tag: "22 min",
    href: "https://brokenscience.org/journal-club/",
    author: "Bob Kaplan",
    badge: "Pro",
    videoId: null,
    featured: false,
  },
  {
    category: "Whiteboard",
    title: "The Mitochondria: Powerhouse of the Cell and Metabolic Flexibility",
    desc: "Pete Shaw breaks down how mitochondria power your cells and drive metabolic flexibility. The visual that makes it click for coaches.",
    tag: "14 min",
    href: "https://brokenscience.org/the-mitochondria-the-powerhouse-of-your-cells-and-its-role-in-metabolic-flexibility/",
    author: "Pete Shaw",
    badge: "Free",
    videoId: null,
    featured: false,
  },
  {
    category: "Speaking Event",
    title: "An Introduction to the Disease Economy",
    desc: "Emily Kaplan addresses the systemic failures in modern science and healthcare. Why the system is designed to manage disease, not reverse it.",
    tag: "Read",
    href: "https://brokenscience.org/an-introduction-to-the-disease-economy/",
    author: "Emily Kaplan",
    badge: "Free",
    videoId: null,
    featured: false,
  },
];

// ─── Affiliate Map Pins ────────────────────────────────────────
const AFFILIATE_PINS = [
  { name: "MetFix Pace", city: "Sacramento, CA", lat: 38.5816, lng: -121.4944 },
  { name: "MetFix Bern", city: "Bern, Switzerland", lat: 46.9480, lng: 7.4474 },
  { name: "MetFix OCS", city: "New Jersey, NJ", lat: 40.0583, lng: -74.4057 },
  { name: "Rogue Europe MetFix", city: "Bornem, Belgium", lat: 51.0993, lng: 4.2407 },
  { name: "MetFix JAX", city: "Jacksonville, FL", lat: 30.3322, lng: -81.6557 },
  { name: "Ellipsis MetFix", city: "Aberdeenshire, UK", lat: 57.2326, lng: -2.6931 },
  { name: "MetFix Wash Park", city: "Denver, CO", lat: 39.7392, lng: -104.9903 },
  { name: "Good Day MetFix", city: "Austin, TX", lat: 30.2672, lng: -97.7431 },
  { name: "MetFix Nashville", city: "Nashville, TN", lat: 36.1627, lng: -86.7816 },
  { name: "MetFix Miami", city: "Miami, FL", lat: 25.7617, lng: -80.1918 },
  { name: "MetFix Phoenix", city: "Phoenix, AZ", lat: 33.4484, lng: -112.074 },
  { name: "MetFix Seattle", city: "Seattle, WA", lat: 47.6062, lng: -122.3321 },
  { name: "MetFix Chicago", city: "Chicago, IL", lat: 41.8781, lng: -87.6298 },
  { name: "MetFix Lisbon", city: "Lisbon, Portugal", lat: 38.7223, lng: -9.1393 },
];

// ─── FAQ Data ─────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "Is MetFix a certificate?",
    a: "MetFix is an education platform, not a certification body. Our curriculum gives you the metabolic health knowledge and practical tools to transform your coaching practice. The Foundations Seminar and affiliate pathway represent the highest level of MetFix education, recognized by the MetFix community worldwide.",
  },
  {
    q: "How long does it take to complete the curriculum?",
    a: "The free What Is MetFix? class takes about an hour to complete. Specialty tracks range from 6 to 40 hours depending on the course. Foundations is a two-day in-person weekend seminar. You can move at your own pace with no deadlines.",
  },
  {
    q: "What is the difference between Essentials and Foundations?",
    a: "MetFix Essentials Advanced is the online curriculum and is required to apply for affiliation. It covers every mechanism, protocol, and coaching conversation you need to deliver metabolic health programming at a professional level. Foundations is the in-person, hands-on seminar and is strongly recommended for coaches and owners, but it can be completed after you become an affiliate. Most coaches complete Essentials first, then attend a Foundations Seminar to apply the knowledge alongside other coaches.",
  },
  {
    q: "Do I need a medical background to take these courses?",
    a: "No medical background required. MetFix is designed for coaches, trainers, gym owners and doctors and healthcare workers who want to deliver clinical-level metabolic health knowledge in a coaching setting. Physicians and medical professionals are absolutely welcome and regularly attend Foundations. We have several medical professionals who run MetFix programs through their medical practices. For our medical professionals we also offer a dedicated Medical Nutrition Training track built for them.",
  },
  {
    q: "What is a MetFix Affiliate?",
    a: "A MetFix Affiliate is a gym, box, or training facility that has been accepted into the MetFix affiliate program and committed to implementing MetFix programming in their community. Affiliates are part of a global network of coaches fighting chronic disease, with access to exclusive programming, community support, and ongoing education.",
  },
  {
    q: "What is the Broken Science Initiative?",
    a: "The Broken Science Initiative (BSI) is the research and intellectual foundation behind MetFix. BSI identifies where the science on chronic disease has gone wrong, and builds the evidence base for what actually works. BSI points to the problems. MetFix is how those solutions get applied in the real world, in your gym, with your community.",
  },
];

// ─── Testimonials ─────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "It's great to be going back to the original message that got me into functional training in the first place, which is using fitness, exercise, and food to improve people's health. I'm really excited to take some of the things I've learned today and apply them to helping improve the lives of the members in my community.",
    name: "Matty H.",
    role: "MetFix Foundations Participant",
    gym: "",
  },
  {
    quote: "What stood out most was how the seminar brought everything together. Concepts I'd heard for years finally made sense in a practical way, and I left motivated to make meaningful changes in how I coach and support my members.",
    name: "Pierre",
    role: "MetFix Foundations Participant",
    gym: "Lyon, France",
  },
  {
    quote: "The science helped me understand struggles I thought were personal failures and gave me a new level of compassion for myself.",
    name: "Meghan Russell",
    role: "MetFix Academy Staff and Affiliate Owner",
    gym: "",
  },
  {
    quote: "My background is in biology and exercise, not nutrition. Seeing those pieces connected together in a way that was intuitive and logical was incredibly valuable.",
    name: "MFx SC Coach",
    role: "MetFix Coach",
    gym: "",
  },
  {
    quote: "We're taking it to the next level, bringing together a lot of like-minded people to continue Greg's message and change people's lives.",
    name: "Clint Wiegal",
    role: "MetFix Affiliate",
    gym: "",
  },
  {
    quote: "I came to gain knowledge that would help my members live healthier lives, and what stood out most was that we didn't just learn information, we learned how to apply it.",
    name: "Clint Wiegal",
    role: "MetFix Affiliate",
    gym: "",
  },
];

// ─── Intersection Observer Hook ────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Counter Hook ──────────────────────────────────────────────
function useCounter(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─── Reveal Component ──────────────────────────────────────────
function Reveal({ children, className = "", delay = 0, direction = "up" }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right";
}) {
  const { ref, visible } = useInView();
  const cls = direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "reveal";
  return (
    <div ref={ref} className={`${cls} ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Animated Stat ─────────────────────────────────────────────
function AnimatedStat({ value, suffix, label, delay = 0 }: {
  value: number; suffix: string; label: string; delay?: number;
}) {
  const { ref, visible } = useInView(0.3);
  const count = useCounter(value, 1800, visible);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(2rem)",
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    }}>
      <div style={{
        fontFamily: "'Playfair Display'",
        fontWeight: 700,
        fontSize: "clamp(3.5rem, 7vw, 6rem)",
        color: "#C9A96E",
        lineHeight: 1,
        letterSpacing: "-0.02em",
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: "'DM Mono'",
        fontSize: "0.75rem",
        letterSpacing: "0.18em",
        color: "rgba(239,239,239,0.75)",
        textTransform: "uppercase",
        marginTop: "0.7rem",
      }}>{label}</div>
    </div>
  );
}

// ─── Search Overlay ────────────────────────────────────────────

// ─── Side Rail ─────────────────────────────────────────────────
function SideRail({ visible }: { visible: boolean }) {
  return (
    <div className="hidden lg:flex" style={{
      position: "fixed", left: "1.5rem", top: "50%", transform: "translateY(-50%)",
      flexDirection: "column", gap: "1.25rem", zIndex: 50,
      opacity: visible ? 1 : 0, transition: "opacity 0.4s ease",
      pointerEvents: visible ? "auto" : "none",
    }}>
      {[
        { id: "outcomes", label: "Outcomes" },
        { id: "classes", label: "Classes" },
        { id: "affiliation", label: "Affiliate" },
        { id: "library", label: "Library" },
        { id: "about", label: "About" },
      ].map(({ id, label }) => (
        <a key={id} href={`#${id}`} style={{ display: "flex", alignItems: "center", gap: "0.7rem", textDecoration: "none", opacity: 0.35, transition: "opacity 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "0.35")}>
          <div style={{ width: "1.5rem", height: "1px", background: "#C9A96E" }} />
          <span style={{ fontFamily: "'DM Mono'", fontSize: "0.7rem", letterSpacing: "0.18em", color: "#fdf6f6", textTransform: "uppercase" }}>{label}</span>
        </a>
      ))}
    </div>
  );
}

// ─── Testimonial Carousel ──────────────────────────────────────
function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const total = TESTIMONIALS.length;
  const go = (i: number) => setActive((i + total) % total);
  const t = TESTIMONIALS[active];
  return (
    <section id="testimonials" style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "6rem 0" }}>
      <div className="container">
        <div className="rule" style={{ marginBottom: "3rem" }}>
          <span className="label-mono">What MetFix Coaches Say</span>
        </div>
        <div className="testimonial-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center", minWidth: 0 }}>
          <div>
            <blockquote style={{
              fontFamily: "'Playfair Display'",
              fontStyle: "italic",
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              color: "#fdf6f6",
              lineHeight: 1.5,
              margin: 0,
              marginBottom: "2rem",
            }}>
              "{t.quote}"
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: "2.5rem", height: "2.5rem",
                background: "rgba(201,169,110,0.15)",
                border: "1px solid rgba(201,169,110,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "1rem", color: "#C9A96E",
              }}>
                {t.name[0]}
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: "0.95rem", color: "#fdf6f6" }}>{t.name}</div>
                <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.82)", textTransform: "uppercase", marginTop: "0.2rem" }}>{t.gym ? `${t.role} · ${t.gym}` : t.role}</div>
              </div>
            </div>
          </div>
          <div className="testimonial-controls" style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "center" }}>
            <button onClick={() => go(active - 1)}
              style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(239,239,239,0.8)", width: "2.5rem", height: "2.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A96E"; (e.currentTarget as HTMLButtonElement).style.color = "#C9A96E"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(239,239,239,0.5)"; }}
              aria-label="Previous testimonial">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1L1 6l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div style={{ fontFamily: "'DM Mono'", fontSize: "0.7rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.25)", textTransform: "uppercase" }}>{active + 1}/{total}</div>
            <button onClick={() => go(active + 1)}
              style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(239,239,239,0.8)", width: "2.5rem", height: "2.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A96E"; (e.currentTarget as HTMLButtonElement).style.color = "#C9A96E"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(239,239,239,0.5)"; }}
              aria-label="Next testimonial">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.7rem", marginTop: "2.5rem" }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              style={{ width: i === active ? "2rem" : "0.7rem", height: "2px", background: i === active ? "#C9A96E" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", transition: "width 0.3s ease, background 0.3s ease", padding: 0 }}
              aria-label={`Go to testimonial ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Outcomes Carousel ───────────────────────────────────────
const FOUNDATIONS_VIDEOS = [
  "https://player.vimeo.com/video/1193427610?h=f9a70db6c8&title=0&byline=0&portrait=0",
  "https://player.vimeo.com/video/1193430051?h=0d46185ed6&title=0&byline=0&portrait=0",
  "https://player.vimeo.com/video/1193432090?h=db017c46d7&title=0&byline=0&portrait=0",
  "https://player.vimeo.com/video/1193432959?h=80466c75eb&title=0&byline=0&portrait=0",
];

function FoundationsVideoCarousel() {
  const [active, setActive] = useState(0);
  const total = FOUNDATIONS_VIDEOS.length;
  const prev = () => setActive(i => (i - 1 + total) % total);
  const next = () => setActive(i => (i + 1) % total);
  return (
    <div>
      <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>Hear From Coaches Who Attended</span>
        <span style={{ color: "rgba(239,239,239,0.35)" }}>{active + 1} / {total}</span>
      </div>
      {/* Main video */}
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", background: "#111", borderRadius: "2px", marginBottom: "1rem" }}>
        <iframe
          key={active}
          src={FOUNDATIONS_VIDEOS[active]}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={`Foundations testimonial ${active + 1}`}
        />
      </div>
      {/* Controls + dot indicators */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={prev} style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "#fdf6f6", width: "2.25rem", height: "2.25rem", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "#C9A96E")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}>
          &#8592;
        </button>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {FOUNDATIONS_VIDEOS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? "1.5rem" : "0.4rem", height: "0.4rem", borderRadius: "9999px", background: i === active ? "#C9A96E" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
          ))}
        </div>
        <button onClick={next} style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "#fdf6f6", width: "2.25rem", height: "2.25rem", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "#C9A96E")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}>
          &#8594;
        </button>
      </div>
    </div>
  );
}

function OutcomesCarousel() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const total = AFFILIATE_STORIES.length;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (i: number) => {
    setFading(true);
    setTimeout(() => {
      setActive((i + total) % total);
      setFading(false);
    }, 300);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive(prev => (prev + 1) % total);
        setFading(false);
      }, 300);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [total]);

  const story = AFFILIATE_STORIES[active];

  return (
    <section id="outcomes" style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "5rem 0" }}>
      <div className="container">
        <Reveal>
          <div className="rule" style={{ marginBottom: "1.5rem" }}>
            <span className="label-mono">What MetFix Coaches Are Doing</span>
          </div>
          <h2 className="display-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", marginBottom: "1rem", maxWidth: "640px" }}>
            This is what happens when coaches<br />
            <span className="display-serif-italic text-gold">understand metabolic health.</span>
          </h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(239,239,239,0.82)", maxWidth: "520px", marginBottom: "3rem" }}>
            These are outcomes happening right now, in MetFix affiliate gyms around the world.
          </p>
        </Reveal>

        {/* Carousel */}
        <div style={{ position: "relative" }}>
          <div style={{
            opacity: fading ? 0 : 1,
            transition: "opacity 0.3s ease",
            borderLeft: "3px solid #C9A96E",
            paddingLeft: "2rem",
            minHeight: "8rem",
          }}>
            <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1rem" }}>
              {story.tag}
            </div>
            <p style={{
              fontFamily: "'Playfair Display'",
              fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
              lineHeight: 1.45,
              color: "#fdf6f6",
              margin: 0,
              marginBottom: "1.25rem",
              maxWidth: "720px",
            }}>
              {story.headline}
            </p>
            <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.82)", textTransform: "uppercase" }}>
              {story.location ? <>{story.coach} &middot; {story.location}</> : story.coach}
              {story.note && <span style={{ color: "rgba(239,239,239,0.75)", marginLeft: "0.7rem" }}>{story.note}</span>}
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginTop: "2.5rem" }}>
            <button onClick={() => go(active - 1)}
              style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(239,239,239,0.8)", width: "2.5rem", height: "2.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s, color 0.2s", flexShrink: 0 }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A96E"; (e.currentTarget as HTMLButtonElement).style.color = "#C9A96E"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(239,239,239,0.5)"; }}
              aria-label="Previous outcome">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1L1 6l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              {AFFILIATE_STORIES.map((_, i) => (
                <button key={i} onClick={() => go(i)}
                  style={{ width: i === active ? "1.75rem" : "0.5rem", height: "2px", background: i === active ? "#C9A96E" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", transition: "width 0.3s ease, background 0.3s ease", padding: 0 }}
                  aria-label={`Go to outcome ${i + 1}`} />
              ))}
            </div>
            <button onClick={() => go(active + 1)}
              style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(239,239,239,0.8)", width: "2.5rem", height: "2.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s, color 0.2s", flexShrink: 0 }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9A96E"; (e.currentTarget as HTMLButtonElement).style.color = "#C9A96E"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(239,239,239,0.5)"; }}
              aria-label="Next outcome">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div style={{ fontFamily: "'DM Mono'", fontSize: "0.7rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.7)", textTransform: "uppercase", marginLeft: "auto" }}>
              {active + 1} / {total}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// ─── Main Component ────────────────────────────────────────────
export default function Home() {
  const isDesktop = useIsDesktop(900);
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [railVisible, setRailVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { setHeroVisible(entry.isIntersecting); setRailVisible(!entry.isIntersecting); },
      { threshold: 0.1 }
    );
    if (heroRef.current) obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const pending = sessionStorage.getItem(HOME_SCROLL_KEY);
    if (pending) {
      sessionStorage.removeItem(HOME_SCROLL_KEY);
      requestAnimationFrame(() => scrollToHomeSection(pending));
      return;
    }
    if (window.location.hash === "#about") {
      requestAnimationFrame(() => scrollToHomeSection("about"));
    }
  }, []);



  return (
    <div style={{ background: "#0A0A0A", color: "#fdf6f6", minHeight: "100vh", overflowX: "hidden", maxWidth: "100vw" }}>

      {/* ═══ HERO ══════════════════════════════════════════════ */}
      <section ref={heroRef} className="hero-section" style={{ position: "relative", display: "flex", alignItems: "flex-end", overflow: "hidden", minHeight: "85vh" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={HERO_IMG} alt="" loading="eager" fetchPriority="high" decoding="sync" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.88) 50%, rgba(10,10,10,0.4) 100%)" }} />
        </div>
        <div className="container hero-container" style={{ position: "relative", zIndex: 1, paddingTop: "10rem", paddingBottom: "6rem" }}>
          <div style={{ maxWidth: "720px" }}>
            <div className="rule" style={{ marginBottom: "2rem" }}>
              <span className="label-mono">The Metabolic Fix</span>
            </div>
            <h1 className="display-serif" style={{ fontSize: "clamp(2.2rem, 6vw, 5.5rem)", marginBottom: "1.5rem", lineHeight: 1.05 }}>
              This is what happens<br />
              when coaches understand<br />
              <span className="display-serif-italic text-gold">metabolic health.</span>
            </h1>
            <p style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", lineHeight: 1.8, color: "rgba(239,239,239,0.65)", maxWidth: "560px", marginBottom: "1rem", fontWeight: 300 }}>
              MetFix trains coaches, gym owners, and health leaders to prevent and reverse chronic disease using metabolic science that works in the real world.
            </p>
            <p style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)", lineHeight: 1.6, color: "rgba(201,169,110,0.7)", maxWidth: "480px", marginBottom: "3rem", fontFamily: "'DM Mono'", letterSpacing: "0.05em" }}>
              130+ affiliate gyms. Year one.
            </p>
            <div className="hero-cta-stack" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              <a href="https://whatis.metfix.org/" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Take the Free Class <ArrowRight size={15} />
              </a>
              <Link href="/become-an-affiliate" className="btn-outline">
                See what you get as a MetFix affiliate
              </Link>
            </div>
            <a href="https://whatis.metfix.org/" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.12em", color: "rgba(239,239,239,0.75)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s", borderBottom: "1px solid rgba(239,239,239,0.15)", paddingBottom: "0.15rem" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(239,239,239,0.45)")}>
              Not a coach? Start here <ArrowRight size={11} />
            </a>
          </div>
        </div>

      </section>
      <SideRail visible={railVisible} />
      {/* ═══ CDC CHRONIC DISEASE + 130 GYMS IMPACT ═══════════════ */}
      <section id="impact" style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>

        {/* ── FULL-BLEED INTRO STATEMENT ── */}
        <Reveal>
          <div style={{ padding: "5rem 0 4rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="container">
              <div className="rule" style={{ marginBottom: "1.5rem" }}>
                <span className="label-mono">The Problem</span>
              </div>
              <p style={{ fontFamily: "'Playfair Display'", fontStyle: "italic", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", lineHeight: 1.55, color: "rgba(239,239,239,0.75)", maxWidth: "780px", marginBottom: "0.5rem" }}>
                "Three in four American adults have at least one chronic condition,<br />
                and over half have two or more."
              </p>
              <p style={{ fontFamily: "'DM Mono'", fontSize: "0.68rem", letterSpacing: "0.12em", color: "rgba(201,169,110,0.6)", textTransform: "uppercase" }}>
                — Centers for Disease Control and Prevention, May 14, 2026 (<a href="https://www.cdc.gov/chronic-disease/about/index.html" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(201,169,110,0.85)", textDecoration: "underline", textUnderlineOffset: "3px" }}>cdc.gov</a>)
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── AGE BREAKDOWN: FULL-WIDTH HORIZONTAL BARS ── */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { age: "Ages 65+", pct: 90, detail: "More than 90% have at least one chronic condition" },
            { age: "Ages 35–64", pct: 75, detail: "More than 75% have at least one condition" },
            { age: "Ages 18–34", pct: 60, detail: "60% have at least one condition" },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="age-breakdown-row" style={{
                display: "grid",
                gridTemplateColumns: "min(140px, 25vw) 1fr auto",
                alignItems: "center",
                gap: "2rem",
                padding: "2rem 0",
                margin: "0 auto",
                maxWidth: "calc(100% - 4rem)",
                width: "min(1200px, 100%)",
                marginLeft: "auto",
                marginRight: "auto",
                borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}>
                <div style={{ fontFamily: "'DM Mono'", fontSize: "0.72rem", letterSpacing: "0.15em", color: "#C9A96E", textTransform: "uppercase" as const }}>{item.age}</div>
                <div className="age-bar" style={{ position: "relative", height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{
                    position: "absolute", inset: "0 auto 0 0",
                    width: `${item.pct}%`,
                    background: `linear-gradient(90deg, #C9A96E ${100 - item.pct}%, rgba(201,169,110,0.35) 100%)`,
                    borderRadius: "3px",
                    animation: "barGrow 1.6s cubic-bezier(0.16,1,0.3,1) forwards",
                    animationDelay: `${i * 0.15 + 0.3}s`,
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                  }} />
                </div>
                <div style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#C9A96E", lineHeight: 1, minWidth: "80px", textAlign: "right" as const }}>{item.pct}%</div>
              </div>
              <div style={{
                fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "rgba(239,239,239,0.4)", lineHeight: 1.5,
                maxWidth: "min(1200px, calc(100% - 4rem))", margin: "0 auto",
                paddingBottom: i < 2 ? "0" : "0",
                paddingLeft: "0",
                marginBottom: i < 2 ? "0" : "0",
              }}>{item.detail}</div>
            </Reveal>
          ))}
        </div>

        {/* ── THE RESPONSE: 130+ GYMS ── */}
        <div style={{ background: "rgba(201,169,110,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
          <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
            <div style={{ alignItems: "center" }} className="grid-responsive response-grid">

              {/* Left: narrative */}
              <Reveal direction="left">
                <div className="rule" style={{ marginBottom: "1.5rem" }}>
                  <span className="label-mono">The Response</span>
                </div>
                <h2 className="display-serif" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", lineHeight: 1.05, marginBottom: "1.5rem" }}>
                  <span className="display-serif-italic text-gold">130+ affiliate gyms</span><br />
                  in year one are<br />
                  preventing and<br />
                  reversing these.
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(239,239,239,0.6)", marginBottom: "2rem", maxWidth: "420px" }}>
                  One community at a time, MetFix is leading by example, showing what's possible when coaches understand the science.
                </p>
                <Link href="/become-an-affiliate" className="btn-primary">
                  Join the Movement <ArrowRight size={15} />
                </Link>
              </Reveal>

              {/* Right: animated counter + mini stats */}
              <Reveal direction="right">
                <div style={{ display: "flex", flexDirection: "column" as const, gap: "0" }}>
                  {/* Giant counter */}
                  <div style={{ padding: "3rem 2.5rem", border: "1px solid rgba(201,169,110,0.15)", borderBottom: "none", background: "#0A0A0A" }}>
                    <div style={{ fontFamily: "'DM Mono'", fontSize: "0.68rem", letterSpacing: "0.18em", color: "rgba(201,169,110,0.6)", textTransform: "uppercase" as const, marginBottom: "0.75rem" }}>Affiliate Gyms · Year One</div>
                    <AnimatedStat value={130} suffix="+" label="" delay={300} />
                    <p style={{ fontFamily: "'DM Mono'", fontSize: "0.68rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.3)", textTransform: "uppercase" as const, marginTop: "1rem", marginBottom: 0 }}>
                      CrossFit boxes · Independent studios · Police depts · Fire stations · Federal Agencies
                    </p>
                  </div>
                  {/* Two mini stats */}
                  <div className="response-mini-stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid rgba(201,169,110,0.15)" }}>
                    <div style={{ padding: "1.75rem 2rem", borderRight: "1px solid rgba(201,169,110,0.1)" }}>
                      <div style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "2.25rem", color: "#C9A96E", lineHeight: 1 }}>1 yr</div>
                      <div style={{ fontFamily: "'DM Mono'", fontSize: "0.62rem", letterSpacing: "0.12em", color: "rgba(239,239,239,0.4)", textTransform: "uppercase" as const, marginTop: "0.5rem" }}>In Operation</div>
                    </div>
                    <div style={{ padding: "1.75rem 2rem" }}>
                      <div style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "2.25rem", color: "#C9A96E", lineHeight: 1 }}>100%</div>
                      <div style={{ fontFamily: "'DM Mono'", fontSize: "0.62rem", letterSpacing: "0.12em", color: "rgba(239,239,239,0.4)", textTransform: "uppercase" as const, marginTop: "0.5rem" }}>Coach led programs</div>
                    </div>
                  </div>
                  {/* Tagline */}
                  <div style={{ padding: "1.25rem 2rem", border: "1px solid rgba(201,169,110,0.15)", borderTop: "none", background: "rgba(201,169,110,0.05)" }}>
                    <p style={{ fontFamily: "'DM Mono'", fontSize: "0.68rem", letterSpacing: "0.12em", color: "rgba(201,169,110,0.7)", textTransform: "uppercase" as const, margin: 0, textAlign: "center" as const }}>
                      The problem is urgent. The movement is growing. Join us.
                    </p>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </div>

      </section>
      {/* ═══ FREE CLASS PANEL ══════════════════════════════════════ */}
      <section id="classes" style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "6rem 0" }}>
        <div className="container">
          <div style={{ alignItems: "center" }} className="grid-responsive">
            {/* Left: image */}
            <Reveal direction="left">
              <div style={{ position: "relative" }}>
                <img
                  src={COURSE_HERO_IMG}
                  alt="MetFix athlete performing overhead press"
                  style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center top", display: "block" }}
                />
                <div style={{
                  position: "absolute", top: "1.5rem", left: "1.5rem",
                  background: "#C9A96E", color: "#0A0A0A",
                  fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.15em",
                  textTransform: "uppercase", padding: "0.4rem 0.875rem", fontWeight: 600,
                }}>
                  Free Forever
                </div>
              </div>
            </Reveal>
            {/* Right: content */}
            <Reveal direction="right">
              <div className="rule" style={{ marginBottom: "1.5rem" }}>
                <span className="label-mono">Start Here</span>
              </div>
              <h2 className="display-serif" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", marginBottom: "1.25rem", lineHeight: 1.1 }}>
                What Is <span className="display-serif-italic text-gold">MetFix?</span>
              </h2>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(239,239,239,0.65)", marginBottom: "1.5rem" }}>
                The framework that explains why fit people get sick, why decade-long gym members stay stuck, and what coaches can do about it. Six chapters. Fifteen lessons. About an hour.
              </p>
              {/* Two tracks */}
              <div className="two-track-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                <div style={{ borderLeft: "2px solid #C9A96E", paddingLeft: "1rem" }}>
                  <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.7rem" }}>Member Track</div>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "rgba(239,239,239,0.6)", lineHeight: 1.6, margin: 0 }}>
                    For individuals who want to understand and optimize their own metabolic health.
                  </p>
                </div>
                <div style={{ borderLeft: "2px solid rgba(201,169,110,0.35)", paddingLeft: "1rem" }}>
                  <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.7rem" }}>Coach Track</div>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "rgba(239,239,239,0.6)", lineHeight: 1.6, margin: 0 }}>
                    For trainers, gym owners, and health professionals who want to apply this with clients.
                  </p>
                </div>
              </div>
              {/* Stats row */}
              <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  { n: "6", label: "Chapters" },
                  { n: "15", label: "Lessons" },
                  { n: "~1hr", label: "Runtime" },
                  { n: "Free", label: "Forever" },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "1.75rem", color: "#C9A96E", lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.12em", color: "rgba(239,239,239,0.82)", textTransform: "uppercase", marginTop: "0.3rem" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="hero-cta-stack" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="https://whatis.metfix.org/" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Take the Free Class <ArrowRight size={15} />
                </a>
                <Link href="/classes" className="btn-outline">
                  View All Courses
                </Link>
              </div>
              <p style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.75)", textTransform: "uppercase", marginTop: "1rem" }}>
                Education you can't find anywhere else
              </p>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ═══ EPIC FAILURES CTA ══════════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", padding: "5rem 0 6rem", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={HERO_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.92)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.2em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Start Now. Free Forever.
            </div>
            <h2 className="display-serif" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", lineHeight: 1.1, marginBottom: "1.5rem", maxWidth: "700px", margin: "0 auto 1.5rem" }}>
              The conventional playbook<br />
              has not solved the problem.<br />
              <span className="display-serif-italic text-gold">Ours actually works.</span>
            </h2>
          <div className="hero-cta-stack" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/become-an-affiliate" className="btn-outline">
                See what you get as a MetFix affiliate
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <OutcomesCarousel />

      {/* ═══ SPECIALTY COURSES ════════════════════════════════════ */}
      <section id="courses" style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "6rem 0" }}>
        <div className="container">
          <Reveal>
            <div className="rule" style={{ marginBottom: "1.5rem" }}>
              <span className="label-mono">Specialty Tracks</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3.5rem" }}>
              <h2 className="display-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1, maxWidth: "480px" }}>
                Go deeper.<br />
                <span className="display-serif-italic text-gold">Pick your population.</span>
              </h2>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(239,239,239,0.8)", maxWidth: "380px" }}>
                Each specialty track applies the MetFix framework to a specific population. Built by practitioners who work with that population every day.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
            {COURSES.map((course, i) => (
              <Reveal key={i} delay={i * 50}>
                <div style={{
                  background: "#0A0A0A",
                  padding: "2rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  opacity: course.live || course.notify ? 1 : 0.55,
                  transition: "background 0.2s",
                  cursor: course.live || course.notify ? "pointer" : "default",
                }}
                  onMouseEnter={e => { if (course.live || course.notify) (e.currentTarget as HTMLDivElement).style.background = "rgba(201,169,110,0.04)"; }}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "#0A0A0A"}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                    <span style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.15em", color: course.live ? "#C9A96E" : "rgba(239,239,239,0.25)", textTransform: "uppercase" }}>{course.label}</span>
                    <span style={{
                      fontFamily: "'DM Mono'", fontSize: "0.7rem", letterSpacing: "0.1em",
                      color: course.live ? "#0A0A0A" : "rgba(239,239,239,0.25)",
                      background: course.live ? "#C9A96E" : "rgba(255,255,255,0.08)",
                      padding: "0.25rem 0.625rem", textTransform: "uppercase",
                    }}>{course.tag}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "1.25rem", color: "#fdf6f6", marginBottom: "0.875rem", lineHeight: 1.3 }}>{course.name}</h3>
                  <p style={{ fontFamily: "'DM Sans'", fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(239,239,239,0.8)", flex: 1, marginBottom: "1.5rem" }}>{course.desc}</p>
                  {course.live ? (
                    <a href={course.href} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.12em", color: "#C9A96E", textDecoration: "none", textTransform: "uppercase", transition: "gap 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.gap = "0.7rem")}
                      onMouseLeave={e => (e.currentTarget.style.gap = "0.4rem")}>
                      Enroll <ChevronRight size={12} />
                    </a>
                  ) : course.notify ? (
                    <a href={course.href} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.12em", color: "#C9A96E", textDecoration: "none", textTransform: "uppercase", transition: "gap 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.gap = "0.7rem")}
                      onMouseLeave={e => (e.currentTarget.style.gap = "0.4rem")}>
                      Notify Me <ChevronRight size={12} />
                    </a>
                  ) : (
                    <span style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.12em", color: "rgba(239,239,239,0.75)", textTransform: "uppercase" }}>Coming Soon</span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AFFILIATION ══════════════════════════════════════════ */}
      <section id="affiliation" style={{ position: "relative", overflow: "hidden", padding: "7rem 0" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={AFFILIATION_BG_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.92) 50%, rgba(10,10,10,0.6) 100%)" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "640px" }}>
            <Reveal>
              <div className="rule" style={{ marginBottom: "1.5rem" }}>
                <span className="label-mono">MetFix Affiliation</span>
              </div>
              <h2 className="display-serif" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", marginBottom: "1.25rem", lineHeight: 1.1 }}>
                Join the gyms<br />
                <span className="display-serif-italic text-gold">already doing this.</span>
              </h2>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(239,239,239,0.65)", marginBottom: "1.25rem" }}>
                We work alongside you providing education, tools, and direct revenue opportunities designed to increase your ROI from day one. Affiliates access all MetFix courses at no cost and earn revenue share when their clients purchase through them.
              </p>
              <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "rgba(239,239,239,0.6)", marginBottom: "2rem" }}>
                130+ gyms affiliated in year one. Police departments. Fire stations. CrossFit boxes. Independent studios. All of them saw the same thing: clients who finally got results.
              </p>
              <div style={{ display: "inline-flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "2rem", padding: "1rem 1.5rem", border: "1px solid rgba(201,169,110,0.25)", background: "rgba(201,169,110,0.04)" }}>
                <span style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "2rem", color: "#C9A96E" }}>$167</span>
                <span style={{ fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.12em", color: "rgba(239,239,239,0.45)", textTransform: "uppercase" }}>/ month &nbsp;·&nbsp; annual commitment</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {[
                  "Access to all MetFix online courses at no cost.",
                  "Complete Resource Library: live streams, journal clubs, articles, whiteboards, book reports.",
                  "Special meal planning features and client tracking on the MetFix app.",
                  "Revenue share when your clients purchase MetFix courses through your gym.",
                  "MetFix brand license, affiliate dashboard, and gym finder listing.",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ color: "#C9A96E", fontFamily: "'DM Mono'", fontSize: "0.75rem", marginTop: "0.3rem", flexShrink: 0 }}>&#x2022;</span>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", lineHeight: 1.65, color: "rgba(239,239,239,0.6)" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/become-an-affiliate" className="btn-primary">
                  See what you get as a MetFix affiliate <ArrowRight size={15} />
                </Link>
                <a href={METFIX_MAP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  Find a Gym Near You
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ FOUNDATIONS SEMINAR ══════════════════════════════════ */}
      <section id="foundations" style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "6rem 0" }}>
        <div className="container">
          <div style={{ alignItems: "center" }} className="grid-responsive">
            <Reveal direction="left">
              <div className="rule" style={{ marginBottom: "1.5rem" }}>
                <span className="label-mono">Live Education</span>
              </div>
              <h2 className="display-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", marginBottom: "1.25rem", lineHeight: 1.1 }}>
                MetFix Foundations<br />
                <span className="display-serif-italic text-gold">Seminar</span>
              </h2>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(239,239,239,0.65)", marginBottom: "1.5rem" }}>
                Two days. In person. The hands-on practical capstone of the MetFix curriculum. You leave with the metabolic health coaching framework fully integrated, practiced, and ready to deploy with your clients on Monday.
              </p>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(239,239,239,0.8)", marginBottom: "2.5rem" }}>
                Foundations is where the community comes together. Coaches and practitioners from around the world. Shared knowledge, workouts and practical implementation. The MetFix culture, in-person.
              </p>
              <a href="https://brokenscience.org/events/" target="_blank" rel="noopener noreferrer" className="btn-primary">
                View Upcoming Seminars <ArrowRight size={15} />
              </a>
            </Reveal>
            <Reveal direction="right">
              <FoundationsVideoCarousel />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ EMILY STORY ══════════════════════════════════════════ */}
      <section id="about" style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "6rem 0" }}>
        <div className="container">
          {/* Header row */}
          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", marginBottom: "3.5rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div>
                <div className="rule" style={{ marginBottom: "1.25rem" }}>
                  <span className="label-mono">Why MetFix Is Different</span>
                </div>
                <div style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "clamp(1.6rem, 2.8vw, 2.25rem)", color: "#fdf6f6", lineHeight: 1.2 }}>
                  Emily Kaplan &amp; Greg Glassman
                </div>
              </div>
              <div style={{ fontFamily: "'DM Mono'", fontSize: "0.7rem", letterSpacing: "0.15em", color: "#C9A96E", textTransform: "uppercase", maxWidth: "320px", lineHeight: 1.6, textAlign: "right" }}>
                Co-Founders of MetFix<br />and The Broken Science Initiative
              </div>
            </div>
          </Reveal>
          {/* Content: photo left (5fr), blockquote + bio right (7fr) */}
          <div style={{ display: "grid", gap: "4rem", alignItems: "stretch" }} className="about-story-grid">
            <Reveal direction="left">
              {/* Founders photo — fills the full left column height */}
              <div style={{ position: "relative", overflow: "hidden", height: "100%", minHeight: "420px" }} className="founders-photo-wrapper">
                <img
                  src={assetUrl("/founders.png")}
                  alt="Emily Kaplan and Greg Glassman"
                  style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", objectPosition: "center center", position: "absolute", inset: 0 }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.65) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ fontFamily: "'DM Mono'", fontSize: "0.55rem", letterSpacing: "0.14em", color: "rgba(239,239,239,0.4)", textTransform: "uppercase" }}>Founders</span>
                  <span style={{ fontFamily: "'DM Mono'", fontSize: "0.55rem", letterSpacing: "0.1em", color: "rgba(201,169,110,0.75)", textTransform: "uppercase" }}>Emily Kaplan &amp; Greg Glassman</span>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                <div>
                  <blockquote style={{
                    fontFamily: "'Playfair Display'",
                    fontStyle: "italic",
                    fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)",
                    color: "#fdf6f6",
                    lineHeight: 1.65,
                    borderLeft: "3px solid #C9A96E",
                    paddingLeft: "2rem",
                    margin: "0 0 2.5rem 0",
                  }}>
                    &ldquo;The healthcare system is not broken. It is working exactly as it was designed &mdash; generating more than $4 trillion annually from treatments that manage symptoms and never address the root cause. At MetFix, for the cost of a gym membership, your clients can work on the root cause. Education is the antidote.&rdquo;
                  </blockquote>
                  <div style={{ paddingLeft: "2rem", marginTop: "1rem", marginBottom: "2.5rem" }}>
                    <div style={{ fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.14em", color: "#C9A96E", textTransform: "uppercase" }}>Emily Kaplan</div>
                    <div style={{ fontFamily: "'DM Mono'", fontSize: "0.55rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.35)", textTransform: "uppercase", marginTop: "0.25rem" }}>CEO, MetFix &amp; The Broken Science Initiative</div>
                  </div>
                  <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "rgba(239,239,239,0.65)", marginBottom: "1.5rem" }}>
                    Emily Kaplan opened her first gym and watched fit, motivated clients still get sick. She hired coaches, worked with clients, and built a curriculum. She had spent decades looking at why the science wasn&apos;t working. She knew there was a better way to help people. That work became MetFix and The Broken Science Initiative.
                  </p>
                  <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "rgba(239,239,239,0.65)", marginBottom: "2.5rem" }}>
                    MetFix was co-founded with Greg Glassman, founder of CrossFit, and built on the research infrastructure of The Broken Science Initiative. It is not an opinion platform. It is the product of decades of investigations, hands-on coaching, and building businesses that work.
                  </p>
                </div>
                <a href="https://brokenscience.org/" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.12em", color: "rgba(239,239,239,0.6)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(239,239,239,0.6)")}>The Broken Science Initiative <ArrowRight size={12} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
            {/* ═══ RESOURCE LIBRARY ═════════════════════════════════════ */}
      <section id="library" style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "6rem 0" }}>
        <div className="container">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3.5rem" }}>
              <div>
                <div className="rule" style={{ marginBottom: "1.5rem" }}>
                  <span className="label-mono">Resource Library</span>
                </div>
                <h2 className="display-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}>
                  Full Resource Library. Cutting Edge Classes.<br />
                  <span className="display-serif-italic text-gold">A Community Raising the Standard.</span>
                </h2>
                <p style={{ fontFamily: "'DM Sans'", fontSize: "0.95rem", lineHeight: 1.75, color: "rgba(239,239,239,0.5)", maxWidth: "520px", marginTop: "1rem", fontWeight: 300 }}>
                  Journal clubs, live streams, whiteboards, book reports, and original articles from Dr. Ben Bikman, Nina Teicholz, Dr. Malcolm Kendrick, and more. The research your clients need, organized for coaches.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem" }}>
                  {[
                    { label: "Videos", href: "https://brokenscience.org/category/video/" },
                    { label: "Articles", href: "https://brokenscience.org/category/articles/" },
                    { label: "Live Streams", href: "https://www.youtube.com/@thebrokenscienceinitiative/streams" },
                    { label: "Journal Club", href: "https://brokenscience.org/journal-club/" },
                    { label: "Whiteboards", href: "https://brokenscience.org/category/video/" },
                  ].map(tag => (
                    <a key={tag.label} href={tag.href} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", letterSpacing: "0.12em", color: "rgba(239,239,239,0.5)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.3rem 0.75rem", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#C9A96E"; e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "rgba(239,239,239,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
                      {tag.label}
                    </a>
                  ))}
                </div>
              </div>
              <a href="https://brokenscience.org/all-content/" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.7rem", fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.12em", color: "rgba(239,239,239,0.6)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(239,239,239,0.6)")}>
                Full Library <ArrowRight size={12} />
              </a>
            </div>
          </Reveal>

          {/* Featured item + 3 secondary items */}
          <div className="library-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
            {/* Featured large card */}
            <Reveal direction="left">
              <div style={{ background: "#080808", padding: "3rem", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <span style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#C9A96E", textTransform: "uppercase" }}>{LIBRARY_SAMPLES[0].category}</span>
                  <span style={{
                    fontFamily: "'DM Mono'", fontSize: "0.7rem", letterSpacing: "0.1em",
                    color: LIBRARY_SAMPLES[0].badge === "Free" ? "#C9A96E" : "#0A0A0A",
                    background: LIBRARY_SAMPLES[0].badge === "Free" ? "transparent" : "#C9A96E",
                    border: LIBRARY_SAMPLES[0].badge === "Free" ? "1px solid rgba(201,169,110,0.4)" : "none",
                    padding: "0.25rem 0.625rem", textTransform: "uppercase",
                  }}>{LIBRARY_SAMPLES[0].badge}</span>
                </div>
                <a href={LIBRARY_SAMPLES[0].href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", position: "relative", aspectRatio: "16/9", background: "#111", marginBottom: "1.5rem", overflow: "hidden", textDecoration: "none" }}>
                  <img src={LIBRARY_SAMPLES[0].image} alt={LIBRARY_SAMPLES[0].title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "4rem", height: "4rem", background: "rgba(201,169,110,0.9)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A0A0A"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: "0.75rem", right: "0.75rem", fontFamily: "'DM Mono'", fontSize: "0.7rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.7)", background: "rgba(0,0,0,0.7)", padding: "0.2rem 0.5rem", textTransform: "uppercase" }}>{LIBRARY_SAMPLES[0].tag}</div>
                </a>
                <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "1.35rem", color: "#fdf6f6", marginBottom: "0.875rem", lineHeight: 1.35 }}>
                  {LIBRARY_SAMPLES[0].title}
                </h3>
                <p style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(239,239,239,0.8)", flex: 1, marginBottom: "1.25rem" }}>
                  {LIBRARY_SAMPLES[0].desc}
                </p>
                <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.82)", textTransform: "uppercase" }}>{LIBRARY_SAMPLES[0].author}</div>
              </div>
            </Reveal>

            {/* Three secondary cards stacked */}
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
              {LIBRARY_SAMPLES.slice(1).map((item, i) => (
                <Reveal key={i} delay={i * 80} direction="right">
                  <a href={item.href} target="_blank" rel="noopener noreferrer"
                    style={{ background: "#080808", padding: "1.75rem 2rem", display: "flex", flexDirection: "column", height: "100%", textDecoration: "none", transition: "background 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,169,110,0.04)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#080808")}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                      <span style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#C9A96E", textTransform: "uppercase" }}>{item.category}</span>
                      <div style={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
                        <span style={{ fontFamily: "'DM Mono'", fontSize: "0.7rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.25)", textTransform: "uppercase" }}>{item.tag}</span>
                        <span style={{
                          fontFamily: "'DM Mono'", fontSize: "0.7rem", letterSpacing: "0.1em",
                          color: item.badge === "Free" ? "#C9A96E" : "#0A0A0A",
                          background: item.badge === "Free" ? "transparent" : "#C9A96E",
                          border: item.badge === "Free" ? "1px solid rgba(201,169,110,0.4)" : "none",
                          padding: "0.2rem 0.5rem", textTransform: "uppercase",
                        }}>{item.badge}</span>
                      </div>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "1rem", color: "#fdf6f6", marginBottom: "0.7rem", lineHeight: 1.35, flex: 1 }}>{item.title}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginTop: "0.75rem" }}>
                      <BookOpen size={12} color="rgba(239,239,239,0.25)" />
                      <span style={{ fontFamily: "'DM Mono'", fontSize: "0.7rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.25)", textTransform: "uppercase" }}>{item.author}</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={200}>
            <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
              <a href="https://brokenscience.org/all-content/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Access the Full Library <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ THE GAP ══════════════════════════════════════════════ */}
      <section style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "6rem 0" }}>
        <div className="container">
          <div style={{ alignItems: "start" }} className="grid-responsive">
            <Reveal direction="left">
              <div className="rule" style={{ marginBottom: "1.5rem" }}>
                <span className="label-mono">The Gap</span>
              </div>
              <h2 className="display-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Most training programs don't address metabolic health{" "}
                <span className="display-serif-italic text-gold">in a meaningful way.</span>
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(239,239,239,0.6)", marginBottom: "2rem" }}>
                Coaches and practitioners deserve better. That disconnect is the issue. We were all fed faulty promises. It is time to sound the alarm and do what actually works.
              </p>
              <a href="https://whatis.metfix.org/" target="_blank" rel="noopener noreferrer" className="btn-primary">
                See the MetFix Approach <ArrowRight size={15} />
              </a>
            </Reveal>
            <Reveal direction="right">
              <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.15em", color: "rgba(239,239,239,0.82)", textTransform: "uppercase", marginBottom: "1.5rem" }}>The Status Quo is Not Enough</div>
              {[
                "Guidelines paid for by industry",
                "Studies that don't replicate",
                "Mantras about moving more and eating less",
                "Blaming clients rather than fixing the knowledge gap",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "rgba(239,239,239,0.75)", fontSize: "1rem", fontWeight: 300, lineHeight: 1 }}>×</span>
                  <span style={{ fontFamily: "'DM Sans'", fontSize: "1rem", color: "rgba(239,239,239,0.65)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
              <div style={{ marginTop: "1.5rem", borderLeft: "3px solid #C9A96E", paddingLeft: "1.5rem", paddingTop: "1.25rem", paddingBottom: "1.25rem" }}>
                <p style={{ fontFamily: "'Playfair Display'", fontStyle: "italic", fontSize: "1.2rem", color: "#fdf6f6", margin: 0, lineHeight: 1.5 }}>
                  &ldquo;We followed their advice and it only made us all sicker. It&rsquo;s time for a revolution in health.&rdquo; Emily Kaplan
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STAT COUNTERS removed — content moved to impact section above hero */}

      {/* ═══ TESTIMONIALS ══════════════════════════════════════════ */}
      <TestimonialCarousel />

      {/* ═══ AFFILIATE NETWORK ════════════════════════════════════ */}
      <section id="network" style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ alignItems: "center" }} className="grid-responsive">
            <Reveal direction="left">
              <div className="rule" style={{ marginBottom: "1.5rem" }}>
                <span className="label-mono">Global Network</span>
              </div>
              <h2 className="display-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", marginBottom: "1.5rem", lineHeight: 1.1 }}>
                130+ affiliate gyms.<br />
                <span className="display-serif-italic text-gold">Year one.</span>
              </h2>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(239,239,239,0.6)", marginBottom: "2rem" }}>
                MetFix affiliates are in every corner of the country. Police departments. Fire stations. Schools. Clinics. CrossFit boxes. Independent studios. Everywhere coaches and practitioners are serious about results.
              </p>
              <Link href="/become-an-affiliate" className="btn-primary">
                See what you get as a MetFix affiliate <ArrowRight size={15} />
              </Link>
            </Reveal>
            <Reveal direction="right">
              <div className="affiliate-pin-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
                {AFFILIATE_PINS.slice(0, 8).map((pin, i) => (
                  <div key={i} style={{ background: "#0A0A0A", padding: "1.5rem", borderBottom: i < 6 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                    <div style={{ fontFamily: "'DM Mono'", fontSize: "0.7rem", letterSpacing: "0.12em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.4rem" }}>{pin.city}</div>
                    <div style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: "0.9rem", color: "#fdf6f6", lineHeight: 1.3 }}>{pin.name}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ════════════════════════════════════════════ */}
      <section id="newsletter" style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ alignItems: "start" }} className="grid-responsive">
            <Reveal direction="left">
              <div className="rule" style={{ marginBottom: "1.5rem" }}>
                <span className="label-mono">The MetFix Weekly</span>
              </div>
              <h2 className="display-serif" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
                One email.<br />
                <span className="display-serif-italic text-gold">Everything you need.</span>
              </h2>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(239,239,239,0.6)", marginBottom: "2rem" }}>
                Every week, MetFix subscribers get 7 recipes, 7 workouts, and 7 readings from The Daily Fix, plus announcements about upcoming events, seminars, and courses, and an original article written exclusively for the MetFix community.
              </p>
              <div className="daily-fix-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { n: "07", label: "Recipes", desc: "Metabolically optimized, every week" },
                  { n: "07", label: "Workouts", desc: "Built for metabolic output" },
                  { n: "07", label: "Readings", desc: "From the research front" },
                  { n: "01", label: "Original Article", desc: "Written for the MetFix community" },
                ].map(item => (
                  <div key={item.label} style={{ padding: "1.25rem", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontFamily: "'Playfair Display'", fontWeight: 700, fontSize: "1.5rem", color: "#C9A96E", lineHeight: 1, marginBottom: "0.25rem" }}>{item.n}</div>
                    <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.12em", color: "rgba(239,239,239,0.8)", textTransform: "uppercase", marginBottom: "0.4rem" }}>{item.label}</div>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "rgba(239,239,239,0.6)", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal direction="right">
              <div style={{ padding: "2.5rem", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.7rem" }}>Join Thousands of Coaches and Members</div>
                <p style={{ fontFamily: "'DM Sans'", fontSize: "0.875rem", color: "rgba(239,239,239,0.6)", marginBottom: "1.75rem" }}>
                  Free forever. No credit card. Unsubscribe anytime.
                </p>
                {newsletterSubmitted ? (
                  <div style={{ padding: "1.5rem", background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display'", fontStyle: "italic", fontSize: "1.1rem", color: "#C9A96E", marginBottom: "0.7rem" }}>You're in.</div>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: "0.875rem", color: "rgba(239,239,239,0.8)" }}>First issue arrives this week.</div>
                  </div>
                ) : (
                  <>
                    <form
                      action={MAILCHIMP_NEWSLETTER_ACTION}
                      method="post"
                      target="mailchimp-newsletter"
                      onSubmit={() => setNewsletterSubmitted(true)}
                      className="newsletter-form-row"
                      style={{ display: "flex", gap: "0" }}
                    >
                      <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
                        <input type="text" name="b_473a65a0067d6101d3a6277c8_abdc550935" tabIndex={-1} defaultValue="" />
                      </div>
                      <input
                        type="email"
                        name="EMAIL"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                        style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none", padding: "0.875rem 1rem", fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "#fdf6f6", outline: "none" }}
                      />
                      <button type="submit" className="btn-primary" style={{ borderRadius: 0, whiteSpace: "nowrap" }}>
                        Subscribe <ArrowRight size={14} />
                      </button>
                    </form>
                    <iframe name="mailchimp-newsletter" title="Newsletter signup" style={{ display: "none" }} />
                  </>
                )}
                <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.12em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "0.7rem" }}>The Daily Fix</div>
                  <a href="https://brokenscience.org/fix/" target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
                    onMouseLeave={e => (e.currentTarget.style.color = "inherit")}>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: "0.875rem", color: "rgba(239,239,239,0.8)" }}>
                      Want it daily instead of weekly? A workout, recipe, and reading every morning. Free.
                    </span>
                    <ArrowRight size={14} color="rgba(239,239,239,0.55)" style={{ flexShrink: 0, marginLeft: "0.75rem" }} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ══════════════════════════════════════════════════ */}
      <section style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "6rem 0" }}>
        <div className="container">
          <Reveal>
            <div className="rule" style={{ marginBottom: "1.5rem" }}>
              <span className="label-mono">Common Questions</span>
            </div>
            <h2 className="display-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", marginBottom: "3rem", lineHeight: 1.1 }}>
              Everything you need<br />
              <span className="display-serif-italic text-gold">to get started.</span>
            </h2>
          </Reveal>
          <div style={{ maxWidth: "720px" }}>
            <Accordion type="single" collapsible>
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <AccordionTrigger style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: "1rem", color: "#fdf6f6", padding: "1.5rem 0", textAlign: "left" }}>
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent style={{ fontFamily: "'DM Sans'", fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(239,239,239,0.82)", paddingBottom: "1.5rem" }}>
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══════════════════════════════════════════════ */}
      <footer style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "4rem 0 2rem", paddingBottom: "calc(2rem + env(safe-area-inset-bottom, 0px))" }} className="footer-mobile-pad">
        <div className="container">
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ marginBottom: "1.25rem" }}>
                <img src={assetUrl("/metfix-lockup.png")} alt="MetFix" style={{ height: "2.25rem", width: "auto", display: "block" }} />
              </div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(239,239,239,0.82)", maxWidth: "280px", marginBottom: "1.25rem" }}>
                The metabolic health education platform for coaches, gym owners, and health leaders fighting chronic disease.
              </p>
              <a href="https://brokenscience.org/" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.12em", color: "rgba(201,169,110,0.5)", textDecoration: "none", textTransform: "uppercase" }}>
                A Broken Science Initiative Project
              </a>
            </div>
            <div>
              <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1.25rem" }}>Learn</div>
              {[
                { label: "The Daily Fix", href: "https://brokenscience.org/fix/" },
                { label: "What Is MetFix?", href: "https://whatis.metfix.org/" },
                { label: "Foundations Seminar", href: "https://brokenscience.org/events/" },
              ].map(l => (
                <a key={l.label} href={basePath(l.href)} target={l.href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer"
                  style={{ display: "block", fontFamily: "'DM Sans'", fontSize: "0.85rem", color: "rgba(239,239,239,0.8)", textDecoration: "none", marginBottom: "0.75rem", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#EFEFEF")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(239,239,239,0.5)")}>{l.label}</a>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1.25rem" }}>Specialty</div>
              {[
                { label: "Courses", href: "/courses" },
              ].map(l => (
                <a key={l.label} href={basePath(l.href)} target={l.href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer"
                  style={{ display: "block", fontFamily: "'DM Sans'", fontSize: "0.85rem", color: "rgba(239,239,239,0.8)", textDecoration: "none", marginBottom: "0.75rem", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#EFEFEF")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(239,239,239,0.5)")}>{l.label}</a>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.15em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "1.25rem" }}>Community</div>
              {[
                { label: "Find a Gym", href: METFIX_MAP_URL },
                { label: "Become an Affiliate", href: "/become-an-affiliate" },
                { label: "Broken Science Initiative", href: "https://brokenscience.org/" },
                { label: "Login", href: "https://brokenscience.org/login/" },
              ].map(l => (
                <a key={l.label} href={basePath(l.href)}
                  target={l.href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer"
                  style={{ display: "block", fontFamily: "'DM Sans'", fontSize: "0.85rem", color: "rgba(239,239,239,0.8)", textDecoration: "none", marginBottom: "0.75rem", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#EFEFEF")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(239,239,239,0.5)")}>{l.label}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.65)", textTransform: "uppercase" }}>
              © 2026 MetFix. The Metabolic Fix. All rights reserved.
            </div>
            <div style={{ fontFamily: "'DM Mono'", fontSize: "0.75rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.75)", textTransform: "uppercase" }}>
              <a href="https://brokenscience.org/privacy-policy/" target="_blank" rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#EFEFEF")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(239,239,239,0.75)")}>Privacy</a>
              {' · '}
              <a href="https://brokenscience.org/terms-and-conditions/" target="_blank" rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#EFEFEF")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(239,239,239,0.75)")}>Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══ STICKY MOBILE CTA BAR ══════════════════════════════ */}
      <div style={{
        display: isDesktop ? "none" : "flex",
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
        background: "rgba(10,10,10,0.97)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "0.875rem 1.5rem",
        paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom))",
        gap: "0.75rem", alignItems: "center",
      }}>
        <a href="https://whatis.metfix.org/" target="_blank" rel="noopener noreferrer"
          className="btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: "0.85rem" }}>
          Start Here <ArrowRight size={14} />
        </a>
        <Link href="/become-an-affiliate"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0.625rem 1rem", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(239,239,239,0.7)", textDecoration: "none", fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap", transition: "border-color 0.2s" }}>
          Affiliate
        </Link>
      </div>

    </div>
  );
}
