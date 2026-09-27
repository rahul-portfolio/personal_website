# Analysis of heyhaigh.ai

## Overview
`heyhaigh.ai` is a highly interactive, high-fidelity portfolio for Ryan Haigh. It functions as a "digital desk" that blends a cinematic visual experience with a sophisticated AI voice agent (RyBot).

## Visual & Structural Breakdown

### 1. The Desk (The Hero Section)
- **Concept:** An isometric "Desk of Ry" that acts as the central hub.
- **Implementation:**
  - **Cinematic Video/Stills:** Uses a layered approach with high-quality video assets. It employs a "luminance-based processing" technique to achieve perfect transparency (likely removing a specific background color to blend with the site's theme).
  - **State-Based Animations:** The character's actions (typing, stretching, answering the phone) are synchronized with the site's state (e.g., the "Chat with RyBot" button triggers the "answer phone" animation).
  - **Interactive Objects:** Desktop objects (MTA lamp, Analog card bar, Buffalo pennant) are interactive, triggering 3D previews on click.
  - **Seasonal Layers:** The site supports "Autumn Mode" and "Holiday Mode," where additive canvas layers (falling leaves, snow) are rendered over the scene.

### 2. RyBot (The AI Voice Agent)
- **Tech Stack:**
  - **Voice Engine:** Hume AI EVI (Empathic Voice Interface) for low-latency, emotive voice interaction.
  - **LLM:** Claude (Anthropic) via a Railway proxy.
  - **Memory:** A sophisticated 4-tier architecture: Session $\rightarrow$ Profile $\rightarrow$ Memory $\rightarrow$ Knowledge. It uses **Supermemory** for long-term persistence.
  - **Capability:** The bot is "agentic"—it doesn't just talk; it controls the website. It uses a "typed tool registry" (e.g., `set_theme`, `show_panel`, `open_link`) to trigger UI changes based on user intent.
  - **UI:** Includes a real-time audio-reactive equalizer and live captions.

### 3. Core Sections
- **Side Quests:** A project showcase featuring cards with "elastic pop-in" animations and "scramble text" effects on hover. High-quality moving footage previews are embedded in these cards.
- **Authored Skills:** A library of AI "skills" (e.g., `/council`, `/met`) that are downloadable and linked to long-form articles.
- **RyMetrics (The Changelog):** A "Bento-style" dashboard that integrates real-time data (GitHub commits, Apple Health steps/HRV via iOS Shortcuts $\rightarrow$ Upstash Redis).

## Tech Stack & Engineering
- **Frontend:** 
  - **Framework:** Likely Vanilla JS or a very lightweight setup (no heavy React/Next.js footprints in the script URLs).
  - **Animations:** Heavily reliant on **GSAP** (GreenSock) for the cinematic transitions and UI polish.
  - **Rendering:** HTML5 Canvas is used for the particle systems (snow/leaves) and GPU-accelerated animations.
  - **Styling:** Custom CSS with a focus on "frosted glass" surfaces and the **Geist Mono** typeface.
  - **Interactivity:** Custom carousel components and a "shared-reveal" script for scroll-triggered animations.
- **Backend/Infrastructure:**
  - **Hosting/Proxy:** Railway.
  - **Data:** Upstash Redis for real-time health metrics.
  - **Memory:** Supermemory API.
- **Performance:** Optimized with self-hosted font subsets, WebP image conversion, and a strategic loading sequence (static image $\rightarrow$ video fade-in).

## Summary of "The Magic"
The "high-end" feel comes from **synchronization**. The AI voice agent, the 3D character animations, and the UI panels are all wired to the same state machine. When you speak to the bot, the character reacts, and the UI updates simultaneously, creating a cohesive "living" environment rather than a static website.
