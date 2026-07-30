import { SOLAR_SYSTEM_DATA, PLANETS_ORDER } from '../data/planetsData.js';
import { createProceduralTextures } from './textures.js';
import { audioEngine } from './audioEngine.js';

export class SolarSystemScene {
  constructor(containerEl, onPlanetSelectCallback, onHoverCallback) {
    this.container = containerEl;
    this.onSelect = onPlanetSelectCallback;
    this.onHover = onHoverCallback;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);

    this.selectedPlanetId = null;
    this.hoveredPlanetId = null;

    // Camera 3D Position
    this.cam = {
      x: 0,
      y: 110,
      z: 240,
      targetX: 0,
      targetY: 0,
      targetZ: 0,
      fov: 45
    };

    // Orbit Mouse Controls State
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.cameraAngles = { theta: Math.PI / 2, phi: 0.4, distance: 260 };

    // Simulation State
    this.timeSpeed = 1.0;
    this.isPaused = false;
    this.isFollowMode = false;
    this.showOrbitLines = true;
    this.isCinematicTour = false;
    this.tourIndex = 0;
    this.tourTimer = 0;
    this.startTime = Date.now();

    // Planets Orbital Angles & Data
    this.planetStates = {};
    this.textures = {};
    this.stars = [];

    // Camera Animation State
    this.camAnim = {
      isAnimating: false,
      startCam: { x: 0, y: 0, z: 0 },
      targetCam: { x: 0, y: 0, z: 0 },
      startTarget: { x: 0, y: 0, z: 0 },
      targetTarget: { x: 0, y: 0, z: 0 },
      progress: 0,
      duration: 1.2
    };

