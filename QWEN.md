# QWEN.md - Project Guidelines & AI Context

## 🎯 The Vision: Dynamic UX Transformation
The core objective of this site is to demonstrate the "Enterprise AI Operator" capability by transforming the entire UX/UI based on the active profile. The site must move beyond a simple color swap to a complete atmospheric and architectural shift.

### Profile 1: The Hacker (The Baseline)
- **Aesthetic**: Exactly identical to `heyhaigh.ai`.
- **Visuals**: Brutalist, high-contrast, dark slate canvas, tactile 3D elements, and "command-line" energy.
- **Implementation Details**: Refer to `/Users/rahul/Documents/rahul-portfolio/heyhaigh_analysis.md` for the specific breakdown of how the original site was constructed.

### Profile 2: The Builder
- **Aesthetic**: Same high-fidelity brutalist framework as the Hacker profile, but adapted for a "Production AI" context.
- **Setting**: A professional "Home Office" or "Lab" setting.
- **Visuals**: Business casual attire for the 3D representation, surrounded by "Builder" artifacts (monitors, hardware, technical docs).
- **Content**: Focused on the "Builder" section of the professional evidence.

### Profile 3: The Operator
|- **Aesthetic**: High-end, polished, "Operational" version of the brutalist style.
|- **Setting**: Huddle meeting room / Command center.
|- **Visuals**: Business attire, positioned with an operator and live metrics dashboard in the background.
|- **Content**: Focused on the "Operator" section of the professional evidence.

---

## 🧠 The Positioning
Rahul is an **Enterprise AI Operator**, an **Executive**, and a **Force Multiplier**. He is a **POLYMATH** who bridges the gap between raw technical power and executive strategy. The website must reflect this versatility—switching from "deep-tech" (Hacker) to "scaled implementation" (Builder) to "high-level leadership" (Executive).

---

## 🛠 Technical Stack & Guardrails
- **Framework**: Next.js (App Router).
- **3D Engine**: `@react-three/fiber`, `@react-three/drei`, and `three`.
- **Post-Processing**: `@react-three/postprocessing` (Bloom, Noise, Vignette).
- **Motion**: `framer-motion` for all layout transitions and "tactile" feel.
- **Styling**: Tailwind CSS with a focus on glassmorphism (`backdrop-blur-xl`) and absolute blacks/whites.

### 💎 High-Fidelity Render Pipeline
To achieve the "HeyHaigh" cinematic quality, the following are mandatory:
- **Lighting**: ACESFilmicToneMapping for cinematic color grading.
- **Atmospherics**: Use of Bloom for light glows, Noise for organic grain, and Vignette for focus.
- **PBR Materials**: High metalness/low roughness materials with Environment city presets for realistic reflections.
- **Composition**: Use of `ContactShadows` and a Depth-of-Field approach to separate the subject from the background.

### ⚠️ Critical Build Requirements (To avoid Vercel failures)
1. **Client Directives**: Every file using hooks (`useState`, `useEffect`, `useFrame`) MUST start with `"use client";`.
2. **Strict Typing**: Vercel's production build uses strict TypeScript. All event handlers (e.g., `(e: KeyboardEvent)`) must be explicitly typed. Avoid `any`.
3. **JSX Syntax**: Ensure all tags are properly closed. Use self-closing tags for `<br />` and avoid escaped characters (`\"`) in JSX.

### 🛡 Operational Constraints
- **Permission Policy**: Ask the user for confirmation before any serious actions (e.g., major architectural changes, deleting components, or modifying external deployment settings).
- **Stability First**: Prioritize build stability over experimental features; ensure all code is type-safe before pushing to `main`.

---

## 🚀 Deployment Pipeline
- **Workflow**: Local $\rightarrow$ GitHub $\rightarrow$ Vercel.
- **Repository**: `https://github.com/rahul-portfolio/personal_website.git`
- **Deployment**: Automatic via Vercel on push to `main`.
