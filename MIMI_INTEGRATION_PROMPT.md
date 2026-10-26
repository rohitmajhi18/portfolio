# 🤖 MIMI 3D GUIDE — INTEGRATION SPECIFICATION & PROMPT

> **Status:** Prepared for later integration per user request.  
> **Model Path:** `/public/models/mimi.glb` or `/public/models/mimi-transformed.glb` (1.5 MB optimized GLTF)  
> **Aesthetic Alignment:** Rohit Majhi Cyber Operations Brand (Key Red: `#D00303`, Soft Red: `#E15D5E`, Emerald: `#10B981`)

---

## 📋 Ready-to-Use User Prompt for Activating Mimi

When you are ready to bring Mimi back to life in this Next.js app, simply send this prompt:

```text
Please integrate Mimi, the 3D Web Companion into the Next.js portfolio application now!
Requirements:
1. Mount Mimi as a client component (<MimiCompanion />) in `src/components/MimiCompanion.tsx`.
2. Load the optimized model from `/models/mimi.glb` (or `/models/mimi-transformed.glb`) using Three.js / @react-three/fiber with GLTFLoader and MeshoptDecoder.
3. Configure Cyber Brand Red lighting:
   - Rim Light: #D00303 (Intensity 2.8)
   - Fill Light: #E15D5E (Intensity 1.4)
   - Threat Emerald Eye/Accent Glow: #10B981
4. Support interactive animations:
   - Idle breathing and subtle floating
   - 360-degree drag-to-spin physics
   - Click-to-greet animation with speech balloon dialogue ("Operator cleared! Welcome to Rohit Majhi's Cyber Command Center.")
   - Minimized badge toggle so the user can summon or hide Mimi at any time.
5. Ensure 60 FPS performance, mobile-friendly touch drag, and graceful WebGL fallback.
```

---

## 🛠️ Architecture & Technical Reference for Implementation

### 1. File Locations
- 3D Model: `public/models/mimi.glb` (1.5 MB)
- Companion Component: `src/components/MimiCompanion.tsx`
- Audio SFX: `public/audio/` (optional speech syntheses or robotic clicks)

### 2. Available Animation Clips in `mimi.glb`
- `Idle` (Default resting state)
- `Wave` (Triggered on first load or user click)
- `Salute` / `Dance` / `Jump` / `Walk` / `LookAround` (Contextual reactions when scrolling past Projects or Arsenal)

### 3. Dialogue Telemetry Matrix
```typescript
const MIMI_MESSAGES = [
  "Operator cleared: Rohit Majhi | Cybersecurity Analyst & Penetration Tester.",
  "Check out Section 03 for NetSentinel AI — 99.4% intrusion detection accuracy!",
  "AWS Cloud SOC automated incident containment deployed via Terraform IaC.",
  "Press Ctrl+K or tap the CLI button to summon Rohit's RM-OS terminal!",
  "Explore 6+ enterprise job simulations from Datacom, Deloitte, Mastercard, and AWS!"
];
```

### 4. Dependencies Needed at Integration Time
```bash
npm install three @types/three
# Or with React Three Fiber:
# npm install @react-three/fiber @react-three/drei
```
