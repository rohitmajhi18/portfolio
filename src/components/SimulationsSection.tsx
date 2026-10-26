"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SIMULATIONS_DATA, SimulationItem } from "@/data/portfolioData";
import { CertificateModalData } from "@/components/CertificateModal";

interface SimulationsSectionProps {
  onOpenCertificate: (cert: CertificateModalData) => void;
}

export const SimulationsSection: React.FC<SimulationsSectionProps> = ({
  onOpenCertificate,
}) => {
  return (
    <section className="cyber-section" id="experience" aria-label="Job Simulations">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-label">05 // Practical Experience</div>
          <h2 className="section-title">Virtual Enterprise Job Simulations</h2>
          <p className="section-subtitle">
            Hands-on cybersecurity scenario completions on the Forage platform, mirroring real-world incident handling, APT analysis, IAM engineering, and defense consulting.
          </p>
        </div>

        {/* Simulations Grid */}
        <div className="simulations-grid">
          {SIMULATIONS_DATA.map((sim: SimulationItem, index: number) => (
            <motion.article
              key={sim.id}
              className="simulation-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="sim-company-header">
                <span className="sim-company-badge">
                  <ShieldCheck size={18} style={{ color: "var(--brand-red)" }} />
                  <span>{sim.company}</span>
                </span>
                <span className="sim-date">{sim.date}</span>
              </div>

              <h3 className="sim-role-title">{sim.title}</h3>
              <p className="sim-desc">{sim.description}</p>

              <div className="tech-tag-group" style={{ marginBottom: "16px" }}>
                {sim.techTags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className={`tech-pill ${tag.accent ? `accent-${tag.accent}` : ""}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              <button
                type="button"
                className="btn-view-cert"
                onClick={() =>
                  onOpenCertificate({
                    title: sim.certTitle,
                    issuer: sim.certIssuer,
                    src: sim.certSrc,
                    grade: sim.certGrade,
                    certType: sim.certType as "pdf" | "image",
                  })
                }
              >
                <span>View Certificate Document</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
