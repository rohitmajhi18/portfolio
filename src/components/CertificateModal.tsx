"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink, Download, X, ShieldCheck, FileText, Image as ImageIcon } from "lucide-react";

export interface CertificateModalData {
  title: string;
  issuer: string;
  src: string;
  grade?: string;
  certType?: "pdf" | "image" | "img";
}

interface CertificateModalProps {
  data: CertificateModalData | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ data, onClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && data) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [data, onClose]);

  if (!data) return null;

  // Ensure leading slash and clean encoding
  const rawSrc = data.src.startsWith("/") ? data.src : `/${data.src}`;
  const isImage =
    data.certType === "image" ||
    data.certType === "img" ||
    /\.(jpe?g|png|webp)($|\?)/i.test(data.src);

  // File label for telemetry
  const decodedFileName = decodeURIComponent(rawSrc.split("/").pop() || "Document");

  return (
    <div
      className="modal-backdrop is-open"
      id="cert-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-name"
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
        className="modal-content-box cert-modal-box"
        style={{
          maxWidth: "920px",
          width: "95%",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          border: "1px solid var(--border-cyan-bright)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(208, 3, 3, 0.2)",
          background: "rgba(18, 22, 28, 0.98)",
          overflow: "hidden",
        }}
      >
        {/* Top Telemetry Header */}
        <div
          className="modal-header"
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(226, 226, 226, 0.12)",
            background: "rgba(12, 16, 22, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0, flex: 1 }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                background: "rgba(208, 3, 3, 0.14)",
                border: "1px solid var(--brand-red)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {isImage ? (
                <ImageIcon size={20} style={{ color: "var(--brand-red)" }} />
              ) : (
                <FileText size={20} style={{ color: "var(--brand-red)" }} />
              )}
            </div>

            <div style={{ minWidth: 0 }}>
              <div
                id="cert-modal-name"
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontFamily: "var(--font-display)",
                }}
                title={data.title}
              >
                {data.title}
              </div>
              <div
                id="cert-modal-issuer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.74rem",
                  color: "var(--threat-emerald)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "2px",
                }}
              >
                <ShieldCheck size={13} />
                <span>{data.issuer}</span>
                {data.grade && (
                  <span style={{ color: "var(--brand-gray)", opacity: 0.85 }}>
                    // {data.grade}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a
              id="btn-cert-open"
              href={rawSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber-primary"
              style={{
                height: "38px",
                padding: "0 14px",
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                borderRadius: "6px",
              }}
              title="Open full document in separate browser tab"
            >
              <ExternalLink size={14} />
              <span>Open in Tab</span>
            </a>

            <a
              id="btn-cert-download"
              href={rawSrc}
              download
              className="btn-cyber-ghost"
              style={{
                height: "38px",
                padding: "0 14px",
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                borderRadius: "6px",
                border: "1px solid rgba(226, 226, 226, 0.2)",
                background: "rgba(22, 26, 31, 0.8)",
                color: "#FFFFFF",
              }}
              title="Download credential file to device"
            >
              <Download size={14} />
              <span>Download</span>
            </a>

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close Certificate Modal"
              style={{
                width: "38px",
                height: "38px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "6px",
                color: "#FFFFFF",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: Document / Scan Viewer */}
        <div
          className="modal-body"
          style={{
            position: "relative",
            flex: 1,
            minHeight: "420px",
            maxHeight: "70vh",
            background: "#080B10",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {isImage ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "auto",
              }}
            >
              <img
                src={rawSrc}
                alt={data.title}
                onLoad={() => setIsLoading(false)}
                style={{
                  maxWidth: "100%",
                  maxHeight: "68vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                  border: "1px solid rgba(226, 226, 226, 0.15)",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
                }}
              />
            </div>
          ) : (
            <iframe
              src={`${rawSrc}#toolbar=1&navpanes=0`}
              title={data.title}
              onLoad={() => setIsLoading(false)}
              style={{
                width: "100%",
                height: "68vh",
                border: "none",
                borderRadius: "8px",
                background: "#0d1424",
              }}
            />
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(8, 11, 16, 0.8)",
                color: "var(--brand-gray)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                gap: "10px",
                pointerEvents: "none",
              }}
            >
              <div className="pulse-dot" style={{ width: "12px", height: "12px" }}></div>
              <span>Decrypting &amp; Loading Document Stream...</span>
            </div>
          )}
        </div>

        {/* Bottom Verification Telemetry Strip */}
        <div
          style={{
            padding: "10px 20px",
            background: "rgba(10, 14, 20, 0.98)",
            borderTop: "1px solid rgba(226, 226, 226, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--brand-gray)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "var(--threat-emerald)", fontWeight: 700 }}>
              VERIFIED GENUINE
            </span>
            <span style={{ opacity: 0.3 }}>|</span>
            <span style={{ color: "#D1D5DB" }}>{decodedFileName}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span>FORMAT: {isImage ? "HI-RES IMAGE SCAN" : "PDF VECTOR SPEC"}</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <a
              href={rawSrc}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--brand-red)", textDecoration: "underline" }}
            >
              Direct Link &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
