/**
 * ==========================================================================
 * ROHIT MAJHI // CYBERSECURITY PORTFOLIO
 * GPU-Accelerated Interactive Network Telemetry Canvas Background
 * Features:
 * - Dynamic Node-to-Node threat telemetry & packet routing
 * - Cursor proximity deflection & mouse physics (desktop)
 * - Touch velocity response (mobile)
 * - IntersectionObserver lifecycle pausing for optimal 60 FPS
 * - prefers-reduced-motion guardrail compliance
 * ==========================================================================
 */

(function () {
  'use strict';

  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  // Media query check for reduced motion
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) {
    canvas.style.display = 'none';
    return;
  }

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let animationFrameId = null;
  let isCanvasVisible = true;

  // Physics & Particle state
  const nodes = [];
  const packets = [];
  const maxDistance = 140;
  const maxDistanceSq = maxDistance * maxDistance;

  // Target node count based on screen width
  function getNodeCount() {
    if (window.innerWidth < 640) return 32;
    if (window.innerWidth < 1024) return 55;
    return 85;
  }

  // Pointer state
  const mouse = {
    x: -9999,
    y: -9999,
    radius: 130,
    radiusSq: 130 * 130,
    isActive: false
  };

  class Node {
    constructor(w, h) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.baseVx = (Math.random() - 0.5) * 0.45;
      this.baseVy = (Math.random() - 0.5) * 0.45;
      this.vx = this.baseVx;
      this.vy = this.baseVy;
      this.radius = Math.random() * 1.8 + 1.2;
      
      // Node roles: 0 = Standard Cyan node, 1 = Emerald SOC node, 2 = Crimson Alert node
      const rand = Math.random();
      if (rand > 0.85) {
        this.type = 'crimson';
        this.color = '#F43F5E';
      } else if (rand > 0.65) {
        this.type = 'emerald';
        this.color = '#10B981';
      } else {
        this.type = 'cyan';
        this.color = '#00F0FF';
      }
    }

    update(w, h) {
      // Mouse interaction physics
      if (mouse.isActive) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < mouse.radiusSq && distSq > 0.1) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / mouse.radius) * 1.2;
          this.vx -= (dx / dist) * force;
          this.vy -= (dy / dist) * force;
        }
      }

      // Dampen velocity back to base
      this.vx = this.vx * 0.95 + this.baseVx * 0.05;
      this.vy = this.vy * 0.95 + this.baseVy * 0.05;

      this.x += this.vx;
      this.y += this.vy;

      // Bounce boundaries
      if (this.x < 0) { this.x = 0; this.vx *= -1; }
      else if (this.x > w) { this.x = w; this.vx *= -1; }
      if (this.y < 0) { this.y = 0; this.vy *= -1; }
      else if (this.y > h) { this.y = h; this.vy *= -1; }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  class Packet {
    constructor(startNode, endNode, color) {
      this.start = startNode;
      this.end = endNode;
      this.progress = 0;
      this.speed = Math.random() * 0.015 + 0.008;
      this.color = color || '#00F0FF';
      this.size = 2.2;
    }

    update() {
      this.progress += this.speed;
      return this.progress < 1;
    }

    draw() {
      const curX = this.start.x + (this.end.x - this.start.x) * this.progress;
      const curY = this.start.y + (this.end.y - this.start.y) * this.progress;

      ctx.beginPath();
      ctx.arc(curX, curY, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    // Re-initialize nodes
    nodes.length = 0;
    const count = getNodeCount();
    for (let i = 0; i < count; i++) {
      nodes.push(new Node(width, height));
    }
  }

  window.addEventListener('resize', debounce(resize, 150));
  resize();

  // Pointer interactions
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isActive = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.isActive = false;
  });

  // Mobile Touch handling
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.isActive = true;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.isActive = false;
  });

  // Spawn threat packets periodically
  let lastPacketSpawn = 0;
  function maybeSpawnPacket(timestamp) {
    if (timestamp - lastPacketSpawn > 350 && nodes.length > 2) {
      lastPacketSpawn = timestamp;
      const startIdx = Math.floor(Math.random() * nodes.length);
      const startNode = nodes[startIdx];

      // Find nearest neighbor within range
      let nearest = null;
      let minDistSq = maxDistanceSq;

      for (let i = 0; i < nodes.length; i++) {
        if (i === startIdx) continue;
        const target = nodes[i];
        const dx = target.x - startNode.x;
        const dy = target.y - startNode.y;
        const dSq = dx * dx + dy * dy;
        if (dSq < minDistSq) {
          minDistSq = dSq;
          nearest = target;
        }
      }

      if (nearest) {
        packets.push(new Packet(startNode, nearest, startNode.color));
      }
    }
  }

  // Animation Loop
  function animate(timestamp) {
    if (!isCanvasVisible) {
      animationFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Update & draw nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update(width, height);
      nodes[i].draw();
    }

    // Connect close nodes with packet pipeline lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistanceSq) {
          const alpha = (1 - Math.sqrt(distSq) / maxDistance) * 0.28;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }

    // Packet transmission telemetry
    maybeSpawnPacket(timestamp);
    for (let i = packets.length - 1; i >= 0; i--) {
      const pkt = packets[i];
      if (pkt.update()) {
        pkt.draw();
      } else {
        packets.splice(i, 1);
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // IntersectionObserver to pause loop when offscreen
  const heroSection = document.getElementById('overview');
  if (heroSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isCanvasVisible = entry.isIntersecting;
        if (isCanvasVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.05 });

    observer.observe(heroSection);
  } else {
    animationFrameId = requestAnimationFrame(animate);
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
})();
