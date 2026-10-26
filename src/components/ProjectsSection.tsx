"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Play, CheckCircle2 } from "lucide-react";
import { PROJECTS_DATA, ProjectItem } from "@/data/portfolioData";

const GithubIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const ProjectsSection: React.FC = () => {
  // State for active node in NetSentinel AI (0 to 4, or -1 when idle)
  const [p1ActiveNode, setP1ActiveNode] = useState<number>(-1);
  const [p1StatusText, setP1StatusText] = useState<string>(
    "System Idle // Ready for Packet Injection"
  );
  const [p1IsSimulating, setP1IsSimulating] = useState<boolean>(false);

  // State for active node in AWS Cloud SOC
  const [p2ActiveNode, setP2ActiveNode] = useState<number>(-1);
  const [p2StatusText, setP2StatusText] = useState<string>(
    "Perimeter Active // Monitoring AWS Telemetry"
  );
  const [p2IsSimulating, setP2IsSimulating] = useState<boolean>(false);

  const simulateNetSentinel = () => {
    if (p1IsSimulating) return;
    setP1IsSimulating(true);

    const steps = [
      { node: 0, text: "Step 1/5: PCAP Telemetry Ingestion via Wireshark Stream..." },
      { node: 1, text: "Step 2/5: Normalizing Flow Features (TTL, Protocol, Byte Count)..." },
      { node: 2, text: "Step 3/5: Scikit-learn Classifier: Malicious Signature Identified!" },
      { node: 3, text: "Step 4/5: Flask REST API Broadcasting Telemetry JSON Payload..." },
      { node: 4, text: "Step 5/5: Threat Confirmed: DOS_ATTACK_BLOCK (99.4% Confidence)" },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setP1ActiveNode(step.node);
        setP1StatusText(step.text);

        if (index === steps.length - 1) {
          setTimeout(() => {
            setP1ActiveNode(-1);
            setP1StatusText("System Idle // Ready for Packet Injection");
            setP1IsSimulating(false);
          }, 3200);
        }
      }, index * 750);
    });
  };

  const simulateAwsSoc = () => {
    if (p2IsSimulating) return;
    setP2IsSimulating(true);

    const steps = [
      { node: 0, text: "Step 1/5: GuardDuty Finding Detected: Unauthorized Access Attempt..." },
      { node: 1, text: "Step 2/5: Amazon EventBridge Rule Triggered (Match Pattern #401)..." },
      { node: 2, text: "Step 3/5: Normalizer Lambda Parsing JSON Event Payload..." },
      { node: 3, text: "Step 4/5: Encrypted Audit Record Archived in Amazon S3 Incident Vault..." },
      { node: 4, text: "Step 5/5: Quarantine Lambda Executed -> EC2 Security Group Isolated!" },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setP2ActiveNode(step.node);
        setP2StatusText(step.text);

        if (index === steps.length - 1) {
          setTimeout(() => {
            setP2ActiveNode(-1);
            setP2StatusText("Perimeter Active // Monitoring AWS Telemetry");
            setP2IsSimulating(false);
          }, 3200);
        }
      }, index * 750);
    });
  };

  return (
    <section className="cyber-section" id="projects" aria-label="Flagship Security Architectures">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-label">03 // Flagship Architectures</div>
          <h2 className="section-title">Production Security Engineering</h2>
          <p className="section-subtitle">
            Battle-tested cybersecurity architectures featuring automated intrusion detection, machine learning classification, and serverless threat containment on AWS.
          </p>
        </div>

        {/* Projects Container */}
        <div className="projects-container">
          {PROJECTS_DATA.map((project: ProjectItem, index: number) => {
            const isP1 = project.id === "project-netsentinel";
            const activeNodeIndex = isP1 ? p1ActiveNode : p2ActiveNode;
            const statusText = isP1 ? p1StatusText : p2StatusText;
            const isSimulating = isP1 ? p1IsSimulating : p2IsSimulating;
            const handleSimulate = isP1 ? simulateNetSentinel : simulateAwsSoc;

            return (
              <motion.article
                key={project.id}
                className="project-feature-card"
                id={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.15 }}
              >
                {/* Project Header */}
                <div className="project-card-header">
                  <div className="project-card-meta">
                    <span className="project-id-tag">{project.tag}</span>
                    <span className="forage-verified-tag">{project.badge}</span>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="live-status-pill"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        background: "rgba(208,3,3,0.12)",
                        border: "1px solid var(--brand-red)",
                        color: "var(--brand-red-soft)",
                        textDecoration: "none",
                        boxShadow: "0 0 10px rgba(208,3,3,0.25)",
                      }}
                    >
                      <span
                        className="pulse-dot"
                        style={{
                          width: "6px",
                          height: "6px",
                          background: "var(--brand-red)",
                          boxShadow: "0 0 8px var(--brand-red)",
                        }}
                      ></span>
                      <span>{project.liveLabel}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                </div>

                <p className="project-desc">{project.description}</p>

                {/* Interactive Architecture Flow Diagram */}
                <div className="architecture-visualizer">
                  <div className="arch-header">
                    <span>{project.architectureTitle}</span>
                    <span className="arch-status">
                      <span
                        className="pulse-dot"
                        style={{
                          background: isSimulating ? "var(--threat-emerald)" : "var(--brand-red)",
                        }}
                      ></span>
                      {statusText}
                    </span>
                  </div>

                  <div className="arch-scroll-indicator" aria-hidden="true">
                    &larr; Swipe to explore pipeline flow &rarr;
                  </div>

                  <div className="pipeline-diagram">
                    <svg viewBox="0 0 740 120" xmlns="http://www.w3.org/2000/svg">
                      {/* Connection Paths */}
                      <path d="M 130 60 L 155 60" className="arch-path arch-path-active" />
                      <path d="M 280 60 L 305 60" className="arch-path arch-path-active" />
                      <path d="M 435 60 L 460 60" className="arch-path arch-path-active" />
                      <path d="M 585 60 L 610 60" className="arch-path arch-path-active" />

                      {/* Render Nodes */}
                      {project.nodes.map((node, nIdx) => {
                        const startX =
                          nIdx === 0
                            ? 10
                            : nIdx === 1
                            ? 155
                            : nIdx === 2
                            ? 305
                            : nIdx === 3
                            ? 460
                            : 610;
                        const nodeW = node.width || 120;
                        const centerX = startX + nodeW / 2;
                        const isActive = activeNodeIndex === nIdx;

                        return (
                          <g key={node.id} className="arch-node-group">
                            <rect
                              x={startX}
                              y={22}
                              width={nodeW}
                              height={76}
                              rx={8}
                              className={`arch-node ${isActive ? "arch-node-active" : ""}`}
                              style={{
                                fill: isActive
                                  ? "rgba(16, 185, 129, 0.25)"
                                  : undefined,
                                stroke: isActive
                                  ? "var(--threat-emerald)"
                                  : undefined,
                                filter: isActive
                                  ? "drop-shadow(0 0 10px #10B981)"
                                  : undefined,
                              }}
                            />
                            <text
                              x={centerX}
                              y={53}
                              textAnchor="middle"
                              className="arch-text-title"
                            >
                              {node.title}
                            </text>
                            <text
                              x={centerX}
                              y={73}
                              textAnchor="middle"
                              className="arch-text-sub"
                            >
                              {node.sub}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Architecture Interactive Controls */}
                  <div className="arch-controls">
                    <button
                      type="button"
                      className="btn-simulate-packet"
                      onClick={handleSimulate}
                      disabled={isSimulating}
                      style={{
                        cursor: isSimulating ? "not-allowed" : "pointer",
                        opacity: isSimulating ? 0.75 : 1,
                      }}
                    >
                      {isSimulating ? (
                        <CheckCircle2 size={14} style={{ color: "var(--threat-emerald)" }} />
                      ) : (
                        <Play size={14} />
                      )}
                      <span>
                        {isSimulating ? "Simulating Active Packet..." : "Simulate Flow Injection"}
                      </span>
                    </button>
                    <span style={{ fontSize: "0.74rem", fontFamily: "var(--font-mono)", color: "var(--brand-gray)" }}>
                      Interactive Threat Simulation Engine // 60 FPS Telemetry
                    </span>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="tech-tag-group" style={{ marginBottom: "24px" }}>
                  {project.techTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`tech-pill ${tag.accent ? `accent-${tag.accent}` : ""}`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* Project CTAs */}
                <div className="project-actions">
                  <a
                    href={project.primaryCta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cyber-primary"
                  >
                    <span>{project.primaryCta.label}</span>
                    <ExternalLink size={16} />
                  </a>

                  <a
                    href={project.secondaryCta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cyber-outline"
                    style={{
                      height: "52px",
                      padding: "0 22px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      borderRadius: "8px",
                      textDecoration: "none",
                    }}
                  >
                    <GithubIcon size={16} />
                    <span>View GitHub Source</span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
