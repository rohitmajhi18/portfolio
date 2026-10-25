/**
 * ==========================================================================
 * ROHIT MAJHI // CYBERSECURITY PORTFOLIO
 * 3D Guide Runtime Engine — Live Browser Overlay Character (Mimi)
 * "Rigged in Blender, running live in the browser.
 *  1.5 MB, 12 animations. Drag her and she spins."
 *
 * Capabilities:
 * - Floating fixed overlay character tracking user scroll across all sections
 * - Responsive 3D drag-to-spin physics with inertia momentum
 * - Looks at cursor pointer and interacts with text characters / elements
 * - 12 Blender animation clips with smooth crossfading
 * - Contextual cyber speech bubble matching active sections
 * ==========================================================================
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

(function () {
  'use strict';

  const overlayHost = document.getElementById('mimi-overlay');
  const overlayInner = document.getElementById('mimi-overlay-inner');
  const canvas = document.getElementById('mimi-overlay-canvas');
  const poster = document.getElementById('mimi-overlay-poster');
  const bubble = document.getElementById('mimi-overlay-bubble');
  const bubbleText = document.getElementById('mimi-overlay-bubble-text');

  if (!overlayHost || !canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Three.js Scene Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(26, 1, 0.01, 10);
  camera.position.set(0, 0.11, 0.52);
  camera.lookAt(0, 0.095, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });

  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  renderer.setPixelRatio(isCoarse ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(canvas.clientWidth || 200, canvas.clientHeight || 220);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Cyber Studio Lighting
  const ambLight = new THREE.AmbientLight(0xffffff, 0.95);
  scene.add(ambLight);

  const keyLight = new THREE.DirectionalLight(0xfff6ec, 1.8);
  keyLight.position.set(-0.25, 0.85, 0.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(512, 512);
  keyLight.shadow.bias = -0.0004;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x00f0ff, 1.3);
  fillLight.position.set(0.6, 0.25, 0.4);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0x10b981, 1.1);
  rimLight.position.set(0, 0.3, -0.6);
  scene.add(rimLight);

  // Soft floor shadow
  const shadowGeo = new THREE.CircleGeometry(0.24, 32);
  const shadowMat = new THREE.ShadowMaterial({ opacity: 0.32 });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = 0.001;
  shadowMesh.receiveShadow = true;
  scene.add(shadowMesh);

  // Pivot group for drag-to-spin and parallax head tracking
  const pivot = new THREE.Group();
  pivot.position.y = 0.09;
  scene.add(pivot);

  let mixer = null;
  let currentAction = null;
  const actions = {};
  let isModelLoaded = false;

  // 12 Animations
  const animNames = ['idle', 'wave', 'hop', 'think', 'look_around', 'nod', 'point_left', 'point_right', 'ear_wiggle', 'travel', 'settle', 'blink'];

  // Contextual Dialogues by Section
  const sectionDialogues = {
    overview: [
      "👋 Hi! I'm Mimi, Rohit's 3D Cyber Sentinel!",
      "⚡ Running live in your browser — 1.5 MB & 12 animations!",
      "🌀 Drag me anywhere on screen and I'll spin!"
    ],
    capabilities: [
      "🛡️ Inspecting core penetration testing & SOC pillars!",
      "👈 Performing OWASP Top 10 web app & network audits.",
      "🔍 Real-time Wireshark packet classification."
    ],
    projects: [
      "🚀 Check out NetSentinel AI & AWS Cloud SOC platforms!",
      "👉 Flagship ML intrusion detection built with Python & Flask.",
      "☁️ Serverless AWS incident response with Lambda & Terraform."
    ],
    arsenal: [
      "🧰 Scanning security operations & technical toolsets...",
      "📡 Kali Linux, Burp Suite, Metasploit, Nmap, Splunk ready."
    ],
    simulations: [
      "💼 Reviewing Deloitte, Datacom & Mastercard job simulations!",
      "✅ APT breach analysis & enterprise IAM designs."
    ],
    credentials: [
      "📜 ISOEH Grade A+ certifications and Coursera credentials verified!",
      "🎓 M.Sc. Cyber Security Forensic & B.Sc. Advanced Networking."
    ],
    contact: [
      "📬 Opening secure encrypted communication channels!",
      "👋 Feel free to reach out to Rohit via email or LinkedIn!"
    ]
  };

  // Speech Bubble Controller
  let bubbleTimer = null;
  function say(text, duration = 3200) {
    if (!bubble || !bubbleText) return;
    clearTimeout(bubbleTimer);
    bubbleText.textContent = text;
    bubble.classList.add('is-open');
    bubble.setAttribute('aria-hidden', 'false');

    if (window.CyberAudio && !window.CyberAudio.isMuted()) {
      window.CyberAudio.playHover();
    }

    bubbleTimer = setTimeout(() => {
      bubble.classList.remove('is-open');
      bubble.setAttribute('aria-hidden', 'true');
    }, duration);
  }

  // Animation Playback Controller
  function playAnimation(name, customQuote = null) {
    if (!mixer || !actions[name]) return;

    const nextAction = actions[name];
    if (currentAction === nextAction && nextAction.isRunning()) return;

    if (currentAction && currentAction !== nextAction) {
      nextAction.reset();
      nextAction.crossFadeFrom(currentAction, 0.25, true);
      nextAction.play();
    } else {
      nextAction.reset().play();
    }

    currentAction = nextAction;

    if (customQuote) {
      say(customQuote);
    }

    if (window.CyberAudio && !window.CyberAudio.isMuted()) {
      window.CyberAudio.playClick();
    }

    if (name !== 'idle') {
      const onFinished = (e) => {
        if (e.action === nextAction) {
          mixer.removeEventListener('finished', onFinished);
          if (actions.idle) {
            actions.idle.reset();
            actions.idle.crossFadeFrom(nextAction, 0.35, true);
            actions.idle.play();
            currentAction = actions.idle;
          }
        }
      };
      mixer.addEventListener('finished', onFinished);
    }
  }

  // Load Model with GLTFLoader + MeshoptDecoder
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);

  const modelUrl = 'models/mimi.glb';
  const fallbackUrl = 'https://mauveine.tech/models/mimi.glb';

  function loadMimi(url, isFallback = false) {
    loader.load(
      url,
      (gltf) => {
        const model = gltf.scene;
        model.position.y = -0.09;
        pivot.add(model);

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material && child.material.map) {
              child.material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
            }
          }
        });

        mixer = new THREE.AnimationMixer(model);

        gltf.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          actions[clip.name] = action;
          if (clip.name !== 'idle') {
            action.loop = THREE.LoopOnce;
            action.clampWhenFinished = true;
          }
        });

        if (actions.idle) {
          actions.idle.play();
          currentAction = actions.idle;
        }

        isModelLoaded = true;

        if (poster) {
          poster.style.opacity = '0';
          setTimeout(() => { poster.style.display = 'none'; }, 500);
        }

        // Welcome greeting
        setTimeout(() => {
          say("👋 Hi! I'm Mimi, Rohit's 3D Guide. Drag me to spin!", 3800);
          playAnimation('wave');
        }, 800);

        // Natural random blinking
        setInterval(() => {
          if (actions.blink && currentAction === actions.idle && !drag.active) {
            actions.blink.reset().play();
          }
        }, 3800 + Math.random() * 3200);

        // Occasional ear wiggle
        setInterval(() => {
          if (actions.ear_wiggle && currentAction === actions.idle && !drag.active && Math.random() < 0.35) {
            playAnimation('ear_wiggle');
          }
        }, 14000);
      },
      undefined,
      (err) => {
        console.warn('Local mimi.glb failed, trying online fallback...', err);
        if (!isFallback) {
          loadMimi(fallbackUrl, true);
        }
      }
    );
  }

  loadMimi(modelUrl);

  // Drag-to-Spin Inertia Physics
  const drag = {
    active: false,
    pointerId: null,
    startX: 0,
    lastX: 0,
    targetSpin: 0,
    currentSpin: 0,
    velocity: 0,
    moved: false
  };

  overlayHost.addEventListener('pointerdown', (e) => {
    drag.active = true;
    drag.pointerId = e.pointerId;
    drag.startX = e.clientX;
    drag.lastX = e.clientX;
    drag.velocity = 0;
    drag.moved = false;
    overlayHost.classList.add('is-dragging');
    overlayHost.setPointerCapture?.(e.pointerId);

    if (window.CyberAudio && !window.CyberAudio.isMuted()) {
      window.CyberAudio.playHover();
    }
  });

  window.addEventListener('pointermove', (e) => {
    // Parallax: Mimi looks towards the cursor & characters on page
    const hostRect = overlayHost.getBoundingClientRect();
    const centerX = hostRect.left + hostRect.width / 2;
    const centerY = hostRect.top + hostRect.height / 2;

    const dxToCenter = e.clientX - centerX;
    const dyToCenter = e.clientY - centerY;

    if (!drag.active) {
      // Smooth head & body tilt toward cursor position
      const maxDist = Math.max(window.innerWidth, window.innerHeight);
      const lookYaw = Math.max(-0.45, Math.min(0.45, (dxToCenter / maxDist) * 1.5));
      const lookPitch = Math.max(-0.25, Math.min(0.25, -(dyToCenter / maxDist) * 1.5));

      pivot.rotation.x = lookPitch;
      pivot.rotation.y = drag.currentSpin + lookYaw;
      return;
    }

    const dx = e.clientX - drag.lastX;
    drag.lastX = e.clientX;
    drag.velocity = dx;

    if (Math.abs(e.clientX - drag.startX) > 4) {
      drag.moved = true;
    }

    drag.targetSpin += (dx / hostRect.width) * Math.PI * 1.6;
  });

  const onPointerUp = (e) => {
    if (drag.active && e.pointerId === drag.pointerId) {
      drag.active = false;
      overlayHost.classList.remove('is-dragging');
      overlayHost.releasePointerCapture?.(e.pointerId);

      // Add spin velocity inertia
      drag.targetSpin += (drag.velocity / 120) * Math.PI * 2.5;

      if (!drag.moved) {
        // Clicked without dragging: cycle through fun reactions!
        const reactions = ['wave', 'hop', 'nod', 'think', 'look_around'];
        const chosen = reactions[Math.floor(Math.random() * reactions.length)];
        const currentSec = getActiveSection();
        const quotes = sectionDialogues[currentSec] || sectionDialogues.overview;
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        playAnimation(chosen, quote);
      } else {
        say("🌀 Wheee! Drag me again to spin faster!", 2000);
      }
    }
  };

  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);

  // Interaction with text characters & hover elements
  const interactiveChars = document.querySelectorAll(
    'h1, h2, h3, .gradient-text-cyber, .tech-pill, .btn-cyber-primary, .btn-cyber-outline, .project-feature-card, .brand-logo-text'
  );

  let lastCharHoverTime = 0;
  interactiveChars.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      const now = performance.now();
      if (now - lastCharHoverTime < 2500 || drag.active) return;
      lastCharHoverTime = now;

      // Subtle reaction when hovering text characters
      if (Math.random() < 0.4 && actions.look_around && currentAction === actions.idle) {
        playAnimation('look_around');
      } else if (actions.nod && currentAction === actions.idle) {
        playAnimation('nod');
      }
    });
  });

  // Dynamic Waypoint Positioning as User Scrolls
  const sections = ['overview', 'capabilities', 'projects', 'arsenal', 'simulations', 'credentials', 'contact'];
  let activeSectionIndex = 0;
  let lastSectionIndex = -1;

  function getActiveSection() {
    return sections[activeSectionIndex] || 'overview';
  }

  // Desired positions on viewport [X, Y, size] across sections
  function getTargetPose() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 768;

    // Mobile: Stay docked safely at bottom right
    if (isMobile) {
      return {
        x: vw - 110,
        y: vh - 130,
        scale: 0.55
      };
    }

    // Desktop: Smoothly glide between strategic vantage points
    switch (activeSectionIndex) {
      case 0: // Overview / Hero: Float beside Rohit's operator card
        return {
          x: vw - 220,
          y: Math.min(220, vh * 0.28),
          scale: 0.95
        };
      case 1: // Capabilities: Upper right of bento grid
        return {
          x: vw - 190,
          y: 90,
          scale: 0.8
        };
      case 2: // Projects: Hover on right edge beside architecture cards
        return {
          x: vw - 190,
          y: Math.min(300, vh * 0.4),
          scale: 0.85
        };
      case 3: // Technical Arsenal: Side scout
        return {
          x: vw - 180,
          y: 110,
          scale: 0.78
        };
      case 4: // Simulations & Labs: Right companion
        return {
          x: vw - 180,
          y: Math.min(280, vh * 0.35),
          scale: 0.8
        };
      case 5: // Credentials: Side companion
        return {
          x: vw - 180,
          y: 120,
          scale: 0.8
        };
      case 6: // Contact Terminal: Lower vantage point
        return {
          x: vw - 200,
          y: vh - 240,
          scale: 0.9
        };
      default:
        return {
          x: vw - 190,
          y: vh - 220,
          scale: 0.8
        };
    }
  }

  // Position interpolation state
  let currentX = window.innerWidth - 220;
  let currentY = 160;
  let currentScale = 0.9;
  let scrollVelocity = 0;
  let lastScrollY = window.scrollY;

  function updateActiveSection() {
    const scrollMiddle = window.scrollY + window.innerHeight * 0.4;
    let foundIndex = 0;

    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollMiddle >= top && scrollMiddle < bottom) {
          foundIndex = i;
          break;
        }
      }
    }

    if (foundIndex !== activeSectionIndex) {
      activeSectionIndex = foundIndex;

      // Section change event
      if (activeSectionIndex !== lastSectionIndex && isModelLoaded) {
        lastSectionIndex = activeSectionIndex;
        const sec = getActiveSection();

        // Play section entrance animation
        if (sec === 'projects') {
          playAnimation('point_left', "👉 NetSentinel AI & AWS SOC platforms live here!");
        } else if (sec === 'capabilities') {
          playAnimation('nod', "🛡️ Explore Rohit's Core Penetration Testing capabilities!");
        } else if (sec === 'contact') {
          playAnimation('wave', "📬 Let's connect! Email or LinkedIn link below.");
        } else if (sec === 'credentials') {
          playAnimation('hop', "📜 ISOEH Grade A+ certifications verified!");
        } else if (sec === 'arsenal') {
          playAnimation('ear_wiggle', "📡 Scanning security toolsets & platforms...");
        }
      }
    }
  }

  window.addEventListener('scroll', () => {
    const dy = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
    scrollVelocity = Math.abs(dy);
    updateActiveSection();
  }, { passive: true });

  // Main Render & Motion Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    // Smooth inertia spin damping
    drag.currentSpin += (drag.targetSpin - drag.currentSpin) * 0.08;

    if (drag.active) {
      pivot.rotation.y = drag.currentSpin;
    }

    // Smooth position interpolation to target waypoint
    const target = getTargetPose();
    currentX += (target.x - currentX) * 0.08;
    currentY += (target.y - currentY) * 0.08;
    currentScale += (target.scale - currentScale) * 0.08;

    overlayHost.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) scale(${currentScale.toFixed(2)})`;

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    const w = canvas.clientWidth || 200;
    const h = canvas.clientHeight || 220;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // Global API exposure for terminal or buttons
  window.MimiGuide = {
    play: playAnimation,
    say: say,
    spin: (rad) => { drag.targetSpin += rad; },
    isReady: () => isModelLoaded
  };

})();
