/**
 * ==========================================================================
 * ROHIT MAJHI // CYBERSECURITY PORTFOLIO
 * Interactive Cyber Terminal Emulator [RM-OS CLI v2.6]
 * Shortcut: Ctrl+K or / to summon
 * ==========================================================================
 */

(function () {
  'use strict';

  const modal = document.getElementById('terminal-modal');
  const termOutput = document.getElementById('term-output');
  const termInput = document.getElementById('term-input');
  const btnTrigger = document.getElementById('btn-open-terminal');
  const btnClose = document.getElementById('btn-close-terminal');

  if (!modal || !termOutput || !termInput) return;

  const COMMANDS = {
    help: `Available Security Commands:
  - <span class="brand-tag">whoami</span>       : Display operator profile and clearance
  - <span class="brand-tag">skills</span>       : List offensive & defensive toolset
  - <span class="brand-tag">projects</span>     : Inspect flagship security architectures
  - <span class="brand-tag">simulations</span>  : Review enterprise job simulations (Forage)
  - <span class="brand-tag">certs</span>        : View ISOEH, Coursera & Google credentials
  - <span class="brand-tag">contact</span>      : Transmit direct communication packet
  - <span class="brand-tag">scan</span>         : Initiate simulated vulnerability scan
  - <span class="brand-tag">clear</span>        : Wipe terminal buffer
  - <span class="brand-tag">exit</span>         : Terminate session`,

    whoami: `Operator: <span style="color:#00F0FF;font-weight:bold;">Rohit Majhi</span>
Specialization: Ethical Hacking, Penetration Testing & AI Intrusion Detection
Location: Hooghly, West Bengal, India
Status: <span style="color:#10B981;">[OPEN]</span> Available for Cybersecurity Analyst & Penetration Tester roles
Education: M.Sc. Cyber Security Forensic (Parul Univ) | B.Sc. Networking & Cyber Sec (Brainware Univ)`,

    skills: `Technical Arsenal:
  [OFFENSIVE] Kali Linux, Metasploit, Burp Suite, Nmap, OWASP Top 10, Nessus
  [DEFENSIVE] Splunk, Microsoft Sentinel, Deep Packet Wireshark, APT Breach Analysis
  [AUTOMATION] Python, Flask, Scikit-learn, Terraform (IaC), AWS GuardDuty, CloudTrail, Git, Active Directory`,

    projects: `Flagship Architectures:
  01. <span style="color:#00F0FF;">NetSentinel AI</span>: Machine learning network intrusion detection system (Flask, Scikit-learn, PCAP classification)
      Repo: https://github.com/rohitmajhi18/NetSentinel-AI
  02. <span style="color:#00F0FF;">AWS Cloud SOC</span>: Serverless threat ingestion & automated incident containment (GuardDuty, EventBridge, Lambda, Terraform)
      Repo: https://github.com/rohitmajhi18/aws-soc`,

    simulations: `Enterprise Simulations (Forage):
  - <span style="color:#10B981;">Datacom</span>: APT breach analysis & risk assessment
  - <span style="color:#10B981;">Deloitte</span>: Cyber risk management & threat analysis
  - <span style="color:#10B981;">Mastercard</span>: Phishing simulation design & campaign telemetry
  - <span style="color:#10B981;">TATA</span>: Custom IAM strategy & platform integration
  - <span style="color:#10B981;">AWS</span>: Solutions architecture & scalable cloud hosting
  - <span style="color:#10B981;">Accenture</span>: Strategic cybersecurity consulting`,

    certs: `Credentials Vault:
  - Value Added Course on Ethical Hacking (ISOEH) [Grade A+, 79/100]
  - Network Penetration Testing Level 1 (ISOEH) [Grade A+, 78/100]
  - Security Risk Management & Cryptography (Total Seminars / Coursera)
  - Foundations of Cybersecurity (Google)
  - Introduction to Cybersecurity Careers (IBM)
  - Introduction to Ethical Hacking Principles (Skill Up)`,

    contact: `Secure Communication Channels:
  Email: <a href="mailto:rohit629510@gmail.com" style="color:#00F0FF;">rohit629510@gmail.com</a>
  Phone: <a href="tel:+916295103573" style="color:#00F0FF;">+91-6295103573</a>
  LinkedIn: <a href="https://linkedin.com/in/rohit-majhi18/" target="_blank" style="color:#00F0FF;">linkedin.com/in/rohit-majhi18/</a>
  GitHub: <a href="https://github.com/rohitmajhi18" target="_blank" style="color:#00F0FF;">github.com/rohitmajhi18</a>`,

    scan: `[+] Initializing SYN Stealth Scan (Target: 127.0.0.1)...
[+] Checking Ports 22/tcp, 80/tcp, 443/tcp, 8080/tcp...
[!] Port 443/tcp OPEN (HTTPS - TLS 1.3 Strict Transport Security)
[!] Port 22/tcp FILTERED (Zero unauthorized access)
[✓] Scan Complete: 0 vulnerabilities found. Perimeter hardened.`
  };

  function openTerminal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    termInput.focus();
    if (window.CyberAudio) window.CyberAudio.playClick();
  }

  function closeTerminal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (window.CyberAudio) window.CyberAudio.playClick();
  }

  if (btnTrigger) btnTrigger.addEventListener('click', openTerminal);
  if (btnClose) btnClose.addEventListener('click', closeTerminal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeTerminal();
  });

  // Global keyboard shortcuts: Ctrl+K or /
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
      e.preventDefault();
      if (modal.classList.contains('is-open')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeTerminal();
    }
  });

  termInput.addEventListener('keydown', (e) => {
    if (window.CyberAudio) window.CyberAudio.playTerminalKey();

    if (e.key === 'Enter') {
      const rawCmd = termInput.value.trim();
      const cmd = rawCmd.toLowerCase();
      termInput.value = '';

      if (!cmd) return;

      appendOutput(`<span style="color:#94A3B8;">user@rm-sec:~$</span> ${escapeHTML(rawCmd)}`);

      if (cmd === 'clear') {
        termOutput.innerHTML = '';
        return;
      }

      if (cmd === 'exit') {
        closeTerminal();
        return;
      }

      if (COMMANDS[cmd]) {
        appendOutput(COMMANDS[cmd]);
      } else {
        appendOutput(`<span style="color:#F43F5E;">rm-sh: command not found: ${escapeHTML(cmd)}. Type <span style="color:#00F0FF;">help</span> for commands.</span>`);
        if (window.CyberAudio) window.CyberAudio.playAlert();
      }
    }
  });

  function appendOutput(html) {
    const line = document.createElement('div');
    line.style.marginBottom = '10px';
    line.style.lineHeight = '1.6';
    line.innerHTML = html;
    termOutput.appendChild(line);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
})();
