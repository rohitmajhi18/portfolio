"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Layers, FileText, Send, MapPin } from "lucide-react";
import { OPERATOR_PROFILE } from "@/data/portfolioData";

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  return (
    <section className="cyber-section hero-section" id="overview" aria-labelledby="hero-heading">
      <div className="section-container">
        <div className="hero-grid">
          {/* Hero Left Column: Technical Narrative & Clearances */}
          <motion.div
            className="hero-content-col"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Status Pill */}
            <div className="hero-status-pill">
              <div className="radar-beacon" aria-hidden="true"></div>
              <span className="hero-status-text">
                Hooghly, WB, India <span style={{ opacity: 0.4 }}>|</span>{" "}
                <span className="hero-status-target">
                  {OPERATOR_PROFILE.availability}
                </span>
              </span>
            </div>

            {/* Main Title & Headline */}
            <h1 className="hero-headline" id="hero-heading">
              Rohit Majhi
            </h1>

            <h2
              className="hero-tagline"
              style={{
                fontSize: "clamp(1.2rem, 1.8vw + 0.8rem, 1.85rem)",
                fontWeight: 700,
                marginBottom: "14px",
                lineHeight: 1.3,
              }}
            >
              Securing Networks,{" "}
              <span className="gradient-text-cyber">Cloud Infrastructure</span> &amp;{" "}
              AI-Driven Defense.
            </h2>

            <p className="hero-subheadline">
              {OPERATOR_PROFILE.summary}
            </p>

            {/* Primary Action Buttons */}
            <div className="hero-cta-group">
              <a
                href="#projects"
                className="btn-cyber-primary"
                id="cta-projects"
              >
                <Layers size={18} />
                <span>Explore Security Architectures</span>
              </a>

              <button
                type="button"
                className="btn-cyber-secondary"
                id="btn-open-resume"
                onClick={onOpenResume}
              >
                <FileText size={17} style={{ color: "var(--brand-red)" }} />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                className="btn-cyber-outline"
                id="cta-contact"
              >
                <Send size={15} style={{ color: "var(--brand-red)" }} />
                <span>Initiate Contact</span>
              </a>
            </div>

            {/* Hero Cyber HUD Telemetry Metrics Bar */}
            <div className="hero-hud-metrics" aria-label="Key Security Capabilities Overview">
              {OPERATOR_PROFILE.stats.map((stat, i) => (
                <div key={i} className="hud-stat-box">
                  <span className="hud-stat-num">{stat.num}</span>
                  <span className="hud-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Right Column: Biometric Cyber Operator Profile Card */}
          <motion.div
            className="hero-operator-card"
            aria-label="Rohit Majhi Biometric Operator Card"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            {/* Corner HUD Brackets */}
            <div className="operator-corner-bracket bracket-tl" aria-hidden="true"></div>
            <div className="operator-corner-bracket bracket-tr" aria-hidden="true"></div>
            <div className="operator-corner-bracket bracket-bl" aria-hidden="true"></div>
            <div className="operator-corner-bracket bracket-br" aria-hidden="true"></div>

            {/* Verified Emblem Badge */}
            <div
              className="operator-emblem-badge"
              title="Verified Cybersecurity Operator Badge"
              aria-label="Verified Security Operator Emblem"
            >
              <Image
                src="/image/icon.jpg"
                alt="Rohit Majhi Identity"
                width={28}
                height={28}
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Photo Frame with Laser Scanline */}
            <div className="operator-img-wrapper">
              <div className="operator-scanline" aria-hidden="true"></div>
              <Image
                src="/image/Rohit Professional Pic.jpeg"
                alt="Rohit Majhi - Cybersecurity Analyst & Penetration Tester"
                width={350}
                height={350}
                priority
                className="operator-avatar-img"
              />
            </div>

            {/* Operator Credentials Footer */}
            <div className="operator-info-footer">
              <div className="operator-id-tag">
                <span>{OPERATOR_PROFILE.operatorId}</span>
                <span style={{ color: "var(--threat-emerald)", fontWeight: 700 }}>
                  {OPERATOR_PROFILE.clearance}
                </span>
              </div>

              <div className="operator-badges">
                <span className="tech-pill accent-crimson">Ethical Hacker</span>
                <span className="tech-pill accent-red-soft">Penetration Tester</span>
                <span className="tech-pill accent-emerald">AI-IDS Engineer</span>
                <span className="tech-pill">Cloud SOC</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
