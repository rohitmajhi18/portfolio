"use client";

import React, { useState, useEffect } from "react";
import { CyberCanvas } from "@/components/CyberCanvas";
import { CyberHeader } from "@/components/CyberHeader";
import { HeroSection } from "@/components/HeroSection";
import { CapabilitiesBento } from "@/components/CapabilitiesBento";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TechnicalArsenal } from "@/components/TechnicalArsenal";
import { SimulationsSection } from "@/components/SimulationsSection";
import { CredentialsSection } from "@/components/CredentialsSection";
import { ContactSection } from "@/components/ContactSection";
import { CyberFooter } from "@/components/CyberFooter";
import { CertificateModal, CertificateModalData } from "@/components/CertificateModal";
import { ResumeModal } from "@/components/ResumeModal";
import { TerminalModal } from "@/components/TerminalModal";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [activeCert, setActiveCert] = useState<CertificateModalData | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or / launches terminal
      if ((e.ctrlKey && e.key.toLowerCase() === "k") || (e.key === "/" && !terminalOpen)) {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault();
          setTerminalOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [terminalOpen]);

  return (
    <>
      {/* Background Interactive Mesh Canvas */}
      <CyberCanvas />

      {/* Background CRT Scanline overlay (disabled in light mode via CSS) */}
      <div className="cyber-grid-scan" aria-hidden="true" />

      {/* Header Navigation Bar */}
      <CyberHeader
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Main Page Sections */}
      <main id="main-content" role="main">
        <HeroSection onOpenResume={() => setResumeOpen(true)} />
        <CapabilitiesBento />
        <ProjectsSection />
        <TechnicalArsenal />
        <SimulationsSection onOpenCertificate={(cert) => setActiveCert(cert)} />
        <CredentialsSection onOpenCertificate={(cert) => setActiveCert(cert)} />
        <ContactSection onShowToast={showToast} />
      </main>

      {/* Footer */}
      <CyberFooter />

      {/* Modal Dialogs */}
      <CertificateModal
        data={activeCert}
        onClose={() => setActiveCert(null)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className="cyber-toast"
          style={{
            transform: "translateY(0)",
            boxShadow: "0 0 25px rgba(208, 3, 3, 0.45)",
          }}
          role="status"
          aria-live="polite"
        >
          <span className="pulse-dot" style={{ background: "var(--brand-red)" }}></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
