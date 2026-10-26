"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, Copy, Mail, Phone, MapPin } from "lucide-react";
import { DIRECT_CHANNELS } from "@/data/portfolioData";

interface ContactSectionProps {
  onShowToast: (message: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    subject: "Cybersecurity Analyst / Penetration Testing Role Inquiry",
    message: "",
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sentSuccess, setSentSuccess] = useState<boolean>(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    onShowToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderName || !formData.senderEmail || !formData.message) {
      onShowToast("Please fill in all required transmission fields.");
      return;
    }

    setIsSending(true);
    // Simulate transmission dispatch
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      onShowToast("Encrypted transmission dispatched successfully to Rohit Majhi!");
      setFormData({
        senderName: "",
        senderEmail: "",
        subject: "Cybersecurity Analyst / Penetration Testing Role Inquiry",
        message: "",
      });
      setTimeout(() => setSentSuccess(false), 5000);
    }, 1200);
  };

  return (
    <section className="cyber-section" id="contact" aria-label="Contact Transmission Dispatch">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-label">07 // Transmission Protocol</div>
          <h2 className="section-title">Initiate Encrypted Transmission</h2>
          <p className="section-subtitle">
            Available for full-time opportunities, security assessments, and cybersecurity consultations. Transmit a direct message or connect via verified channels below.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="contact-wrapper">
          {/* Column 1: Terminal Dispatch Box */}
          <motion.div
            className="terminal-contact-box"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="terminal-top-bar">
              <div className="terminal-dots">
                <span className="terminal-dot dot-red"></span>
                <span className="terminal-dot dot-yellow"></span>
                <span className="terminal-dot dot-green"></span>
              </div>
              <div className="terminal-title">ENCRYPTED_DISPATCH // RM_GATEWAY_v2.6</div>
            </div>

            <form className="terminal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">
                  <span>OPERATOR_NAME //</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  className="form-input"
                  required
                  placeholder="e.g. Hiring Manager / Security Lead"
                  value={formData.senderName}
                  onChange={(e) =>
                    setFormData({ ...formData, senderName: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">
                  <span>RETURN_PACKET_ADDR (EMAIL) //</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  className="form-input"
                  required
                  placeholder="name@organization.com"
                  value={formData.senderEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, senderEmail: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">
                  <span>DISPATCH_HEADER //</span>
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  className="form-input"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">
                  <span>TRANSMISSION_PAYLOAD //</span>
                </label>
                <textarea
                  id="contact-message"
                  className="form-textarea"
                  rows={4}
                  required
                  placeholder="Specify role description, team context, or security scope..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-cyber-primary"
                style={{ width: "100%", marginTop: "8px" }}
                disabled={isSending}
              >
                {isSending ? (
                  <span>Encrypting &amp; Dispatching...</span>
                ) : sentSuccess ? (
                  <>
                    <Check size={18} />
                    <span>Transmission Acknowledged!</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Transmit Encrypted Packet</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Column 2: Direct Channels */}
          <motion.div
            className="direct-channels"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {DIRECT_CHANNELS.map((ch, idx) => (
              <div key={idx} className="channel-card">
                <div className="channel-info">
                  <div className="channel-icon" aria-hidden="true">
                    {ch.icon === "Mail" && <Mail size={18} />}
                    {ch.icon === "Phone" && <Phone size={18} />}
                    {ch.icon === "MapPin" && <MapPin size={18} />}
                  </div>
                  <div>
                    <div className="channel-label">{ch.label}</div>
                    {ch.href ? (
                      <a
                        href={ch.href}
                        className="channel-val"
                        style={{ textDecoration: "none" }}
                      >
                        {ch.value}
                      </a>
                    ) : (
                      <div className="channel-val">{ch.value}</div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-copy-channel"
                  onClick={() => handleCopy(ch.copyValue, ch.label)}
                  aria-label={`Copy ${ch.label}`}
                >
                  {copiedKey === ch.copyValue ? (
                    <span style={{ color: "var(--threat-emerald)", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Check size={12} /> Copied
                    </span>
                  ) : (
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Copy size={12} /> Copy
                    </span>
                  )}
                </button>
              </div>
            ))}

            {/* Quick Response Notice */}
            <div
              style={{
                marginTop: "16px",
                padding: "16px",
                borderRadius: "10px",
                background: "rgba(208, 3, 3, 0.05)",
                border: "1px solid rgba(208, 3, 3, 0.2)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--brand-gray)",
                lineHeight: 1.6,
              }}
            >
              <div style={{ color: "var(--brand-red)", fontWeight: 700, marginBottom: "4px" }}>
                // TELEMETRY NOTICE:
              </div>
              Direct inquiries typically receive response within 12–24 business hours. Ready for on-site or remote cybersecurity deployments.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
