"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  pulsePhase: number;
  threatLevel: "normal" | "warning" | "critical";
  color: string;
}

interface Packet {
  start: Node;
  end: Node;
  progress: number;
  speed: number;
  color: string;
  size: number;
}

export const CyberCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000, radius: 140 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let nodes: Node[] = [];
    let packets: Packet[] = [];
    const maxConnectionDist = 145;

    const initNodes = () => {
      nodes = [];
      const nodeCount = Math.floor((width * height) / 18000);
      const count = Math.min(Math.max(nodeCount, 25), 85);

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        let threatLevel: Node["threatLevel"] = "normal";
        let color = "#D00303"; // Brand Red

        if (rand < 0.15) {
          threatLevel = "critical";
          color = "#D00303";
        } else if (rand < 0.35) {
          threatLevel = "warning";
          color = "#E15D5E"; // Soft Red
        } else {
          threatLevel = "normal";
          color = "#10B981"; // Threat Emerald
        }

        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          baseRadius: Math.random() * 1.8 + 1.2,
          radius: 2,
          pulsePhase: Math.random() * Math.PI * 2,
          threatLevel,
          color,
        });
      }
    };

    initNodes();

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Spawn packets periodically
      if (frame % 22 === 0 && nodes.length > 5) {
        const startIdx = Math.floor(Math.random() * nodes.length);
        const startNode = nodes[startIdx];
        const neighbors: Node[] = [];

        for (let j = 0; j < nodes.length; j++) {
          if (startIdx === j) continue;
          const other = nodes[j];
          const dist = Math.hypot(startNode.x - other.x, startNode.y - other.y);
          if (dist < maxConnectionDist) neighbors.push(other);
        }

        if (neighbors.length > 0) {
          const endNode = neighbors[Math.floor(Math.random() * neighbors.length)];
          packets.push({
            start: startNode,
            end: endNode,
            progress: 0,
            speed: Math.random() * 0.016 + 0.009,
            color: startNode.threatLevel === "normal" ? "#10B981" : "#D00303",
            size: 2.2,
          });
        }
      }

      // Update and draw connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectionDist) {
            const alpha = (1 - dist / maxConnectionDist) * 0.16;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(208, 3, 3, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const px = p.start.x + (p.end.x - p.start.x) * p.progress;
        const py = p.start.y + (p.end.y - p.start.y) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Mouse avoidance/attraction
        const distToMouse = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (distToMouse < mouse.radius) {
          const force = (mouse.radius - distToMouse) / mouse.radius;
          const angle = Math.atan2(n.y - mouse.y, n.x - mouse.x);
          n.x += Math.cos(angle) * force * 1.5;
          n.y += Math.sin(angle) * force * 1.5;
        }

        n.pulsePhase += 0.04;
        n.radius = n.baseRadius + Math.sin(n.pulsePhase) * 0.6;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = n.threatLevel === "critical" ? 10 : 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      id="cyber-canvas"
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};
