/*
 * Classes.tsx — MetFix Courses Page (Redesigned)
 * Design: "Earned Authority" — #0A0A0A bg, #C9A96E gold, #EFEFEF text
 * Layout: sticky course nav → compact card grid → expandable detail panels
 * Fonts: Playfair Display (display), DM Sans (body), DM Mono (labels)
 */
import { useEffect, useRef, useState } from "react";

function useIsDesktop(breakpoint = 900) {
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= breakpoint : true);
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isDesktop;
}
import { assetUrl } from "@/const";
import { ArrowRight, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Link } from "wouter";

// ─── COURSE DATA ─────────────────────────────────────────────────────────────

const COURSES = [
  {
    id: "free-class",
    label: "What Is MetFix?",
    tag: "FREE FOREVER",
    tagColor: "#C9A96E",
    audience: "Coaches · Individuals",
    price: "Free",
    stats: [{ n: "6", l: "Chapters" }, { n: "15", l: "Lessons" }, { n: "~1hr", l: "Runtime" }],
    href: "https://whatis.metfix.org/",
    isAffiliateFree: false,
    intro: "The framework that explains why fit people get sick, why decade-long gym members stay stuck, and what coaches can do about it. Six chapters. Fifteen lessons. About an hour. Two tracks: the Member Track for individuals who want to understand their own metabolic health, and the Coach Track for trainers, gym owners, and health professionals who want to apply this with clients.",
    modules: [
      { num: "01", title: "The Metabolic Crisis", desc: "Why the standard model of fitness is failing clients who do everything right." },
      { num: "02", title: "Bioenergetics", desc: "How your body actually makes and uses energy — and what goes wrong." },
      { num: "03", title: "Insulin & Metabolic Dysfunction", desc: "The central mechanism behind most chronic disease and body composition problems." },
      { num: "04", title: "The MetFix Framework", desc: "The diagnostic and coaching framework that changes how you see every client." },
      { num: "05", title: "Practical Application", desc: "How to apply the framework in real coaching conversations and program design." },
      { num: "06", title: "Building a MetFix Practice", desc: "How to position yourself as a metabolic health coach and grow your practice." },
    ],
  },
  {
    id: "fit-for-duty",
    label: "Fit for Duty",
    tag: "COMING SOON",
    tagColor: "rgba(239,239,239,0.35)",
    audience: "Law Enforcement · Fire · Military · ER",
    price: "Coming Soon",
    stats: [{ n: "11", l: "Modules" }, { n: "~11hrs", l: "Content" }],
    href: "https://brokenscience.org/fit-for-life-mailing-list/",
    isAffiliateFree: true,
    intro: "The complete first responder health system. Eleven modules addressing metabolic health, mental resilience, and occupational longevity. Built for the real world: night shifts, shift meals, convenience stores, and the field. Eligible for department training budgets and federal grants including COPS LEMHWA, FEMA AFG, and HRSA — most departments pay nothing out of pocket.",
    modules: [
      { num: "01", title: "Why Are We Here?", desc: "The documented health crisis and the cortisol-insulin cascade driving it." },
      { num: "02", title: "The Five Factors That Will Take You Out", desc: "Metabolic syndrome, sleep deprivation, mental health, alcohol, and chronic inflammation." },
      { num: "03", title: "The Broken Science", desc: "How 50 years of flawed nutritional guidance failed first responders." },
      { num: "04", title: "The MetFix Framework", desc: "Cortisol, insulin, mitochondria, ghrelin, leptin — the biology you need to understand your body." },
      { num: "05", title: "Practical Fixes", desc: "Nutrition protocol, seed oil elimination, MetFix functional fitness, weighted walks, and the three sleep protocols." },
      { num: "06", title: "Same Job, Different Outcomes", desc: "Four case studies: patrol officer, firefighter, ER nurse, federal air marshal." },
      { num: "07", title: "Field Implementation", desc: "Go-bag protocol, field nutrition survival, convenience store guide, metabolic testing." },
      { num: "08", title: "Behavior Change", desc: "Identity, environment design, the crew effect, and your 30-day action plan." },
      { num: "09", title: "Hormones & Performance", desc: "How cortisol, testosterone, and growth hormone interact with shift work and occupational stress." },
      { num: "10", title: "Applied Nutrition Lab", desc: "Practical application of the MetFix nutrition framework in real-world field conditions." },
      { num: "11", title: "Department Implementation", desc: "How to bring MetFix to your agency: training budgets, grant documentation, and implementation planning." },
    ],
  },
  {
    id: "missing-manual",
    label: "The Missing Manual",
    tag: "COMING SOON",
    tagColor: "rgba(239,239,239,0.35)",
    audience: "Women · Coaches · Health Professionals",
    price: "Coming Soon",
    stats: [{ n: "6", l: "Modules" }, { n: "20", l: "Lessons" }, { n: "2026", l: "Evidence" }],
    href: "https://brokenscience.org/the-missing-manual-mailing-list/",
    isAffiliateFree: true,
    intro: "You were not imagining it. The exhaustion, the brain fog, the weight that appeared without explanation, the anxiety that came from nowhere. These are not signs of weakness. They are signs of a body navigating a profound hormonal transition with almost no guidance from the system that was supposed to help. The Missing Manual covers what the science now says about perimenopause, hormones, metabolism, and what women can actually do about it — drawn from the same metabolic framework that powers the MetFix curriculum.",
    modules: [
      { num: "01", title: "Foundations", desc: "Why this course exists, the state of women's health research, and a regulatory correction twenty-two years in the making." },
      { num: "02", title: "The Transition", desc: "The late reproductive phase, perimenopause as ovarian chaos rather than gradual decline, and what the science now says about managing it." },
      { num: "03", title: "Hormones & Metabolism", desc: "What happens to your body's chemistry when estrogen leaves. Visceral fat, ectopic fat, and a menopause-specific nutrition framework." },
      { num: "04", title: "The Clinical Picture", desc: "Why lab results can look normal while your body tells a different story. Genitourinary syndrome, bone health, and nonhormone therapies." },
      { num: "05", title: "Hormones & Beyond", desc: "Testosterone as the forgotten hormone in women. Cognitive and emotional changes during the menopausal transition." },
      { num: "06", title: "Thriving in Midlife", desc: "Strength, metabolism, and the non-negotiables of midlife health. How to talk to your clinician and get the care you deserve." },
    ],
  },
  {
    id: "prepared-patient",
    label: "The Prepared Patient",
    tag: "COMING SOON",
    tagColor: "rgba(239,239,239,0.35)",
    audience: "Individuals · Patients · Health-Conscious",
    price: "Coming Soon",
    stats: [{ n: "6", l: "Modules" }, { n: "Self-paced", l: "Format" }],
    href: "https://dashboard.emilydesigns.org",
    isAffiliateFree: true,
    intro: "For people who are tired of being managed. The metabolic science your doctor never had time to explain, and what you can actually do about it. Understand your labs, your diet, and your body so you can stop waiting for the healthcare system to fix what you can fix yourself. Built for health-conscious individuals, people managing a diagnosis, and anyone who has been told their labs are 'normal' while their body is telling a different story.",
    modules: [
      { num: "01", title: "How to Read Your Metabolic Labs", desc: "What the numbers actually mean and what the standard reference ranges miss." },
      { num: "02", title: "The Dietary Evidence", desc: "The dietary changes with the highest evidence for reversing metabolic disease." },
      { num: "03", title: "How the System Works", desc: "What the healthcare system is designed to do and what it is not designed to do." },
      { num: "04", title: "Talking to Your Physician", desc: "How to have a productive conversation about metabolic health with your doctor." },
      { num: "05", title: "Evaluating Medical Claims", desc: "How to identify industry-funded research and evaluate health claims critically." },
      { num: "06", title: "Your Action Plan", desc: "A practical framework for taking control of your metabolic health starting today." },
    ],
  },
  {
    id: "atp",
    label: "ATP",
    tag: "COMING SOON",
    tagColor: "rgba(239,239,239,0.35)",
    audience: "Teen Athletes · Coaches · Parents",
    price: "Coming Soon",
    stats: [{ n: "16", l: "Modules" }, { n: "10", l: "Sport Tracks" }, { n: "10", l: "Field Guides" }],
    href: "https://dashboard.emilydesigns.org",
    isAffiliateFree: true,
    intro: "Athletic Teen Performance. Most adults were never given the right information about food, fat, and performance. The guidelines were shaped by industries that profited from confusion. ATP gives teen athletes 16 modules of what they never had access to. Teenage athletes are not small adults — their metabolic needs are different. This is the course that treats them that way.",
    modules: [
      { num: "01", title: "What Is Health?", desc: "Most teens are eating, sleeping, and training in ways that work against them. This module explains why." },
      { num: "02", title: "Food as Fuel", desc: "You've been counting calories your whole life. That's the wrong metric." },
      { num: "03", title: "The Insulin Problem", desc: "Your energy crashes, belly fat, brain fog, and cravings all have the same cause." },
      { num: "04", title: "Fuel Protocol", desc: "The MetFix teen nutrition protocol: what to eat, when, and why." },
      { num: "05", title: "Stress & Cortisol", desc: "Chronic stress is making you fatter and weaker. Here's how to stop it." },
      { num: "06", title: "Movement Mastery", desc: "Pull-ups, push-ups, squats, and sprints. The MetFix progression for teen athletes." },
      { num: "07", title: "Sleep & Recovery", desc: "The science of teen sleep and why scrolling past midnight is destroying your gains." },
      { num: "08", title: "School Survival Guide", desc: "The school cafeteria is not on your side. Here's how to win anyway." },
      { num: "09", title: "The Nutrition Lies", desc: "Why you've been told carbs are fine and fat is bad, and why that's backwards." },
      { num: "10", title: "In-Season vs Off-Season", desc: "In-season and off-season training are different. Most teen athletes don't know how." },
    ],
  },
  {
    id: "medical-nutrition",
    label: "MetFix Medical Nutrition",
    tag: "COMING SOON",
    tagColor: "rgba(239,239,239,0.35)",
    audience: "MD · DO · MBBS · Medical Students",
    price: "Coming Soon",
    stats: [{ n: "40hrs", l: "CME Credit" }, { n: "7", l: "Modules" }, { n: "71", l: "HHS Competencies" }],
    href: "https://dashboard.emilydesigns.org",
    isAffiliateFree: false,
    intro: "A 40-hour CME-eligible curriculum for medical students and physicians. Aligned with all 71 HHS nutrition competency requirements. 53 medical schools have committed. The HHS mandate deadline is Fall 2026. This curriculum satisfies the 40-hour nutrition education requirement established by the U.S. Department of Health and Human Services. Individual enrollment at $750. Institutional pricing from $400 per seat.",
    modules: [
      { num: "01", title: "Introduction", desc: "An orientation to the course, the problem it addresses, and the clinical framework." },
      { num: "02", title: "The Science of Metabolic Health", desc: "A systems-biology framework for understanding insulin resistance, mitochondrial dysfunction, and metabolic disease." },
      { num: "03", title: "Clinical Assessment and Predictive Diagnostics", desc: "Standard diagnostic criteria, their limitations, and the predictive markers that identify metabolic dysfunction years before diagnosis." },
      { num: "04", title: "Disease-Specific Nutritional Protocols", desc: "Evidence-based dietary protocols for the reversal and management of type 2 diabetes, NAFLD, cardiovascular disease, and obesity." },
      { num: "05", title: "The Art of Patient Counseling", desc: "Motivational interviewing, shared decision-making, and practical counseling frameworks for dietary change." },
      { num: "06", title: "The History of Nutritional Science", desc: "A rigorous examination of how dietary guidelines were shaped by industry funding, political pressure, and methodological failures." },
      { num: "07", title: "Food Systems, Public Health, and Physician Advocacy", desc: "The upstream drivers of metabolic disease and the physician's role in systemic change." },
    ],
  },
  {
    id: "essentials-advanced",
    label: "MetFix Essentials Advanced",
    tag: "COMING SOON",
    tagColor: "rgba(239,239,239,0.35)",
    audience: "Coaches · Gym Owners · Health Professionals",
    price: "Coming Soon",
    stats: [{ n: "TBA", l: "Modules" }],
    href: "https://dashboard.emilydesigns.org",
    isAffiliateFree: true,
    intro: "The complete professional curriculum. Every mechanism, every protocol, every conversation you need to coach metabolic health at the highest level. MetFix affiliates access this course at no cost and earn revenue share when their clients enroll. Join the waitlist to be notified when enrollment opens.",
    modules: [],
  },
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.04 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function CourseCard({ course, onExpand, isExpanded }: {
  course: typeof COURSES[0]; onExpand: () => void; isExpanded: boolean;
}) {
  const isComing = course.tag === "COMING SOON";
  const detailsOnly = isComing && ["atp", "medical-nutrition", "essentials-advanced", "prepared-patient"].includes(course.id);
  const showNotify = isComing && !detailsOnly;
  return (
    <div
      id={course.id}
      style={{
        background: isExpanded ? "rgba(201,169,110,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${isExpanded ? "rgba(201,169,110,0.25)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "2px",
        transition: "border-color 0.3s, background 0.3s",
        overflow: "hidden",
      }}
    >
      {/* Card Header */}
      <div style={{ padding: "1.75rem 2rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }} className="course-card-header">
          <div style={{ flex: 1, minWidth: "min(100%, 200px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", letterSpacing: "0.12em", color: course.tagColor, textTransform: "uppercase" as const }}>{course.tag}</span>
              {course.isAffiliateFree && (
                <span style={{ fontFamily: "'DM Mono'", fontSize: "0.55rem", letterSpacing: "0.1em", color: "#C9A96E", textTransform: "uppercase" as const, padding: "0.15rem 0.5rem", border: "1px solid rgba(201,169,110,0.3)", borderRadius: "1px" }}>Included for Affiliates</span>
              )}
              {course.id === "essentials-advanced" && (
                <span style={{ fontFamily: "'DM Mono'", fontSize: "0.55rem", letterSpacing: "0.1em", color: "#EFEFEF", background: "rgba(201,169,110,0.15)", textTransform: "uppercase" as const, padding: "0.15rem 0.5rem", border: "1px solid rgba(201,169,110,0.4)", borderRadius: "1px" }}>Required for Affiliation</span>
              )}
            </div>
            <h3 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(1.2rem, 2vw, 1.5rem)", color: "#EFEFEF", fontWeight: 700, margin: "0 0 0.4rem" }}>{course.label}</h3>
            <div style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "rgba(239,239,239,0.5)", marginBottom: "1rem" }}>{course.audience}</div>
            {/* Stats row */}
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {course.stats.map((s, i) => (
                <div key={i}>
                  <span style={{ fontFamily: "'Playfair Display'", fontSize: "1.1rem", color: "#C9A96E", fontWeight: 700 }}>{s.n}</span>
                  <span style={{ fontFamily: "'DM Mono'", fontSize: "0.55rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.45)", textTransform: "uppercase" as const, marginLeft: "0.35rem" }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Right side: price + CTAs */}
          <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: "0.75rem", flexShrink: 0 }}>
            {course.price && (
              <div style={{ fontFamily: "'Playfair Display'", fontSize: "1.1rem", color: isComing ? "rgba(239,239,239,0.35)" : "#EFEFEF", fontWeight: 700 }}>{course.price}</div>
            )}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
              <button
                onClick={onExpand}
                style={{
                  fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" as const,
                  color: isExpanded ? "#C9A96E" : "rgba(239,239,239,0.65)",
                  background: "none", border: "1px solid rgba(255,255,255,0.12)", padding: "0.5rem 1rem",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem",
                  transition: "color 0.2s, border-color 0.2s",
                  borderColor: isExpanded ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.12)",
                }}
              >
                {isExpanded ? "Less" : "Details"}
                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
              {!isComing && (
                <a href={course.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" as const,
                    color: "#0A0A0A", background: "#C9A96E", border: "1px solid #C9A96E",
                    padding: "0.5rem 1rem", textDecoration: "none",
                    display: "flex", alignItems: "center", gap: "0.4rem",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  {course.id === "free-class" ? "Start Here" : course.id === "essentials-advanced" ? "Join Waitlist" : "Enroll"}
                  <ExternalLink size={11} />
                </a>
              )}
              {showNotify && (
                <a href={course.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase" as const,
                    color: "rgba(239,239,239,0.5)", background: "none", border: "1px solid rgba(255,255,255,0.15)",
                    padding: "0.5rem 1rem", textDecoration: "none",
                    display: "flex", alignItems: "center", gap: "0.4rem",
                  }}
                >
                  Notify Me <ArrowRight size={11} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Detail Panel */}
      {isExpanded && (
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "1.75rem 2rem 2rem",
          animation: "fadeIn 0.25s ease",
        }}>
          {/* Intro paragraph */}
          <p style={{ fontFamily: "'DM Sans'", fontSize: "0.92rem", color: "rgba(239,239,239,0.75)", lineHeight: 1.8, marginBottom: "1.75rem", maxWidth: "680px" }}>
            {course.intro}
          </p>

          {/* Modules */}
          {course.modules.length > 0 && (
            <div>
              <div style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(239,239,239,0.4)", textTransform: "uppercase" as const, marginBottom: "1rem" }}>
                Curriculum
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "0" }}>
                {course.modules.map((m, i) => (
                  <div key={i} style={{
                    display: "flex", gap: "0.75rem", padding: "0.75rem 1rem 0.75rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}>
                    <span style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", color: "#C9A96E", minWidth: "1.5rem", paddingTop: "0.15rem", flexShrink: 0 }}>{m.num}</span>
                    <div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: "0.85rem", color: "#EFEFEF", fontWeight: 500, marginBottom: "0.2rem" }}>{m.title}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: "0.78rem", color: "rgba(239,239,239,0.55)", lineHeight: 1.5 }}>{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div style={{ marginTop: "1.75rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            {!isComing && (
              <a href={course.href} target="_blank" rel="noopener noreferrer"
                className="btn-primary" style={{ padding: "0.875rem 2rem", fontSize: "0.78rem" }}>
                {course.id === "free-class" ? "Take the Free Class" : `Enroll in ${course.label}`}
                <ArrowRight size={14} />
              </a>
            )}
            {showNotify && (
              <a href={course.href} target="_blank" rel="noopener noreferrer"
                className="btn-outline" style={{ padding: "0.875rem 2rem", fontSize: "0.78rem" }}>
                Get Notified at Launch <ArrowRight size={14} />
              </a>
            )}
            {course.isAffiliateFree && (
              <span style={{ fontFamily: "'DM Mono'", fontSize: "0.6rem", letterSpacing: "0.1em", color: "#C9A96E", textTransform: "uppercase" as const }}>
                Included for Affiliates · Revenue Share Available
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Classes() {
  const isDesktop = useIsDesktop(900);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("free-class");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Track active section on scroll
  useEffect(() => {
    const fn = () => {
      for (const course of [...COURSES].reverse()) {
        const el = document.getElementById(course.id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(course.id); return;
        }
      }
      setActiveSection("free-class");
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
    // Also expand that card
    setExpanded(id);
  };

  const toggleExpand = (id: string) => setExpanded(expanded === id ? null : id);

  return (
    <div style={{ background: "#0A0A0A", color: "#EFEFEF", minHeight: "100vh", overflowX: "hidden", maxWidth: "100vw" }}>

      {/* ─── PAGE HEADER ─── */}
      <section style={{ paddingTop: "6rem", paddingBottom: "2.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <Reveal>
            <div className="rule"><span className="label-mono">All Courses</span></div>
            <h1 className="display-serif" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", maxWidth: "600px", marginBottom: "1rem" }}>
              The MetFix{" "}
              <span className="display-serif-italic text-gold">Curriculum</span>
            </h1>
            <p style={{ fontFamily: "'DM Sans'", fontSize: "0.95rem", color: "rgba(239,239,239,0.65)", maxWidth: "520px", lineHeight: 1.75, marginBottom: "1.25rem" }}>
              Every course is built on the same framework: metabolic science that works in the real world. Start free. Go as deep as your practice requires.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", background: "rgba(201,169,110,0.07)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "2px" }}>
              <span style={{ fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#C9A96E", textTransform: "uppercase" as const }}>
                MetFix affiliates access all specialty courses at no cost and earn revenue share when clients purchase through them.{" "}
              </span>
              <Link href="/become-an-affiliate" style={{ fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.1em", color: "#C9A96E", textDecoration: "underline" }}>
                Learn more
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── STICKY COURSE NAV ─── */}
      <div style={{ position: "sticky", top: "4.5rem", zIndex: 90 }}>
      <div style={{
        background: "rgba(10,10,10,0.97)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflowX: "auto", whiteSpace: "nowrap" as const,
        position: "relative",
      }}>
        {/* Right-side fade — signals more tabs off-screen on mobile */}
        <div className="course-tab-fade" style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: "3.5rem", zIndex: 1,
          background: "linear-gradient(to right, transparent, rgba(10,10,10,0.97))",
          pointerEvents: "none",
        }} />
        <div className="container course-tab-bar-container" style={{ display: "flex", gap: "0", padding: "0" }}>
          {COURSES.map(c => (
            <button
              key={c.id}
              onClick={() => scrollTo(c.id)}
              style={{
                fontFamily: "'DM Mono'", fontSize: "0.62rem", letterSpacing: "0.1em",
                textTransform: "uppercase" as const, whiteSpace: "nowrap" as const,
                padding: "1rem 1.25rem",
                background: "none", border: "none", cursor: "pointer",
                color: activeSection === c.id ? "#C9A96E" : "rgba(239,239,239,0.55)",
                borderBottom: activeSection === c.id ? "2px solid #C9A96E" : "2px solid transparent",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => { if (activeSection !== c.id) e.currentTarget.style.color = "rgba(239,239,239,0.85)"; }}
              onMouseLeave={e => { if (activeSection !== c.id) e.currentTarget.style.color = "rgba(239,239,239,0.55)"; }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      </div>

      {/* ─── COURSE CARDS ─── */}
      <section style={{ padding: "3rem 0 6rem" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
          {COURSES.map((course, i) => (
            <Reveal key={course.id} delay={i * 40}>
              <CourseCard
                course={course}
                isExpanded={expanded === course.id}
                onExpand={() => toggleExpand(course.id)}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── AFFILIATE CTA ─── */}
      <section style={{ padding: "5rem 0", background: "#080808", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container">
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: "4rem", alignItems: "center" }}>
              <div>
                <div className="rule"><span className="label-mono">For Affiliates</span></div>
                <h2 className="display-serif" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", marginBottom: "1rem" }}>
                  As an affiliate, you get{" "}
                  <span className="display-serif-italic text-gold">free access</span>{" "}
                  to the full curriculum.
                </h2>
                <p style={{ fontFamily: "'DM Sans'", fontSize: "0.92rem", color: "rgba(239,239,239,0.7)", lineHeight: 1.8, marginBottom: "2rem" }}>
                  MetFix affiliates get free access to all online courses, the full resource library, and special tools on the MetFix app — plus revenue sharing when clients purchase courses through your gym.
                </p>
                <Link href="/become-an-affiliate" className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "0.8rem" }}>
                  See what you get as a MetFix affiliate <ArrowRight size={14} />
                </Link>
              </div>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.875rem" }}>
                {[
                  "Access to all MetFix online courses at no cost",
                  "Complete Resource Library: live streams, journal clubs, articles, whiteboards, book reports",
                  "Special meal planning features and client tracking on the MetFix app",
                  "Revenue sharing when clients purchase courses through your gym",
                  "Affiliate listing on the MetFix gym finder map",
                  "Priority registration for Foundations Seminars",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <span style={{ color: "#C9A96E", flexShrink: 0, marginTop: "0.1rem" }}>·</span>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: "0.88rem", color: "rgba(239,239,239,0.72)", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem", paddingBottom: "2rem" }} className="footer-mobile-pad">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "1rem" }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
              <img src={assetUrl("/metfix-lockup.png")} alt="MetFix" style={{ height: "2.25rem", width: "auto", display: "block" }} />
            </Link>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" as const }}>
              <Link href="/" style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "rgba(239,239,239,0.55)", textDecoration: "none" }}>Home</Link>
              <a href="https://brokenscience.org/metfix/seminar-calendar/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "rgba(239,239,239,0.55)", textDecoration: "none" }}>Foundations Seminar</a>
              <Link href="/become-an-affiliate" style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "rgba(239,239,239,0.55)", textDecoration: "none" }}>Become an Affiliate</Link>
              <a href="https://brokenscience.org/login/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans'", fontSize: "0.8rem", color: "rgba(239,239,239,0.55)", textDecoration: "none" }}>Login</a>
            </div>
            <div style={{ fontFamily: "'DM Mono'", fontSize: "0.5rem", letterSpacing: "0.1em", color: "rgba(239,239,239,0.25)", textTransform: "uppercase" as const }}>© 2026 MetFix. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA bar */}
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
          Take the Free Class <ArrowRight size={14} />
        </a>
        <Link href="/become-an-affiliate"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0.625rem 1rem", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(239,239,239,0.7)", textDecoration: "none", fontFamily: "'DM Mono'", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          Affiliate
        </Link>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 480px) {
          .course-card-header { flex-direction: column !important; }
          .course-card-header > div:last-child { align-items: flex-start !important; }
        }
      `}</style>
    </div>
  );
}