    this.init();
  }

  init() {
    this.resizeCanvas();
    this.textures = createProceduralTextures();

    // Initialize Planet Angles
    PLANETS_ORDER.forEach((id) => {
      const data = SOLAR_SYSTEM_DATA[id];
      const initialAngle = Math.random() * Math.PI * 2;
      this.planetStates[id] = {
        id: id,
        data: data,
        angle: initialAngle,
        x: id === 'sun' ? 0 : Math.cos(initialAngle) * data.orbitRadius,
        y: 0,
        z: id === 'sun' ? 0 : Math.sin(initialAngle) * data.orbitRadius,
        rotation: 0
      };
    });

    // Initialize 2,500 Starfield Particles
    for (let i = 0; i < 2500; i++) {
      this.stars.push({
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.5) * 3000,
        z: (Math.random() - 0.5) * 3000,
        size: Math.random() * 1.8 + 0.5,
        color: Math.random() > 0.7 ? '#9bc0ff' : (Math.random() > 0.5 ? '#ffddaa' : '#ffffff'),
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 1.5 + 0.5
      });
    }

    // Initialize 1,200 Asteroid Belt Particles (Orbiting between Mars and Jupiter at radius 92..118)
    this.asteroids = [];
    const asteroidColors = ['#8a817c', '#bcb8b1', '#706660', '#a39b8b', '#d6ccc2'];
    for (let i = 0; i < 1200; i++) {
      const radius = 92 + Math.random() * 26;
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.015 + Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : 1.1);
      this.asteroids.push({
        radius: radius,
        angle: angle,
        y: (Math.random() - 0.5) * 8.5,
        speed: speed,
        size: Math.random() * 1.5 + 0.8,
        color: asteroidColors[Math.floor(Math.random() * asteroidColors.length)]
      });
    }

    this.bindEvents();
    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resizeCanvas());

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const deltaX = e.clientX - this.previousMousePosition.x;
        const deltaY = e.clientY - this.previousMousePosition.y;

        this.cameraAngles.theta -= deltaX * 0.005;
        this.cameraAngles.phi = Math.max(-1.4, Math.min(1.4, this.cameraAngles.phi + deltaY * 0.005));

        this.previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        this.checkHover(e);
      }
    });

    this.canvas.addEventListener('wheel', (e) => {
      this.cameraAngles.distance = Math.max(15, Math.min(650, this.cameraAngles.distance + e.deltaY * 0.25));
    });

    this.canvas.addEventListener('click', (e) => {
      if (Math.abs(e.clientX - this.previousMousePosition.x) < 5 &&
          Math.abs(e.clientY - this.previousMousePosition.y) < 5) {
        this.checkClick(e);
      }
    });
  }

  updateCameraPosition() {
    if (this.camAnim.isAnimating) {
      this.camAnim.progress += 0.025;
      if (this.camAnim.progress >= 1) {
        this.camAnim.progress = 1;
        this.camAnim.isAnimating = false;
      }
      const t = 1 - Math.pow(1 - this.camAnim.progress, 3);
      this.cam.x = this.camAnim.startCam.x + (this.camAnim.targetCam.x - this.camAnim.startCam.x) * t;
      this.cam.y = this.camAnim.startCam.y + (this.camAnim.targetCam.y - this.camAnim.startCam.y) * t;
      this.cam.z = this.camAnim.startCam.z + (this.camAnim.targetCam.z - this.camAnim.startCam.z) * t;

      this.cam.targetX = this.camAnim.startTarget.x + (this.camAnim.targetTarget.x - this.camAnim.startTarget.x) * t;
      this.cam.targetY = this.camAnim.startTarget.y + (this.camAnim.targetTarget.y - this.camAnim.startTarget.y) * t;
      this.cam.targetZ = this.camAnim.startTarget.z + (this.camAnim.targetTarget.z - this.camAnim.startTarget.z) * t;
    } else if (this.selectedPlanetId && (this.isFollowMode || this.isCinematicTour)) {
      const p = this.planetStates[this.selectedPlanetId];
      if (p) {
        this.cam.targetX = p.x;
        this.cam.targetY = p.y;
        this.cam.targetZ = p.z;

        const dist = p.data.visualRadius * 4.2;
        this.cam.x = p.x + Math.sin(this.cameraAngles.theta) * dist;
        this.cam.y = p.y + Math.sin(this.cameraAngles.phi) * dist + 4;
        this.cam.z = p.z + Math.cos(this.cameraAngles.theta) * dist;
      }
    } else {
      this.cam.x = this.cam.targetX + Math.sin(this.cameraAngles.theta) * Math.cos(this.cameraAngles.phi) * this.cameraAngles.distance;
      this.cam.y = this.cam.targetY + Math.sin(this.cameraAngles.phi) * this.cameraAngles.distance;
      this.cam.z = this.cam.targetZ + Math.cos(this.cameraAngles.theta) * Math.cos(this.cameraAngles.phi) * this.cameraAngles.distance;
    }
  }

  project3D(x, y, z) {
    // World space to camera space translation
    const dx = x - this.cam.x;
    const dy = y - this.cam.y;
    const dz = z - this.cam.z;

    // View Transform Matrix
    const cx = Math.cos(-this.cameraAngles.theta);
    const sx = Math.sin(-this.cameraAngles.theta);
    const cy = Math.cos(-this.cameraAngles.phi);
    const sy = Math.sin(-this.cameraAngles.phi);

    // Rotate Y (theta)
    const rx = dx * cx - dz * sx;
    const rz1 = dx * sx + dz * cx;

    // Rotate X (phi)
    const ry = dy * cy - rz1 * sy;
    const rz = dy * sy + rz1 * cy;

    if (rz <= 5) return null; // Behind camera or too close to lens

    const fovScale = (this.canvas.height / 2) / Math.tan((this.cam.fov * Math.PI / 180) / 2);
    const screenX = (rx * fovScale) / rz + this.canvas.width / 2;
    const screenY = (-ry * fovScale) / rz + this.canvas.height / 2;
    const scale = fovScale / rz;

    return { x: screenX, y: screenY, depth: rz, scale: scale };
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsedTime = (Date.now() - this.startTime) / 1000;
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // Clear Canvas with Deep Space Dark Gradient
    ctx.fillStyle = '#04060f';
    ctx.fillRect(0, 0, width, height);

    // Update Orbital Motions
    if (!this.isPaused) {
      PLANETS_ORDER.forEach((id) => {
        const p = this.planetStates[id];
        if (id !== 'sun') {
          p.angle += p.data.orbitSpeed * 0.12 * this.timeSpeed;
          p.x = Math.cos(p.angle) * p.data.orbitRadius;
          p.z = Math.sin(p.angle) * p.data.orbitRadius;
        }
        p.rotation += p.data.rotationSpeed * 0.2 * this.timeSpeed;
      });

      // Orbit Asteroids
      if (this.asteroids) {
        this.asteroids.forEach(a => {
          a.angle += a.speed * 0.08 * this.timeSpeed;
        });
      }
    }

    // Cinematic Tour Switcher
    if (this.isCinematicTour) {
      this.tourTimer += 0.016;
      if (this.tourTimer > 6.0) {
        this.tourTimer = 0;
        this.tourIndex = (this.tourIndex + 1) % PLANETS_ORDER.length;
        this.selectPlanet(PLANETS_ORDER[this.tourIndex]);
      }
    }

    this.updateCameraPosition();

    // 1. Render Background Twinkling Stars
    this.stars.forEach(s => {
      const proj = this.project3D(s.x, s.y, s.z);
      if (proj && proj.x >= 0 && proj.x <= width && proj.y >= 0 && proj.y <= height) {
        const factor = 0.4 + 0.6 * Math.sin(elapsedTime * s.speed + s.phase);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = factor * 0.9;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, Math.max(0.5, s.size * proj.scale * 0.05), 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.globalAlpha = 1.0;

    // 2. Render Orbit Path Lines
    if (this.showOrbitLines) {
      PLANETS_ORDER.forEach(id => {
        if (id === 'sun') return;
        const p = this.planetStates[id];
        const isHighlighted = this.selectedPlanetId === id || this.hoveredPlanetId === id;

        ctx.strokeStyle = p.data.color;
        ctx.lineWidth = isHighlighted ? 2.5 : 1.0;
        ctx.globalAlpha = isHighlighted ? 0.9 : 0.25;
        ctx.beginPath();

        const segments = 96;
        for (let i = 0; i <= segments; i++) {
          const a = (i / segments) * Math.PI * 2;
          const ox = Math.cos(a) * p.data.orbitRadius;
          const oz = Math.sin(a) * p.data.orbitRadius;
          const proj = this.project3D(ox, 0, oz);
          if (proj) {
            if (i === 0) ctx.moveTo(proj.x, proj.y);
            else ctx.lineTo(proj.x, proj.y);
          }
        }
        ctx.stroke();
      });
      ctx.globalAlpha = 1.0;
    }

    // 3. Render 1,200 Orbiting Asteroids (Asteroid Belt)
    if (this.asteroids) {
      this.asteroids.forEach(a => {
        const ax = Math.cos(a.angle) * a.radius;
        const az = Math.sin(a.angle) * a.radius;
        const proj = this.project3D(ax, a.y, az);
        if (proj && proj.x >= 0 && proj.x <= width && proj.y >= 0 && proj.y <= height) {
          ctx.fillStyle = a.color;
          ctx.globalAlpha = 0.8;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, Math.max(0.6, a.size * proj.scale * 0.4), 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;
    }

    // 3. Collect & Sort Renderable Bodies by Depth
    const renderList = [];
    PLANETS_ORDER.forEach(id => {
      const p = this.planetStates[id];
      const proj = this.project3D(p.x, p.y, p.z);
      if (proj) {
        renderList.push({
          id: id,
          state: p,
          proj: proj,
          radius: p.data.visualRadius * proj.scale
        });
      }
    });

    renderList.sort((a, b) => b.proj.depth - a.proj.depth);

    // 4. Render Solar System Bodies
    renderList.forEach(item => {
      const { id, state, proj, radius } = item;
      const data = state.data;
      const isSelected = this.selectedPlanetId === id;
      const isHovered = this.hoveredPlanetId === id;
      const r = Math.max(3, radius);

      ctx.save();
      ctx.translate(proj.x, proj.y);

      // Saturn Rings
      if (id === 'saturn' && data.hasRings) {
        ctx.save();
        ctx.scale(1, 0.3);
        const ringGrad = ctx.createRadialGradient(0, 0, r * 1.3, 0, 0, r * 2.5);
        ringGrad.addColorStop(0, 'rgba(210, 180, 140, 0.0)');
        ringGrad.addColorStop(0.3, 'rgba(230, 200, 150, 0.7)');
        ringGrad.addColorStop(0.7, 'rgba(200, 170, 120, 0.8)');
        ringGrad.addColorStop(1, 'rgba(180, 150, 100, 0.0)');
        ctx.fillStyle = ringGrad;
        ctx.beginPath();
        ctx.arc(0, 0, r * 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (id === 'sun') {
        // Sun Core & Plasma Flare
        const sunGrad = ctx.createRadialGradient(0, 0, r * 0.1, 0, 0, r);
        sunGrad.addColorStop(0, '#ffffff');
        sunGrad.addColorStop(0.25, '#fff066');
        sunGrad.addColorStop(0.65, '#ffaa00');
        sunGrad.addColorStop(1, '#ff3300');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();

        // Sun Corona Halo
        const flareGrad = ctx.createRadialGradient(0, 0, r * 0.8, 0, 0, r * 2.2);
        flareGrad.addColorStop(0, 'rgba(255, 170, 0, 0.6)');
        flareGrad.addColorStop(0.5, 'rgba(255, 80, 0, 0.25)');
        flareGrad.addColorStop(1, 'rgba(255, 30, 0, 0.0)');
        ctx.fillStyle = flareGrad;
        ctx.beginPath();
        ctx.arc(0, 0, r * 2.2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // 3D Planet Sphere Body with Dynamic Specular Light
        const pGrad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.05, 0, 0, r * 1.1);
        pGrad.addColorStop(0.0, '#ffffff');
        pGrad.addColorStop(0.25, data.color);
        pGrad.addColorStop(0.75, data.color);
        pGrad.addColorStop(1.0, '#04060f');

        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();

        // Earth Volumetric Atmosphere Halo
        if (id === 'earth') {
          const atmoGrad = ctx.createRadialGradient(0, 0, r * 0.95, 0, 0, r * 1.35);
          atmoGrad.addColorStop(0, 'rgba(0, 210, 255, 0.5)');
          atmoGrad.addColorStop(1, 'rgba(0, 210, 255, 0.0)');
          ctx.fillStyle = atmoGrad;
          ctx.beginPath();
          ctx.arc(0, 0, r * 1.35, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Selection & Hover Ring
      if (isSelected || isHovered) {
        ctx.strokeStyle = isSelected ? '#00f0ff' : 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = isSelected ? 3 : 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, r + 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    });
  }

  checkHover(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    let found = null;

    PLANETS_ORDER.forEach(id => {
      const p = this.planetStates[id];
      const proj = this.project3D(p.x, p.y, p.z);
      if (proj) {
        const radius = Math.max(12, p.data.visualRadius * proj.scale);
        const dist = Math.hypot(mouseX - proj.x, mouseY - proj.y);
        if (dist <= radius) {
          found = id;
        }
      }
    });

    if (this.hoveredPlanetId !== found) {
      this.hoveredPlanetId = found;
      if (this.onHover) this.onHover(found);
    }
  }

  checkClick(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    let clickedId = null;

    PLANETS_ORDER.forEach(id => {
      const p = this.planetStates[id];
      const proj = this.project3D(p.x, p.y, p.z);
      if (proj) {
        const radius = Math.max(14, p.data.visualRadius * proj.scale);
        const dist = Math.hypot(mouseX - proj.x, mouseY - proj.y);
        if (dist <= radius) {
          clickedId = id;
        }
      }
    });

    if (clickedId) {
      audioEngine.playSelect();
      this.selectPlanet(clickedId);
    }
  }

  selectPlanet(id) {
    this.selectedPlanetId = id;
    const p = this.planetStates[id];
    if (p) {
      this.camAnim.startCam = { x: this.cam.x, y: this.cam.y, z: this.cam.z };
      this.camAnim.startTarget = { x: this.cam.targetX, y: this.cam.targetY, z: this.cam.targetZ };

      const dist = p.data.visualRadius * 4.2;
      this.camAnim.targetCam = {
        x: p.x + Math.sin(this.cameraAngles.theta) * dist,
        y: p.y + Math.sin(this.cameraAngles.phi) * dist + 4,
        z: p.z + Math.cos(this.cameraAngles.theta) * dist
      };
      this.camAnim.targetTarget = { x: p.x, y: p.y, z: p.z };
      this.camAnim.progress = 0;
      this.camAnim.isAnimating = true;

      if (this.onSelect) this.onSelect(p.data);
    }
  }

  setSpeed(speed) {
    this.timeSpeed = speed;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    return this.isPaused;
  }

  toggleOrbits() {
    this.showOrbitLines = !this.showOrbitLines;
    return this.showOrbitLines;
  }

  startCinematicTour() {
    this.isCinematicTour = !this.isCinematicTour;
    if (this.isCinematicTour) {
      this.tourIndex = 1;
      this.selectPlanet(PLANETS_ORDER[this.tourIndex]);
    }
    return this.isCinematicTour;
  }

  resetView() {
    this.selectedPlanetId = null;
    this.isFollowMode = false;
    this.isCinematicTour = false;

    this.cameraAngles.theta = Math.PI / 2;
    this.cameraAngles.phi = 0.35;
    this.cameraAngles.distance = 260;

    this.camAnim.startCam = { x: this.cam.x, y: this.cam.y, z: this.cam.z };
    this.camAnim.startTarget = { x: this.cam.targetX, y: this.cam.targetY, z: this.cam.targetZ };
    this.camAnim.targetCam = { x: 0, y: 90, z: 240 };
    this.camAnim.targetTarget = { x: 0, y: 0, z: 0 };
    this.camAnim.progress = 0;
    this.camAnim.isAnimating = true;

    if (this.onSelect) this.onSelect(null);
  }

  toggleFollowMode() {
    this.isFollowMode = !this.isFollowMode;
    return this.isFollowMode;
  }

  focusCameraOnPlanet(id) {
    this.selectPlanet(id);
  }

  highlightOrbit(id, highlight) {}
}
