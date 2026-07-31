# 🪐 Solar System 3D Simulator

An interactive, real-time 3D Solar System exploration web application built with a zero-dependency 3D projection engine, procedural texture synthesis, Web Audio ambient space synthesizers, and an Apple/NASA-inspired Glassmorphism 2.0 interface.

![Solar System 3D Simulator Banner](https://raw.githubusercontent.com/miruladzim/solar-system-3d-simulator/main/index.html)

---

## 🌟 Key Features

* **☀️ 11 Interactive Celestial Bodies**: Photorealistic 3D rendering for the Sun, 8 official planets (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune), Pluto, and the Asteroid Belt.
* **🪨 1,200-Asteroid Main Belt**: Real-time Keplerian orbital revolution for 1,200 rocky asteroids situated between Mars (78 AU) and Jupiter (140 AU).
* **🌍 Detailed Earth Surface**: Lush green continents (North & South America, Eurasia, Africa, Australia), snow-white polar ice caps, swirling white clouds, and deep ocean shelf gradients.
* **🪐 Saturn Rings & Gas Giant Belts**: Atmospheric storm bands on Jupiter and Saturn, complete with Jupiter's Great Red Spot and Saturn's 2D ring disc with radial transparency gradients.
* **🌌 50,000 Twinkling Background Stars**: Multi-layer cosmic stardust with independent real-time sine-wave twinkling animations and glowing nebulae clouds.
* **🎬 IMAX Cinematic Auto Tour**: Dynamic camera dolly arcs that smoothly fly by each planet with custom camera shot angles.
* **📊 High-Tech Sci-Fi HUD**:
  * **Real-time Search Bar**: Filter celestial bodies instantly as you type.
  * **Category Filter Pills**: Quick toggle between `All (11)`, `Planets (8)`, and `Sun, Belt & Dwarf (3)`.
  * **Simulation Speed Control**: Preset buttons (`1x`, `2.5x`, `5x`) and smooth slider control.
  * **Side Drawer Detail Panel**: Comprehensive astrophysical specs, atmosphere composition, moon counts, fun facts, and a side-by-side Earth scale comparison widget.
* **⚡ 100% Self-Contained Engine**: Zero external CDN or library dependencies. Loads 100% reliably offline.

---

## 📁 Repository Structure

```
solar-system-3d-simulator/
├── index.html                   # HTML5 Entry Point with HUD & Canvas Viewport
├── style.css                    # Glassmorphism 2.0 Design System & HUD Styles
├── server.mjs                   # Native Node.js Static HTTP Server (Port 8085)
├── README.md                    # Project Documentation
├── src/
│   ├── main.js                  # Main Application Bootstrap & Event Handlers
│   ├── data/
│   │   └── planetsData.js       # Astrophysical Specs, Descriptions & Orbital Data
│   ├── solarSystem/
│   │   ├── scene.js             # 3D Scene Manager, Camera Projection & Render Loop
│   │   ├── engine3d.js          # 3D Math Engine (Vector3, Matrix4, Geometry)
│   │   ├── textures.js          # 2K Procedural Canvas Texture Generators
│   │   ├── shaders.js           # Volumetric Atmosphere Glow & Sun Plasma Shaders
│   │   └── audioEngine.js       # Web Audio API Space Sound Synthesizer
│   ├── ui/
│   │   ├── hud.js               # Top Navigation Header, Search, Filter Pills & Dock
│   │   └── infoModal.js         # Side Detail Drawer Panel & Earth Scale Widget
│   └── vendor/                  # Local Standalone Vendor Libraries
```

---

## 🚀 Quick Start & Installation

### Prerequisites
* [Node.js](https://nodejs.org/) (v16+ recommended)

### Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/miruladzim/solar-system-3d-simulator.git
   cd solar-system-3d-simulator
   ```

2. **Start the Local Development Server**:
   ```bash
   node server.mjs
   ```

3. **Open in Browser**:
   Navigate to **`http://localhost:8085`** in your web browser.

---

## 🎮 Controls & Navigation

* **Left Click + Drag**: Rotate camera angle around target (Orbit Controls).
* **Scroll Wheel**: Zoom camera in and out.
* **Planet Click / Dock Select**: Focus camera on target planet and open the detailed Info Drawer.
* **Top Header Actions**:
  * **🎬 Tour**: Toggle IMAX Cinematic Flyby Tour mode.
  * **⏸️ Pause / Play**: Pause orbital physics simulation.
  * **⭕ Orbits**: Show/hide planet orbital trajectory lines.
  * **🔄 Reset View**: Center camera back to the Sun at default overview.
  * **🔊 Sound**: Enable ambient space music and interactive UI chimes.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

Developed with ❤️ for space exploration and astronomy enthusiasts.
