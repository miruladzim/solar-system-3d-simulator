import { SolarSystemScene } from './solarSystem/scene.js';
import { HUD } from './ui/hud.js';
import { InfoModal } from './ui/infoModal.js';
import { SOLAR_SYSTEM_DATA } from './data/planetsData.js';

class App {
  constructor() {
    this.sceneContainer = document.getElementById('canvas-container');
    this.scene = null;
    this.hud = null;
    this.infoModal = null;
    this.hoverTooltip = null;

    this.init();
  }

  init() {
    // 1. Create Hover Tooltip
    this.createHoverTooltip();

    // 2. Initialize 3D Scene
    this.scene = new SolarSystemScene(
      this.sceneContainer,
      (selectedPlanetData) => this.handlePlanetSelect(selectedPlanetData),
      (hoveredPlanetId) => this.handlePlanetHover(hoveredPlanetId)
    );

    // 3. Initialize HUD Navigation
    this.hud = new HUD(this.scene, (planetId) => {
      this.scene.selectPlanet(planetId);
    });

    // 4. Initialize Info Modal Panel
    this.infoModal = new InfoModal(this.scene);
  }

  createHoverTooltip() {
    this.hoverTooltip = document.createElement('div');
    this.hoverTooltip.id = 'planet-tooltip';
    this.hoverTooltip.className = 'planet-tooltip hidden';
    document.body.appendChild(this.hoverTooltip);

    window.addEventListener('mousemove', (e) => {
      if (this.hoverTooltip.classList.contains('visible')) {
        this.hoverTooltip.style.transform = `translate3d(${e.clientX + 16}px, ${e.clientY + 16}px, 0)`;
      }
    });
  }

  handlePlanetSelect(planetData) {
    if (planetData) {
      this.hud.selectDockItem(planetData.id);
      this.infoModal.show(planetData);
    } else {
      this.hud.clearActiveDock();
      this.infoModal.hide();
    }
  }

  handlePlanetHover(planetId) {
    if (planetId) {
      const data = SOLAR_SYSTEM_DATA[planetId];
      if (data) {
        this.hoverTooltip.innerHTML = `
          <div class="tooltip-badge" style="background: ${data.color}"></div>
          <div class="tooltip-text">
            <strong>${data.name}</strong>
            <span>${data.type}</span>
          </div>
        `;
        this.hoverTooltip.classList.remove('hidden');
        this.hoverTooltip.classList.add('visible');
      }
    } else {
      this.hoverTooltip.classList.remove('visible');
      this.hoverTooltip.classList.add('hidden');
    }
  }
}

// Start application on DOM load
window.addEventListener('DOMContentLoaded', () => {
  new App();
});
