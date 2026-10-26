"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Printer, X, FileText } from "lucide-react";
import { OPERATOR_PROFILE, EDUCATION_DATA, CAPABILITIES_DATA } from "@/data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="modal-backdrop is-open"
      id="resume-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content-box" style={{ maxWidth: "860px" }}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title" id="resume-modal-title">
            <FileText size={18} />
            <span>CURRICULUM VITAE // ROHIT MAJHI</span>
          </div>

          <div className="modal-header-actions">
            <button
              type="button"
              className="btn-cyber-primary"
              id="btn-print-resume"
              style={{ height: "36px", padding: "0 14px", fontSize: "0.8rem" }}
              onClick={handlePrint}
            >
              <Printer size={14} />
              <span className="btn-text">Print / Save PDF</span>
            </button>

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close Resume Modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: Printable Resume */}
        <div className="modal-body" style={{ lineHeight: 1.7, padding: "28px" }}>
          <div id="printable-resume">
            {/* Header Block */}
            <div className="resume-header-block">
              <div>
                <div className="resume-logo-wrap" style={{ marginBottom: "8px" }}>
                  <Image
                    src="/image/logo.png"
                    alt="Rohit Majhi Logo"
                    width={180}
                    height={46}
                    style={{
                      height: "42px",
                      width: "auto",
                      objectFit: "contain",
                      background: "#FEFDFD",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      border: "1px solid #E2E2E2",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    color: "var(--brand-gray)",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <span>{OPERATOR_PROFILE.location}</span>
                  <span>&bull;</span>
                  <span>
                    Email:{" "}
                    <a
                      href={`mailto:${OPERATOR_PROFILE.email}`}
                      style={{ color: "var(--brand-red)" }}
                    >
                      {OPERATOR_PROFILE.email}
                    </a>
                  </span>
                  <span>&bull;</span>
                  <span>Phone: {OPERATOR_PROFILE.phone}</span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.82rem",
                    color: "var(--brand-gray)",
                    marginTop: "6px",
                  }}
                >
                  LinkedIn: linkedin.com/in/rohit-majhi18/ &bull; GitHub: github.com/rohitmajhi18
                </div>
              </div>

              <Image
                src="/image/Rohit Professional Pic.jpeg"
                alt="Rohit Majhi Security Operator"
                width={78}
                height={95}
                style={{
                  width: "78px",
                  height: "95px",
                  objectFit: "cover",
                  borderRadius: "4px",
                  border: "1px solid var(--brand-red)",
                  boxShadow: "0 0 12px rgba(208,3,3,0.3)",
                  flexShrink: 0,
                }}
              />
            </div>

            {/* Professional Summary */}
            <div style={{ marginBottom: "20px" }}>
              <h4
                style={{
                  color: "var(--brand-red)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                Professional Summary
              </h4>
              <p style={{ fontSize: "0.92rem", color: "var(--text-primary)" }}>
                Cybersecurity Analyst &amp; Penetration Tester with hands-on experience in offensive and defensive
                security operations, Vulnerability Assessment and Penetration Testing (VAPT), network defense, and
                AI-powered Intrusion Detection Systems. Proficient in Python, Kali Linux, Git, Active Directory, Cloud
                Security, and security risk assessment.
              </p>
            </div>

            {/* Education */}
            <div style={{ marginBottom: "20px" }}>
              <h4
                style={{
                  color: "var(--brand-red)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Education
              </h4>
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.id} style={{ marginBottom: "10px" }}>
                  <strong style={{ color: "var(--text-primary)" }}>{edu.degree}</strong> &mdash; {edu.institution} ({edu.period}) | {edu.score}
                </div>
              ))}
            </div>

            {/* Key Security Projects */}
            <div style={{ marginBottom: "20px" }}>
              <h4
                style={{
                  color: "var(--brand-red)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Key Security Projects
              </h4>
              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: "var(--text-primary)" }}>
                  NetSentinel AI &mdash; Network Intrusion Detection System (Jun 2026)
                </strong>
                <br />
                <span style={{ fontSize: "0.85rem", color: "var(--brand-gray)" }}>
                  Python, Scikit-learn, Flask, Wireshark &bull;{" "}
                  <a
                    href="https://netsentinelai.rohitmajhi.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--brand-red)" }}
                  >
                    netsentinelai.vercel.app
                  </a>
                </span>
                <p style={{ fontSize: "0.88rem", color: "var(--text-primary)", marginTop: "4px" }}>
                  Trained machine learning models on NSL-KDD dataset to classify network flows as normal or malicious across DoS, Probe, R2L, and U2R vectors. Built an interactive Flask web dashboard for real-time PCAP analysis.
                </p>
              </div>

              <div>
                <strong style={{ color: "var(--text-primary)" }}>
                  AWS Cloud Intrusion Detection &amp; Automated Incident Response Platform (2026)
                </strong>
                <br />
                <span style={{ fontSize: "0.85rem", color: "var(--brand-gray)" }}>
                  AWS GuardDuty, CloudTrail, EventBridge, Lambda, S3, Terraform (IaC) &bull;{" "}
                  <a
                    href="https://aws-soc.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--brand-red)" }}
                  >
                    aws-soc.vercel.app
                  </a>
                </span>
                <p style={{ fontSize: "0.88rem", color: "var(--text-primary)", marginTop: "4px" }}>
                  Engineered an event-driven AWS SOC pipeline ingesting GuardDuty findings through EventBridge into Lambda functions for automated JSON auditing in S3 and immediate EC2 security group quarantine.
                </p>
              </div>
            </div>

            {/* Core Capabilities */}
            <div style={{ marginBottom: "20px" }}>
              <h4
                style={{
                  color: "var(--brand-red)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Core Capabilities &amp; Toolset
              </h4>
              <p style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}>
                <strong>Offensive:</strong> Kali Linux, Metasploit, Burp Suite, Nmap, OWASP Top 10, Nessus Vulnerability Scanning.<br />
                <strong>Defensive &amp; SOC:</strong> Splunk, Microsoft Sentinel, Deep Packet Wireshark, APT Breach Analysis, Risk Mitigation.<br />
                <strong>Cloud &amp; Development:</strong> Python, Flask, Scikit-learn, AWS Cloud SOC, Terraform (IaC), Git, Active Directory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
