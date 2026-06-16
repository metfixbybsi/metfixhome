/**
 * GlobalNav — shared navigation rendered on every page via App.tsx
 * Design: fixed top bar, dark glass, gold accents
 * Colors: #0A0A0A bg | #C9A96E gold | #EFEFEF text
 * Fonts: DM Sans (links) · DM Mono (labels)
 */
import { assetUrl } from "@/const";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

const SEARCH_ITEMS = [
  { label: "What Is MetFix? Free Course", href: "https://whatis.metfix.org/", category: "Course" },
  { label: "The Daily Fix: Free Daily Content", href: "https://brokenscience.org/fix/", category: "Free" },
  { label: "All Courses", href: "/courses", category: "Specialty" },
  { label: "Resource Library", href: "https://rlhome.emilydesigns.org/", category: "Resource" },
  { label: "Foundations Seminar: In-Person", href: "/affiliate-seminars", category: "Event" },
  { label: "Become a MetFix Affiliate", href: "/become-an-affiliate", category: "Community" },
  { label: "Membership Plans", href: "https://rlhome.emilydesigns.org/membership", category: "Community" },
  { label: "Broken Science Initiative", href: "https://brokenscience.org/", category: "Research" },
];

function useIsDesktop(breakpoint = 900) {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= breakpoint : true
  );
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isDesktop;
}

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const filtered = SEARCH_ITEMS.filter(
    (s) =>
      s.label.toLowerCase().includes(q.toLowerCase()) ||
      s.category.toLowerCase().includes(q.toLowerCase())
  );
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "8rem",
      }}
      onClick={onClose}
    >
      <div
        style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", width: "min(640px, 90vw)", maxHeight: "60vh", overflow: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "center", padding: "1rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: "0.75rem" }}>
          <Search size={16} color="rgba(239,239,239,0.4)" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses, resources, events..."
            autoFocus
            style={{ flex: 1, background: "none", border: "none", outline: "none", fontFamily: "'DM Sans'", fontSize: "1rem", color: "#fdf6f6" }}
          />
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(239,239,239,0.75)", cursor: "pointer" }}>
            <X size={16} />
          </button>
        </div>
        {filtered.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            onClick={onClose}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.875rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.04)", textDecoration: "none", transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,169,110,0.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "#fdf6f6" }}>{item.label}</span>
            <span style={{ fontFamily: "'DM Mono'", fontSize: "0.7rem", letterSpacing: "0.12em", color: "#C9A96E", textTransform: "uppercase" }}>{item.category}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function GlobalNav() {
  const isDesktop = useIsDesktop(900);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: "rgba(10,10,10,0.92)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4.5rem" }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
            <img src={assetUrl("/metfix-lockup.png")} alt="MetFix" style={{ height: "2.25rem", width: "auto", display: "block" }} />
          </Link>

          {/* Desktop links */}
          <div style={{ display: isDesktop ? "flex" : "none", gap: "1.25rem", alignItems: "center", flex: 1, justifyContent: "center" }}>
            {[
              { label: "Classes", href: "/classes" },
              { label: "Library", href: "https://brokenscience.org/category/articles/" },
              { label: "Daily Fix", href: "https://brokenscience.org/fix/" },
              { label: "Seminars", href: "https://brokenscience.org/metfix/seminar-calendar/" },
              { label: "Affiliate", href: "/become-an-affiliate" },
              { label: "About", href: "/#about" },
            ].map((item) => (
              item.href.startsWith("http") ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                style={{ whiteSpace: "nowrap" }}
              >
                {item.label}
              </a>
              ) : (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                style={{ whiteSpace: "nowrap" }}
              >
                {item.label}
              </Link>
              )
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <button
              onClick={() => setSearchOpen(true)}
              style={{ background: "none", border: "none", color: "rgba(239,239,239,0.8)", cursor: "pointer", padding: "0.7rem", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(239,239,239,0.5)")}
            >
              <Search size={18} />
            </button>
            <a
              href="https://whatis.metfix.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: isDesktop ? "inline-flex" : "none", fontSize: "0.8rem", padding: "0.55rem 1.25rem", whiteSpace: "nowrap", flexShrink: 0 }}
            >
              Start Here <ArrowRight size={13} />
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ display: isDesktop ? "none" : "block", background: "none", border: "none", color: "#fdf6f6", cursor: "pointer", padding: "0.7rem" }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem" }}>
            {[
              { label: "Classes", href: "/classes" },
              { label: "Resource Library", href: "https://brokenscience.org/category/articles/" },
              { label: "The Daily Fix", href: "https://brokenscience.org/fix/" },
              { label: "Seminars", href: "https://brokenscience.org/metfix/seminar-calendar/" },
              { label: "Become an Affiliate", href: "/become-an-affiliate" },
              { label: "About", href: "/#about" },
            ].map((item) => (
              item.href.startsWith("http") ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                style={{ display: "block", padding: "0.875rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
              >
                {item.label}
              </a>
              ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{ display: "block", padding: "0.875rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontFamily: "'DM Sans'", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
              >
                {item.label}
              </Link>
              )
            ))}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              <a
                href="https://whatis.metfix.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ flex: 1, justifyContent: "center" }}
              >
                Start Here <ArrowRight size={14} />
              </a>
              <button
                onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(239,239,239,0.6)", padding: "0.625rem 1rem", cursor: "pointer" }}
              >
                <Search size={16} />
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
