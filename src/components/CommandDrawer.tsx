"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Mail, X } from "lucide-react";

const GithubIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface CommandDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { href: "#overview", num: "01", label: "OPERATOR OVERVIEW" },
  { href: "#capabilities", num: "02", label: "CORE CAPABILITIES" },
  { href: "#projects", num: "03", label: "FLAGSHIP ARCHITECTURES" },
  { href: "#arsenal", num: "04", label: "TECHNICAL ARSENAL" },
  { href: "#experience", num: "05", label: "JOB SIMULATIONS & LABS" },
  { href: "#credentials", num: "06", label: "CREDENTIALS & VERIFICATION" },
  { href: "#contact", num: "07", label: "TRANSMISSION DISPATCH" },
];

export const CommandDrawer: React.FC<CommandDrawerProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`cyber-drawer-backdrop ${isOpen ? "is-open" : ""}`}
      id="drawer-backdrop"
      aria-hidden={!isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside
        className="cyber-drawer"
        id="cyber-drawer"
        role="dialog"
        aria-label="Cyber Navigation Drawer"
      >
        <div className="drawer-header">
          <div className="drawer-brand-logo-wrap">
            <Image
              src="/image/logo.png"
              alt="Rohit Majhi Security Architecture"
              width={200}
              height={50}
              className="drawer-logo-img"
              style={{ height: "36px", width: "auto", objectFit: "contain" }}
            />
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            id="btn-close-drawer"
            onClick={onClose}
            aria-label="Close Command Menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="drawer-nav-list" aria-label="Main Portfolio Navigation">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="drawer-nav-item">
              <a
                href={link.href}
                className="drawer-nav-link"
                onClick={onClose}
              >
                <span>
                  <span className="nav-num">{link.num} //</span>
                  {link.label}
                </span>
                <ArrowRight size={16} className="drawer-nav-arrow" />
              </a>
            </div>
          ))}
        </nav>

        {/* Real-Time Telemetry & Social Actions */}
        <div className="drawer-telemetry">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
              fontSize: "0.76rem",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span style={{ color: "var(--brand-red)", fontWeight: 700 }}>
              SYS_TELEMETRY: ACTIVE
            </span>
            <span style={{ color: "var(--threat-emerald)" }}>NODE_HEALTH: 100%</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "8px",
            }}
          >
            <a
              href="https://github.com/rohitmajhi18"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber-outline"
              style={{
                flex: 1,
                height: "38px",
                padding: "0 10px",
                fontSize: "0.78rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <GithubIcon size={14} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/rohit-majhi18/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber-outline"
              style={{
                flex: 1,
                height: "38px",
                padding: "0 10px",
                fontSize: "0.78rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <LinkedinIcon size={14} />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:rohit629510@gmail.com"
              className="btn-cyber-outline"
              style={{
                height: "38px",
                width: "38px",
                padding: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Send Direct Email"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
};
