/**
 * ==========================================================================
 * ROHIT MAJHI // CYBERSECURITY PORTFOLIO
 * Core Application Logic & Micro-Interactions
 * ==========================================================================
 */

(function () {
  'use strict';

  // DOM Elements
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  const toastEl = document.getElementById('cyber-toast');
  const toastText = document.getElementById('toast-text');
  const resumeModal = document.getElementById('resume-modal');
  const btnOpenResume = document.getElementById('btn-open-resume');
  const btnCloseResume = document.getElementById('btn-close-resume');
  const btnCloseDrawer = document.getElementById('btn-close-drawer');

  /* ------------------------------------------------------------------------
     01. UNIVERSAL HAMBURGER MENU & COMMAND OVERLAY DRAWER
     ------------------------------------------------------------------------ */
  function openDrawer() {
    hamburgerBtn.classList.add('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    drawerBackdrop.classList.add('is-open');
    drawerBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (window.CyberAudio) window.CyberAudio.playClick();
  }

  function closeDrawer() {
    hamburgerBtn.classList.remove('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    drawerBackdrop.classList.remove('is-open');
    drawerBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (window.CyberAudio) window.CyberAudio.playClick();
  }

  if (hamburgerBtn && drawerBackdrop) {
    hamburgerBtn.addEventListener('click', () => {
      if (drawerBackdrop.classList.contains('is-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (btnCloseDrawer) {
      btnCloseDrawer.addEventListener('click', closeDrawer);
    }

    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) {
        closeDrawer();
      }
    });

    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawerBackdrop.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  /* ------------------------------------------------------------------------
     02. AUDIO TOGGLE
     ------------------------------------------------------------------------ */
  function updateAudioIcon() {
    if (!soundIcon) return;
    const isMuted = window.CyberAudio ? window.CyberAudio.isMuted() : true;
    if (isMuted) {
      soundIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
      soundToggleBtn.setAttribute('title', 'Sound Muted (Click to enable audio feedback)');
    } else {
      soundIcon.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      `;
      soundToggleBtn.setAttribute('title', 'Audio Active (Click to mute)');
    }
  }

  if (soundToggleBtn && window.CyberAudio) {
    updateAudioIcon();
    soundToggleBtn.addEventListener('click', () => {
      window.CyberAudio.toggleMute();
      updateAudioIcon();
      showToast(window.CyberAudio.isMuted() ? 'Audio telemetry muted' : 'Audio telemetry enabled');
    });
  }

  /* ------------------------------------------------------------------------
     03. TOAST FEEDBACK NOTIFICATIONS
     ------------------------------------------------------------------------ */
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl || !toastText) return;
    toastText.textContent = message;
    toastEl.classList.add('is-active');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-active');
    }, 3200);
  }
  window.showCyberToast = showToast;

  /* ------------------------------------------------------------------------
     04. TEXT-SCRAMBLE EFFECT FOR SECTION HEADINGS
     ------------------------------------------------------------------------ */
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 20);
        const end = start + Math.floor(Math.random() * 20);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.queue[i].char = char;
          }
          output += `<span class="brand-tag">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }

  // Observe section titles to trigger scramble on scroll
  const scrambleElements = document.querySelectorAll('[data-scramble]');
  if ('IntersectionObserver' in window) {
    const scrambleObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const fx = new TextScramble(el);
            fx.setText(el.getAttribute('data-scramble') || el.innerText);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    scrambleElements.forEach((el) => scrambleObserver.observe(el));
  }

  /* ------------------------------------------------------------------------
     05. MAGNETIC BUTTON PHYSICS ON PRIMARY CTAs
     ------------------------------------------------------------------------ */
  const magneticButtons = document.querySelectorAll('.btn-cyber-primary');
  magneticButtons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ------------------------------------------------------------------------
     06. INTERACTIVE PROJECT ARCHITECTURE SIMULATORS
     ------------------------------------------------------------------------ */
  // Project 1: NetSentinel AI Simulation
  const btnSimP1 = document.getElementById('btn-sim-p1');
  const p1Nodes = document.querySelectorAll('#arch-p1 .arch-node');
  const p1Status = document.getElementById('p1-sim-status');

  if (btnSimP1) {
    btnSimP1.addEventListener('click', () => {
      btnSimP1.disabled = true;
      btnSimP1.textContent = 'Simulating Packet Stream...';
      if (window.CyberAudio) window.CyberAudio.playClick();

      let step = 0;
      const steps = [
        'Step 1: Capturing Raw PCAP Packets...',
        'Step 2: Flow Feature Extraction (Length, TTL, Protocol)...',
        'Step 3: ML Random Forest / Neural Classifier Inference...',
        'Step 4: Flask Telemetry API Normalization...',
        'Step 5: Alert Dispatched: PortScan Detected (99.4% Accuracy)!'
      ];

      const interval = setInterval(() => {
        p1Nodes.forEach((n) => n.classList.remove('arch-node-active'));
        if (p1Nodes[step]) p1Nodes[step].classList.add('arch-node-active');
        if (p1Status) p1Status.textContent = steps[step];
        if (window.CyberAudio) window.CyberAudio.playHover();

        step++;
        if (step >= steps.length) {
          clearInterval(interval);
          setTimeout(() => {
            btnSimP1.disabled = false;
            btnSimP1.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Re-run Threat Simulation
            `;
            if (window.CyberAudio) window.CyberAudio.playSuccess();
          }, 800);
        }
      }, 700);
    });
  }

  // Project 2: AWS Cloud SOC Simulation
  const btnSimP2 = document.getElementById('btn-sim-p2');
  const p2Nodes = document.querySelectorAll('#arch-p2 .arch-node');
  const p2Status = document.getElementById('p2-sim-status');

  if (btnSimP2) {
    btnSimP2.addEventListener('click', () => {
      btnSimP2.disabled = true;
      btnSimP2.textContent = 'Triggering GuardDuty Event...';
      if (window.CyberAudio) window.CyberAudio.playClick();

      let step = 0;
      const steps = [
        'Step 1: GuardDuty Flagged EC2 UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration',
        'Step 2: Amazon EventBridge Pattern Match Routed to Lambda Normalizer',
        'Step 3: Incident JSON Record Encrypted & Stored to S3 Vault',
        'Step 4: Containment Lambda Invoked: Applying Restrictive Isolation Security Group',
        'Step 5: EC2 Quarantined Successfully. Zero Outbound Lateral Movement.'
      ];

      const interval = setInterval(() => {
        p2Nodes.forEach((n) => n.classList.remove('arch-node-active'));
        if (p2Nodes[step]) p2Nodes[step].classList.add('arch-node-active');
        if (p2Status) p2Status.textContent = steps[step];
        if (window.CyberAudio) window.CyberAudio.playHover();

        step++;
        if (step >= steps.length) {
          clearInterval(interval);
          setTimeout(() => {
            btnSimP2.disabled = false;
            btnSimP2.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Trigger AWS Threat Finding
            `;
            if (window.CyberAudio) window.CyberAudio.playSuccess();
          }, 800);
        }
      }, 700);
    });
  }

  /* ------------------------------------------------------------------------
     07. TECHNICAL ARSENAL FILTERING & LIVE SEARCH
     ------------------------------------------------------------------------ */
  const tabBtns = document.querySelectorAll('.arsenal-tab-btn');
  const searchInput = document.getElementById('arsenal-search');
  const skillCards = document.querySelectorAll('.skill-card');

  let activeCategory = 'all';

  function filterSkills() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    skillCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const name = card.getAttribute('data-name').toLowerCase();

      const matchesCat = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = !query || name.includes(query);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  tabBtns.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabBtns.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      activeCategory = tab.getAttribute('data-filter');
      filterSkills();
      if (window.CyberAudio) window.CyberAudio.playClick();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterSkills();
    });
  }

  /* ------------------------------------------------------------------------
     08. COPY TO CLIPBOARD HANDLERS
     ------------------------------------------------------------------------ */
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to buffer: ${textToCopy}`);
          if (window.CyberAudio) window.CyberAudio.playSuccess();
        });
      }
    });
  });

  /* ------------------------------------------------------------------------
     09. INTERACTIVE CONTACT TERMINAL FORM
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('cyber-contact-form');
  const btnSubmitMsg = document.getElementById('btn-submit-msg');

  if (contactForm && btnSubmitMsg) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('sender-name');
      const emailInput = document.getElementById('sender-email');
      const messageInput = document.getElementById('sender-message');
      const encSelect = document.getElementById('sender-encryption');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
      const enc = encSelect ? encSelect.value : 'AES-256-GCM';

      if (!name || !email || !message) {
        showToast('Error: All communication telemetry fields required.');
        if (window.CyberAudio) window.CyberAudio.playAlert();
        return;
      }

      btnSubmitMsg.disabled = true;
      btnSubmitMsg.textContent = `Encrypting packet via ${enc}...`;
      if (window.CyberAudio) window.CyberAudio.playClick();

      setTimeout(() => {
        btnSubmitMsg.textContent = 'Transmitting securely to Rohit Majhi...';
      }, 700);

      setTimeout(() => {
        btnSubmitMsg.disabled = false;
        btnSubmitMsg.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          Transmit Encrypted Packet
        `;

        // Direct mailto backup trigger
        const mailtoLink = `mailto:rohit629510@gmail.com?subject=${encodeURIComponent(
          `[Cybersec Inquiry] From ${name}`
        )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCipher Protocol: ${enc}\n\nMessage:\n${message}`)}`;
        
        window.location.href = mailtoLink;

        showToast('Payload transmitted! Opening direct client protocol.');
        contactForm.reset();
        if (window.CyberAudio) window.CyberAudio.playSuccess();
      }, 1500);
    });
  }

  /* ------------------------------------------------------------------------
     10. RESUME MODAL & PRINT HANDLER
     ------------------------------------------------------------------------ */
  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('is-open');
      resumeModal.setAttribute('aria-hidden', 'false');
      if (window.CyberAudio) window.CyberAudio.playClick();
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('is-open');
      resumeModal.setAttribute('aria-hidden', 'true');
      if (window.CyberAudio) window.CyberAudio.playClick();
    }
  }

  if (btnOpenResume) btnOpenResume.addEventListener('click', openResume);
  if (btnCloseResume) btnCloseResume.addEventListener('click', closeResume);

  const btnPrintResume = document.getElementById('btn-print-resume');
  if (btnPrintResume) {
    btnPrintResume.addEventListener('click', () => {
      window.print();
    });
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && resumeModal.classList.contains('is-open')) {
        closeResume();
      }
    });
  }

  /* ------------------------------------------------------------------------
     12. CERTIFICATE DETAIL & PREVIEW MODAL CONTROLLER
     ------------------------------------------------------------------------ */
  const certModal = document.getElementById('cert-modal');
  const btnCloseCert = document.getElementById('btn-close-cert');
  const certModalName = document.getElementById('cert-modal-name');
  const certModalIssuer = document.getElementById('cert-modal-issuer');
  const certMetaOrg = document.getElementById('cert-meta-org');
  const certMetaStatus = document.getElementById('cert-meta-status');
  const certMetaGrade = document.getElementById('cert-meta-grade');
  const certMetaFormat = document.getElementById('cert-meta-format');
  const certMetaFileLabel = document.getElementById('cert-meta-file-label');
  const certViewport = document.getElementById('cert-viewport');
  const btnCertOpen = document.getElementById('btn-cert-open');
  const btnCertDownload = document.getElementById('btn-cert-download');
  const btnCertCopyLink = document.getElementById('btn-cert-copy-link');
  let currentCertSrc = '';

  function openCertModal(btn) {
    if (!certModal) return;

    const title = btn.getAttribute('data-cert-title') || 'Certificate Verification';
    const issuer = btn.getAttribute('data-cert-issuer') || 'Accredited Authority';
    const type = btn.getAttribute('data-cert-type') || 'pdf';
    const src = btn.getAttribute('data-cert-src') || '';
    const grade = btn.getAttribute('data-cert-grade') || 'Verified Credential';

    currentCertSrc = src;

    // Update labels and metadata
    if (certModalName) certModalName.innerHTML = title;
    if (certModalIssuer) certModalIssuer.innerHTML = issuer;
    if (certMetaOrg) certMetaOrg.innerHTML = issuer;
    if (certMetaGrade) certMetaGrade.innerHTML = grade;
    if (certMetaStatus) certMetaStatus.textContent = 'VERIFIED GENUINE // ACCREDITED';
    if (certMetaFormat) {
      certMetaFormat.textContent = type === 'image' ? 'High-Res Scan (Image)' : 'PDF Vector Document';
    }
    if (certMetaFileLabel) {
      certMetaFileLabel.textContent = decodeURIComponent(src);
    }

    // Direct Action Links
    if (btnCertOpen) {
      btnCertOpen.href = src;
    }
    if (btnCertDownload) {
      btnCertDownload.href = src;
      const cleanFileName = (title.replace(/<[^>]*>?/gm, '').replace(/[^a-zA-Z0-9_\-\s]/g, '').trim()) + (type === 'image' ? '.jpg' : '.pdf');
      btnCertDownload.setAttribute('download', cleanFileName);
    }

    // Render Preview
    if (certViewport) {
      certViewport.innerHTML = '';
      if (type === 'image') {
        const img = document.createElement('img');
        img.src = src;
        img.alt = title.replace(/<[^>]*>?/gm, '');
        img.className = 'cert-preview-img';
        img.loading = 'eager';
        certViewport.appendChild(img);
      } else {
        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.title = title.replace(/<[^>]*>?/gm, '');
        iframe.className = 'cert-preview-iframe';
        certViewport.appendChild(iframe);
      }
    }

    // Show Modal
    certModal.classList.add('is-open');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (window.CyberAudio) window.CyberAudio.playClick();
  }

  function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove('is-open');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Free resources
    if (certViewport) {
      certViewport.innerHTML = '';
    }
    if (window.CyberAudio) window.CyberAudio.playClick();
  }

  // Bind all certificate trigger buttons
  const certButtons = document.querySelectorAll('.btn-view-cert');
  certButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCertModal(btn);
    });
  });

  if (btnCloseCert) {
    btnCloseCert.addEventListener('click', closeCertModal);
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertModal();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal.classList.contains('is-open')) {
        closeCertModal();
      }
    });
  }

  if (btnCertCopyLink) {
    btnCertCopyLink.addEventListener('click', () => {
      if (!currentCertSrc) return;
      const fullUrl = window.location.origin + '/' + currentCertSrc;
      navigator.clipboard.writeText(fullUrl).then(() => {
        showToast('Document link copied to clipboard!');
        if (window.CyberAudio) window.CyberAudio.playSuccess();
      }).catch(() => {
        showToast('Relative path: ' + currentCertSrc);
      });
    });
  }

  /* ------------------------------------------------------------------------
     13. LIVE SYSTEM CLOCK (UTC / LOCAL)
     ------------------------------------------------------------------------ */
  function updateSystemClock() {
    const clockElements = document.querySelectorAll('[data-live-clock]');
    const now = new Date();
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMins = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSecs = String(now.getUTCSeconds()).padStart(2, '0');
    const timeStr = `UTC ${utcHours}:${utcMins}:${utcSecs} // SEC_OPS: ACTIVE`;

    clockElements.forEach((el) => {
      el.textContent = timeStr;
    });
  }
  setInterval(updateSystemClock, 1000);
  updateSystemClock();
})();

