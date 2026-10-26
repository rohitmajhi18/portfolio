"use client";

import React from "react";
import Image from "next/image";

export const CyberFooter: React.FC = () => {
  return (
    <footer className="cyber-footer" role="contentinfo">
      <div className="section-container">
        <div className="footer-grid footer-content">
          <div className="footer-brand-col">
            <div className="footer-logo-wrap" style={{ marginBottom: "12px" }}>
              <Image
                src="/image/logo.png"
                alt="Rohit Majhi - Cybersecurity, VAPT, AI Defense"
                width={200}
                height={50}
                className="footer-logo-img"
                style={{ height: "36px", width: "auto", objectFit: "contain" }}
              />
            </div>
            <p className="footer-copy">
              Securing Networks, Cloud Infrastructure &amp; AI-Driven Defense. Offensive &amp; Defensive Cybersecurity Operations.
            </p>
          </div>

          <div className="footer-telemetry-col">
            <div className="footer-status-pill">
              <span className="pulse-dot" aria-hidden="true"></span>
              <span>OPERATOR READY FOR HIRE</span>
            </div>
            <div className="footer-copy">
              <span className="footer-badge">&copy; 2026 Rohit Majhi</span> | All Protocols &amp; Telemetry Hardened.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
