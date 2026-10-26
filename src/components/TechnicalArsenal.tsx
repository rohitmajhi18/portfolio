"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { ARSENAL_SKILLS, SkillItem } from "@/data/portfolioData";

const CATEGORIES = [
  { id: "all", label: "ALL ARSENAL" },
  { id: "security-ops", label: "01 // SEC_OPS" },
  { id: "tools-platforms", label: "02 // TOOLS & PLATFORMS" },
  { id: "core-domains", label: "03 // CORE DOMAINS" },
  { id: "programming-auto", label: "04 // AUTOMATION & AI" },
];

export const TechnicalArsenal: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSkills = useMemo(() => {
    return ARSENAL_SKILLS.filter((skill: SkillItem) => {
      const matchesCategory =
        selectedCategory === "all" || skill.category === selectedCategory;
      const matchesSearch = skill.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="cyber-section" id="arsenal" aria-label="Technical Arsenal">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-label">04 // Operational Capabilities</div>
          <h2 className="section-title">Technical Arsenal &amp; Frameworks</h2>
          <p className="section-subtitle">
            Curated matrix of offensive testing tools, defensive SIEM telemetry platforms, programming languages, and cloud automation suites.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="arsenal-filter-bar" role="tablist" aria-label="Skill Categories">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === tab.id}
              className={`arsenal-tab-btn ${selectedCategory === tab.id ? "is-active" : ""}`}
              onClick={() => setSelectedCategory(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input Box */}
        <div className="arsenal-search-box">
          <Search size={18} className="arsenal-search-icon" aria-hidden="true" />
          <input
            type="text"
            className="arsenal-search-input"
            id="arsenal-search"
            placeholder="Search arsenal (e.g. Kali, Nmap, Splunk, Python, AWS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Filter Technical Arsenal"
          />
          {searchQuery && (
            <span
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "0.75rem",
                fontFamily: "var(--font-mono)",
                color: "var(--brand-gray)",
              }}
            >
              Found: {filteredSkills.length}
            </span>
          )}
        </div>

        {/* Skills Grid */}
        <div className="arsenal-grid" id="arsenal-cards-grid">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill: SkillItem) => (
              <motion.div
                key={skill.id}
                layout
                className="skill-card"
                data-category={skill.category}
                data-name={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <div className="skill-meta">
                  <span
                    className={`skill-icon-indicator ${skill.indicator}`}
                    aria-hidden="true"
                  ></span>
                  <span className="skill-name">{skill.name}</span>
                </div>
                <span className="skill-category-badge">{skill.categoryLabel}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredSkills.length === 0 && (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              color: "var(--brand-gray)",
            }}
          >
            No cybersecurity tools match &quot;{searchQuery}&quot; in this category.
          </div>
        )}
      </div>
    </section>
  );
};
