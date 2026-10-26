"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, ArrowRight } from "lucide-react";
import {
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
  EducationItem,
  CertificationItem,
} from "@/data/portfolioData";
import { CertificateModalData } from "@/components/CertificateModal";

interface CredentialsSectionProps {
  onOpenCertificate: (cert: CertificateModalData) => void;
}

export const CredentialsSection: React.FC<CredentialsSectionProps> = ({
  onOpenCertificate,
}) => {
  return (
    <section className="cyber-section" id="credentials" aria-label="Academic & Professional Verification">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-label">06 // Academic &amp; Professional Verification</div>
          <h2 className="section-title">Credentials &amp; Certifications Vault</h2>
          <p className="section-subtitle">
            Formal postgraduate education in Cybersecurity Forensics combined with rigorous industry certifications in ethical hacking, network defense, and risk management.
          </p>
        </div>

        {/* Credentials Grid: Education + Certifications */}
        <div className="edu-cert-wrapper">
          {/* Column 1: Academic Degrees Timeline */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1rem",
                color: "var(--brand-red)",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <GraduationCap size={20} />
              <span>ACADEMIC FOUNDATION</span>
            </h3>

            <div className="academic-timeline">
              {EDUCATION_DATA.map((edu: EducationItem, idx: number) => (
                <motion.div
                  key={edu.id}
                  className="timeline-node"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div className="timeline-period">{edu.period}</div>
                  <h4 className="timeline-degree">{edu.degree}</h4>
                  <div className="timeline-institution">{edu.institution}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginTop: "6px" }}>
                    <span className="timeline-grade">{edu.score}</span>
                    {edu.hasCert && edu.certSrc && (
                      <button
                        type="button"
                        className="btn-view-cert"
                        style={{ padding: "4px 10px", fontSize: "0.72rem" }}
                        onClick={() =>
                          onOpenCertificate({
                            title: edu.certTitle || edu.degree,
                            issuer: edu.institution,
                            src: edu.certSrc!,
                            grade: edu.score,
                            certType: "pdf",
                          })
                        }
                      >
                        <span>View Degree Certificate</span>
                        <ArrowRight size={12} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Certifications Vault */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "1rem",
                color: "var(--brand-red)",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Award size={20} />
              <span>VERIFIED CERTIFICATIONS</span>
            </h3>

            <div className="certifications-grid">
              {CERTIFICATIONS_DATA.map((cert: CertificationItem, idx: number) => (
                <motion.div
                  key={cert.id}
                  className="cert-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                >
                  <div className="cert-issuer">
                    <span>{cert.issuer}</span>
                    <span>{cert.period}</span>
                  </div>

                  <h4 className="cert-title">{cert.title}</h4>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", gap: "8px" }}>
                    <span className="cert-score-badge">{cert.score}</span>
                    <button
                      type="button"
                      className="btn-view-cert"
                      onClick={() =>
                        onOpenCertificate({
                          title: cert.title,
                          issuer: cert.issuer,
                          src: cert.certSrc,
                          grade: cert.certGrade,
                          certType: cert.certType as "pdf" | "image",
                        })
                      }
                    >
                      <span>View Credential</span>
                      <ArrowRight size={12} aria-hidden="true" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
