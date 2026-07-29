import { SOLAR_SYSTEM_DATA, PLANETS_ORDER } from '../data/planetsData.js';
import { audioEngine } from '../solarSystem/audioEngine.js';

export class HUD {
  constructor(solarSystemScene, onPlanetClickCallback) {
    this.scene = solarSystemScene;
    this.onPlanetClick = onPlanetClickCallback;
    this.activePlanetId = null;
    this.activeCategory = 'all';

    this.initHUD();
  }

  initHUD() {
    this.renderHeader();
    this.renderDock();
    this.bindEvents();
  }

  renderHeader() {
    const header = document.createElement('div');
    header.id = 'hud-header';
    header.className = 'hud-header';

    header.innerHTML = `
      <div class="brand">
        <div class="logo-icon">🪐</div>
        <div class="brand-text">
          <h1>SOLAR SYSTEM 3D</h1>
          <span class="subtitle">REAL-TIME EXPLORER</span>
        </div>
      </div>

      <div class="filter-pills">
        <button class="filter-btn active" data-category="all">All (11)</button>
        <button class="filter-btn" data-category="planets">Planets (8)</button>
        <button class="filter-btn" data-category="other">Sun, Belt & Dwarf (3)</button>
      </div>

      <div class="controls-group">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" id="planet-search" placeholder="Search planet..." autocomplete="off">
        </div>

        <button id="btn-sound" class="hud-btn" title="Toggle Sound">
          <span class="btn-icon">🔊</span>
        </button>

        <button id="btn-tour" class="hud-btn glow-btn" title="Cinematic Tour">
          <span class="btn-icon">🎬</span>
          <span class="btn-label">Tour</span>
        </button>

        <button id="btn-pause" class="hud-btn" title="Pause / Play">
          <span class="btn-icon">⏸️</span>
        </button>

        <button id="btn-orbits" class="hud-btn active" title="Toggle Orbit Lines">
          <span class="btn-icon">⭕</span>
        </button>

        <div class="speed-box">
          <span id="speed-val">1.0x</span>
          <input type="range" id="speed-range" min="0.1" max="5.0" step="0.1" value="1.0">
        </div>

        <button id="btn-reset" class="hud-btn primary-btn" title="Reset View">
          <span class="btn-icon">🔄</span>
        </button>
      </div>
    `;

    document.body.appendChild(header);
  }

  renderDock() {
    const dock = document.createElement('div');
    dock.id = 'hud-dock';
    dock.className = 'hud-dock';

    let itemsHtml = '';
    PLANETS_ORDER.forEach((id) => {
      const data = SOLAR_SYSTEM_DATA[id];
      const isSun = id === 'sun';
      const isPluto = id === 'pluto';
      const isBelt = id === 'asteroidBelt';

      let typeLabel = 'Planet';
      if (isSun) typeLabel = 'Star';
      else if (isPluto) typeLabel = 'Dwarf';
      else if (isBelt) typeLabel = 'Debris Belt';

      itemsHtml += `
        <button class="dock-item" data-planet="${id}" style="--planet-color: ${data.color}">
          <div class="planet-preview" style="background: ${data.color}; box-shadow: 0 0 10px ${data.glowColor}"></div>
          <span class="dock-name">${data.name}</span>
        </button>
      `;
    });

    dock.innerHTML = `
      <div class="dock-track">
        ${itemsHtml}
      </div>
    `;

    document.body.appendChild(dock);
  }

  bindEvents() {
    // Dock Item Click
    document.querySelectorAll('.dock-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-planet');
        this.selectDockItem(id);
        this.scene.selectPlanet(id);
      });

      btn.addEventListener('mouseenter', () => {
        audioEngine.playHover();
      });
    });

    // Search Input
    const searchInput = document.getElementById('planet-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        this.filterPlanetsBySearch(query);
      });
    }

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategory = btn.getAttribute('data-category');
        this.filterPlanetsByCategory(this.activeCategory);
      });
    });

    // Sound Button
    const soundBtn = document.getElementById('btn-sound');
    soundBtn.addEventListener('click', () => {
      const isAudible = audioEngine.toggleSound();
      soundBtn.querySelector('.btn-icon').textContent = isAudible ? '🔊' : '🔇';
      soundBtn.classList.toggle('active', isAudible);
    });

    // Tour Button
    const tourBtn = document.getElementById('btn-tour');
    tourBtn.addEventListener('click', () => {
      const isTouring = this.scene.startCinematicTour();
      tourBtn.classList.toggle('active', isTouring);
    });

    // Pause Button
    const pauseBtn = document.getElementById('btn-pause');
    pauseBtn.addEventListener('click', () => {
      const isPaused = this.scene.togglePause();
      pauseBtn.querySelector('.btn-icon').textContent = isPaused ? '▶️' : '⏸️';
      pauseBtn.classList.toggle('active', isPaused);
    });

    // Speed Slider
    const speedRange = document.getElementById('speed-range');
    const speedVal = document.getElementById('speed-val');
    speedRange.addEventListener('input', (e) => {
      const speed = parseFloat(e.target.value);
      this.scene.setSpeed(speed);
      speedVal.textContent = speed.toFixed(1) + 'x';
    });

    // Orbits Button
    const orbitsBtn = document.getElementById('btn-orbits');
    orbitsBtn.addEventListener('click', () => {
      const visible = this.scene.toggleOrbits();
      orbitsBtn.classList.toggle('active', visible);
    });

    // Reset Button
    const resetBtn = document.getElementById('btn-reset');
    resetBtn.addEventListener('click', () => {
      this.clearActiveDock();
      this.scene.resetView();
    });
  }

  filterPlanetsBySearch(query) {
    document.querySelectorAll('.dock-item').forEach(item => {
      const id = item.getAttribute('data-planet');
      const data = SOLAR_SYSTEM_DATA[id];
      if (!data) return;

      const match = data.name.toLowerCase().includes(query) ||
                    data.type.toLowerCase().includes(query);
      item.style.display = match ? 'flex' : 'none';
    });
  }

  filterPlanetsByCategory(category) {
    document.querySelectorAll('.dock-item').forEach(item => {
      const id = item.getAttribute('data-planet');
      const data = SOLAR_SYSTEM_DATA[id];
      if (!data) return;

      let match = true;
      if (category === 'planets') match = id !== 'sun' && id !== 'asteroidBelt' && id !== 'pluto';
      else if (category === 'other') match = id === 'sun' || id === 'asteroidBelt' || id === 'pluto';

      item.style.display = match ? 'flex' : 'none';
    });
  }

  selectDockItem(planetId) {
    this.activePlanetId = planetId;
    document.querySelectorAll('.dock-item').forEach(item => {
      const match = item.getAttribute('data-planet') === planetId;
      item.classList.toggle('active', match);
    });
  }

  clearActiveDock() {
    this.activePlanetId = null;
    document.querySelectorAll('.dock-item').forEach(item => item.classList.remove('active'));
  }
}
