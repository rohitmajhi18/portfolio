"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  Search,
  Cpu,
  Cloud,
  Crosshair,
  Key,
} from "lucide-react";
import { CAPABILITIES_DATA, CapabilityItem } from "@/data/portfolioData";

const ICON_MAP: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert size={22} />,
  Search: <Search size={22} />,
  Cpu: <Cpu size={22} />,
  Cloud: <Cloud size={22} />,
  Crosshair: <Crosshair size={22} />,
  Key: <Key size={22} />,
};

export const CapabilitiesBento: React.FC = () => {
  return (
    <section className="cyber-section" id="capabilities" aria-label="Core Capabilities">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-label">02 // Core Capabilities</div>
          <h2 className="section-title">Offensive &amp; Defensive Security Disciplines</h2>
          <p className="section-subtitle">
            Systematic penetration testing, cloud security hardening, and machine-learning threat intelligence engineered to detect, isolate, and neutralize attack vectors.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="capabilities-grid">
          {CAPABILITIES_DATA.map((item: CapabilityItem, index: number) => (
            <motion.article
              key={item.id}
              className="bento-capability-card"
              id={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              {/* Card Meta Top */}
              <div className="card-top-meta">
                <span className={`op-badge ${item.team}`}>{item.opBadge}</span>
                <div className="card-icon-wrapper" aria-hidden="true">
                  {ICON_MAP[item.icon] || <ShieldAlert size={22} />}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.description}</p>

              {/* Tech Tags */}
              <div className="tech-tag-group">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className={`tech-pill ${tag.accent ? `accent-${tag.accent}` : ""}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
