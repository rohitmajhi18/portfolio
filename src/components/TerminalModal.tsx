"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Terminal as TerminalIcon, Sparkles } from "lucide-react";
import { OPERATOR_PROFILE, PROJECTS_DATA, ARSENAL_SKILLS, SIMULATIONS_DATA, CERTIFICATIONS_DATA } from "@/data/portfolioData";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume?: () => void;
}

interface CommandLog {
  command?: string;
  output: React.ReactNode;
}

const QUICK_COMMANDS = [
  "help",
  "whoami",
  "skills",
  "projects",
  "simulations",
  "certs",
  "scan",
  "clear",
  "exit",
];

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose, onOpenResume }) => {
  const [inputVal, setInputVal] = useState<string>("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      output: (
        <div>
          <span style={{ color: "#10B981", fontWeight: 700 }}>RM-OS CYBER OPERATIONS TERMINAL [v2.6.4]</span>
          <br />
          <span>Type </span>
          <span style={{ color: "var(--brand-red)", fontWeight: 700 }}>help</span>
          <span> to view available commands, or click any command chip below.</span>
        </div>
      ),
    },
  ]);

  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  // Global key bindings: Escape closes, Ctrl+L clears
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if (e.ctrlKey && e.key.toLowerCase() === "l" && isOpen) {
        e.preventDefault();
        setHistory([]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    let outputContent: React.ReactNode = null;

    switch (lower) {
      case "help":
      case "?":
      case "commands":
        outputContent = (
          <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
            {`AVAILABLE COMMANDS:
  whoami       - Display cybersecurity operator dossier & clearance
  skills       - Show offensive & defensive operational toolset
  projects     - List production security architectures & live URLs
  simulations  - View enterprise incident response job simulations
  certs        - Inspect accredited certifications & credential vault
  scan         - Execute synthetic perimeter threat vulnerability scan
  contact      - Display direct transmission communication channels
  resume       - Open formatted Curriculum Vitae / Resume
  clear / cls  - Wipe terminal screen buffer (Ctrl+L)
  exit / quit  - Terminate interactive session (ESC)`}
          </div>
        );
        break;

      case "whoami":
        outputContent = (
          <div style={{ lineHeight: 1.6 }}>
            <div>
              OPERATOR: <strong style={{ color: "var(--brand-red)" }}>{OPERATOR_PROFILE.name}</strong>
            </div>
            <div>ROLE: Cybersecurity Analyst &amp; Penetration Tester</div>
            <div>CLEARANCE: <span style={{ color: "var(--threat-emerald)", fontWeight: 700 }}>LEVEL 4 [TOP SECRET // RED TEAM]</span></div>
            <div>BASE: {OPERATOR_PROFILE.location}</div>
            <div>
              AVAILABILITY: <span style={{ color: "var(--threat-emerald)" }}>[ACTIVE]</span> {OPERATOR_PROFILE.availability}
            </div>
            <div>
              EDUCATION: M.Sc. Cyber Security Forensic (Parul Univ) | B.Sc. Networking (Brainware Univ)
            </div>
          </div>
        );
        break;

      case "skills":
      case "tools":
      case "arsenal":
        outputContent = (
          <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
            {`OPERATIONAL ARSENAL:
  [OFFENSIVE]   Kali Linux, Metasploit, Burp Suite, Nmap, OWASP Top 10, Nessus
  [DEFENSIVE]   Splunk SIEM, Microsoft Sentinel, Deep Packet Wireshark, APT Breach Analysis
  [AUTOMATION]  Python, Flask, Scikit-learn, Terraform (IaC), AWS GuardDuty, CloudTrail, Git, Active Directory`}
          </div>
        );
        break;

      case "projects":
      case "work":
        outputContent = (
          <div style={{ lineHeight: 1.7 }}>
            <div>
              01. <strong style={{ color: "var(--brand-red)" }}>NetSentinel AI</strong> &mdash; AI-Based Network Intrusion Detection System
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&bull; Live App: <a href="https://netsentinelai.rohitmajhi.in/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyber-cyan)", textDecoration: "underline" }}>https://netsentinelai.rohitmajhi.in/</a>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&bull; GitHub: <a href="https://github.com/rohitmajhi18/NetSentinel-AI" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyber-cyan)", textDecoration: "underline" }}>github.com/rohitmajhi18/NetSentinel-AI</a>
            </div>
            <div style={{ marginTop: "8px" }}>
              02. <strong style={{ color: "var(--brand-red)" }}>AWS Cloud SOC</strong> &mdash; Cloud Intrusion Detection &amp; Automated Incident Response
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&bull; Live App: <a href="https://aws-soc.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyber-cyan)", textDecoration: "underline" }}>https://aws-soc.vercel.app/</a>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&bull; GitHub: <a href="https://github.com/rohitmajhi18/aws-soc" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyber-cyan)", textDecoration: "underline" }}>github.com/rohitmajhi18/aws-soc</a>
            </div>
          </div>
        );
        break;

      case "simulations":
      case "forage":
      case "labs":
        outputContent = (
          <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
            {`ENTERPRISE SIMULATIONS (FORAGE VERIFIED):
  [01] DATACOM          - APT Breach Analysis & Executive Risk Remediation
  [02] DELOITTE         - Cyber Incident Response & C-Level Communications
  [03] MASTERCARD       - Multi-Stage Phishing Simulation & Defense
  [04] TATA             - Enterprise IAM Architecture & RBAC Policy Audit
  [05] AWS              - Solutions Architecture & High-Availability Cloud Hosting
  [06] ACCENTURE        - Strategic Cybersecurity Consulting & Digital Defense
  [07] COMMBANK         - Cyber Defense Controls & Incident Mitigation
  [08] TELSTRA          - Telecom Security Triage & Firewall Rule Hardening
  [09] DELOITTE DATA    - Forensic Telemetry Analytics & Anomaly Pattern Extraction
  [10] DELOITTE TECH    - Cloud Resilience Testing & Infrastructure Modernization`}
          </div>
        );
        break;

      case "certs":
      case "certifications":
      case "credentials":
        outputContent = (
          <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
            {`ACCREDITED CREDENTIALS VAULT:
  - ISOEH Value Added Course On Ethical Hacking (Score: 73.00%)
  - ISOEH Industrial Training On Network Penetration Testing Level 1
  - Google / Coursera: Security Risk Management & Cryptography
  - Google / Coursera: Foundations of Cybersecurity (Grade: 94.75%)
  - IBM / Coursera: Introduction to Cybersecurity Careers (Grade: 100.00%)
  - SkillUp / Simplilearn: Introduction to Ethical Hacking Principles (Grade: 100%)
  - Salesforce: Sales & CRM Cloud Overview
  - Simplilearn: Introduction to Kali Linux
  - Simplilearn: Fundamentals of Data Structure in C
  - Simplilearn: Fundamentals of Database Systems
  - Simplilearn: Java Programming for Beginners
  - Kaggle: Verified Machine Learning Community Member`}
          </div>
        );
        break;

      case "scan":
      case "nmap":
      case "ping":
        outputContent = (
          <div style={{ color: "var(--threat-emerald)", lineHeight: 1.6 }}>
            [+] Initiating synthetic SYN stealth scan across 192.168.1.0/24...
            <br />
            [+] Probing ports 21 (FTP), 22 (SSH), 80 (HTTP), 443 (HTTPS), 3389 (RDP)...
            <br />
            [+] Packet analysis: 0 rogue listeners. Defense-in-depth perimeter active.
            <br />
            [!] Result: 100% hardened. All intrusion prevention signatures operational.
          </div>
        );
        break;

      case "contact":
      case "email":
      case "phone":
        outputContent = (
          <div style={{ lineHeight: 1.6 }}>
            <div>&bull; Email: <a href="mailto:rohit629510@gmail.com" style={{ color: "var(--cyber-cyan)" }}>rohit629510@gmail.com</a></div>
            <div>&bull; Phone: <a href="tel:+916295103573" style={{ color: "var(--cyber-cyan)" }}>+91 6295103573</a></div>
            <div>&bull; Location: Hooghly, West Bengal, India 712405</div>
            <div>&bull; LinkedIn: <a href="https://linkedin.com/in/rohit-majhi18/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyber-cyan)" }}>linkedin.com/in/rohit-majhi18/</a></div>
            <div>&bull; GitHub: <a href="https://github.com/rohitmajhi18" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyber-cyan)" }}>github.com/rohitmajhi18</a></div>
          </div>
        );
        break;

      case "resume":
      case "cv":
        if (onOpenResume) {
          onClose();
          onOpenResume();
          return;
        }
        outputContent = <div>Opening resume preview... Type &quot;exit&quot; and click &quot;Download Resume&quot; in the hero section.</div>;
        break;

      case "sudo":
        outputContent = (
          <div style={{ color: "var(--brand-red)" }}>
            [!] ACCESS DENIED: Operator Rohit Majhi has restricted root privileges. Nice try!
          </div>
        );
        break;

      case "date":
      case "time":
        outputContent = <div>{new Date().toUTCString()} // UTC SEC_OPS ACTIVE</div>;
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
      case "quit":
      case "close":
        onClose();
        return;

      default:
        outputContent = (
          <div style={{ color: "#F43F5E" }}>
            Command not recognized: &quot;{trimmed}&quot;. Type &quot;help&quot; to view valid commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output: outputContent }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < cmdHistory.length) {
          setHistoryIdx(nextIdx);
          setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else {
        setHistoryIdx(-1);
        setInputVal("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (current) {
        const match = QUICK_COMMANDS.find((c) => c.startsWith(current));
        if (match) setInputVal(match);
      }
    }
  };

  return (
    <div
      className="modal-backdrop is-open"
      id="terminal-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        zIndex: 99999,
        background: "rgba(4, 7, 13, 0.88)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div
        className="modal-content-box"
        style={{
          maxWidth: "840px",
          width: "95%",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "14px",
          border: "1px solid var(--border-cyan-bright)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(208, 3, 3, 0.25)",
          background: "rgba(10, 14, 20, 0.98)",
          overflow: "hidden",
        }}
      >
        {/* Terminal Header */}
        <div
          className="modal-header"
          style={{
            padding: "14px 18px",
            background: "rgba(16, 21, 30, 0.98)",
            borderBottom: "1px solid rgba(226, 226, 226, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            className="modal-title"
            id="terminal-modal-title"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.86rem",
              color: "#FFFFFF",
              letterSpacing: "0.04em",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                background: "rgba(208, 3, 3, 0.15)",
                border: "1px solid var(--brand-red)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TerminalIcon size={15} style={{ color: "var(--brand-red)" }} />
            </div>
            <span>RM-OS INTERACTIVE SECURITY SHELL [v2.6.4]</span>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            id="btn-close-terminal"
            onClick={onClose}
            aria-label="Close Terminal Window"
            style={{
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "6px",
              color: "#FFFFFF",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Command Chips Toolbar */}
        <div
          style={{
            padding: "8px 16px",
            background: "rgba(6, 9, 14, 0.95)",
            borderBottom: "1px solid rgba(226, 226, 226, 0.08)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--brand-gray)",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Sparkles size={11} style={{ color: "var(--brand-red)" }} />
            CHIPS:
          </span>
          {QUICK_COMMANDS.map((qCmd) => (
            <button
              key={qCmd}
              type="button"
              onClick={() => executeCommand(qCmd)}
              style={{
                background: "rgba(22, 26, 31, 0.8)",
                border: "1px solid rgba(226, 226, 226, 0.15)",
                color: "#E2E8F0",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                padding: "3px 9px",
                borderRadius: "4px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--brand-red)";
                e.currentTarget.style.color = "var(--brand-red)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(226, 226, 226, 0.15)";
                e.currentTarget.style.color = "#E2E8F0";
              }}
            >
              {qCmd}
            </button>
          ))}
        </div>

        {/* Terminal Screen Body */}
        <div
          ref={bodyRef}
          className="modal-body"
          style={{
            background: "#04070D",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "#D1D5DB",
            minHeight: "360px",
            maxHeight: "60vh",
            overflowY: "auto",
            padding: "20px",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item, idx) => (
            <div key={idx} style={{ marginBottom: "14px" }}>
              {item.command && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ color: "var(--threat-emerald)", fontWeight: 700 }}>rohit@sec-ops:~$</span>
                  <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{item.command}</span>
                </div>
              )}
              <div style={{ color: "#CBD5E1" }}>{item.output}</div>
            </div>
          ))}

          {/* Prompt Input Line */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px" }}>
            <span style={{ color: "var(--threat-emerald)", fontWeight: 700 }}>rohit@sec-ops:~$</span>
            <input
              ref={inputRef}
              type="text"
              id="term-input"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              enterKeyHint="go"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                color: "#FFFFFF",
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                outline: "none",
                caretColor: "var(--brand-red)",
              }}
              aria-label="Terminal Command Input"
              placeholder="Type command (e.g. help, whoami, scan)..."
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Terminal Status Footer */}
        <div
          style={{
            padding: "8px 18px",
            background: "rgba(10, 14, 20, 0.98)",
            borderTop: "1px solid rgba(226, 226, 226, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--brand-gray)",
          }}
        >
          <span>SESSION: SEC_OPS_ENCRYPTED</span>
          <span>TAB: AUTOCOMPLETE | &uarr;&darr;: HISTORY | CTRL+L: CLEAR</span>
        </div>
      </div>
    </div>
  );
};
