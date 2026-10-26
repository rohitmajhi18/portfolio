"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Terminal, Sun, Moon } from "lucide-react";

interface CyberHeaderProps {
  onOpenTerminal: () => void;
}

const NAV_ITEMS = [
  { href: "#overview", label: "Overview" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#projects", label: "Projects" },
  { href: "#arsenal", label: "Arsenal" },
  { href: "#experience", label: "Simulations" },
  { href: "#credentials", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

export const CyberHeader: React.FC<CyberHeaderProps> = ({
  onOpenTerminal,
}) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("rm_theme");
    const isLight = saved === "light";
    const activeTheme = isLight ? "light" : "dark";
    setTheme(activeTheme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(activeTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(nextTheme);
    localStorage.setItem("rm_theme", nextTheme);
  };

  return (
    <header className="cyber-header" role="banner">
      <div className="header-container">
        {/* Brand Identity */}
        <a href="#" className="brand-identity" aria-label="Rohit Majhi Security Operations Portal">
          <div className="brand-icon-frame" aria-hidden="true">
            <Image
              src="/image/icon.jpg"
              alt="RM Emblem"
              width={32}
              height={32}
              className="brand-header-icon"
              priority
            />
          </div>
          <div className="brand-logo-text">
            <span className="brand-title">
              ROHIT <span className="brand-title-accent">MAJHI</span> //
            </span>
            <span className="brand-tag">SEC_OPS</span>
          </div>
          <div className="brand-status-node" aria-hidden="true">
            <span className="pulse-dot"></span>
            <span>ONLINE</span>
          </div>
        </a>

        {/* Desktop & Tablet In-Page Navigation Bar */}
        <nav className="cyber-header-nav" aria-label="Portfolio Sections">
          <ul className="header-nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="header-nav-item">
                <a href={item.href} className="header-nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Global Action HUD */}
        <div className="header-actions">
          {/* Theme Toggle Button */}
          <button
            type="button"
            className="hud-btn"
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "Light Enterprise" : "Dark Tactical"} Mode`}
            title={`Switch to ${theme === "dark" ? "Light Enterprise" : "Dark Tactical"} Mode`}
          >
            {theme === "dark" ? (
              <Sun size={16} strokeWidth={2.2} />
            ) : (
              <Moon size={16} strokeWidth={2.2} />
            )}
          </button>

          {/* Terminal Launcher */}
          <button
            type="button"
            className="hud-btn"
            id="btn-open-terminal"
            onClick={onOpenTerminal}
            aria-label="Launch Security Terminal (Press Ctrl+K or /)"
            title="Launch Terminal Emulator [Ctrl+K]"
          >
            <Terminal size={15} strokeWidth={2.2} />
            <span className="hud-btn-text">&gt;_ CLI</span>
          </button>
        </div>
      </div>
    </header>
  );
};
