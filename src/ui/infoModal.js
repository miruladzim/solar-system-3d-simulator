import { SOLAR_SYSTEM_DATA, PLANETS_ORDER } from '../data/planetsData.js';

export class InfoModal {
  constructor(solarSystemScene) {
    this.scene = solarSystemScene;
    this.container = null;
    this.currentPlanetData = null;
    this.activeTab = 'specs';

    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.id = 'planet-info-panel';
    this.container.className = 'info-panel hidden';
    document.body.appendChild(this.container);
  }

  show(planetData) {
    if (!planetData) {
      this.hide();
      return;
    }

    this.currentPlanetData = planetData;
    this.activeTab = 'specs';
    this.render();
    this.container.classList.remove('hidden');
    this.container.classList.add('visible');
  }

  hide() {
    this.container.classList.remove('visible');
    this.container.classList.add('hidden');
    this.currentPlanetData = null;
  }

  render() {
    const data = this.currentPlanetData;
    if (!data) return;

    const currentIndex = PLANETS_ORDER.indexOf(data.id);
    const prevIndex = (currentIndex - 1 + PLANETS_ORDER.length) % PLANETS_ORDER.length;
    const nextIndex = (currentIndex + 1) % PLANETS_ORDER.length;
    const prevId = PLANETS_ORDER[prevIndex];
    const nextId = PLANETS_ORDER[nextIndex];

    this.container.style.setProperty('--accent-color', data.color);
    this.container.style.setProperty('--accent-glow', data.glowColor);

    this.container.innerHTML = `
      <div class="panel-glass">
        <!-- Panel Header -->
        <div class="panel-header">
          <div class="planet-title-wrapper">
            <div class="badge-tag">${data.rankText}</div>
            <h2>${data.name}</h2>
            <span class="tagline">${data.tagline}</span>
          </div>

          <button class="close-btn" id="modal-close">&times;</button>
        </div>

        <!-- Panel Action Toolbar -->
        <div class="panel-actions">
          <button class="action-btn" id="btn-follow">
            <span class="icon">🛸</span> <span id="follow-text">Follow Orbit</span>
          </button>
          <button class="action-btn" id="btn-focus">
            <span class="icon">🔍</span> Focus View
          </button>
          <div class="nav-arrows">
            <button class="arrow-btn" id="btn-prev-planet" title="Previous Body (${SOLAR_SYSTEM_DATA[prevId].name})">◀</button>
            <button class="arrow-btn" id="btn-next-planet" title="Next Body (${SOLAR_SYSTEM_DATA[nextId].name})">▶</button>
          </div>
        </div>

        <!-- Tabs Navigation -->
        <div class="panel-tabs">
          <button class="tab-btn ${this.activeTab === 'specs' ? 'active' : ''}" data-tab="specs">📊 Specs</button>
          <button class="tab-btn ${this.activeTab === 'overview' ? 'active' : ''}" data-tab="overview">📖 Atmosphere & Structure</button>
          <button class="tab-btn ${this.activeTab === 'moons' ? 'active' : ''}" data-tab="moons">🌙 Moons (${data.specs.moons})</button>
          <button class="tab-btn ${this.activeTab === 'facts' ? 'active' : ''}" data-tab="facts">💡 Fun Facts</button>
          <button class="tab-btn ${this.activeTab === 'compare' ? 'active' : ''}" data-tab="compare">📏 Earth Scale</button>
        </div>

        <!-- Tab Body Content -->
        <div class="panel-body">
          ${this.renderTabContent(data)}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderTabContent(data) {
    switch (this.activeTab) {
      case 'specs':
        return `
          <div class="specs-grid">
            <div class="spec-card">
              <span class="spec-label">Diameter</span>
              <span class="spec-value">${data.specs.diameter}</span>
            </div>
            <div class="spec-card">
              <span class="spec-label">Distance from Sun</span>
              <span class="spec-value">${data.specs.distanceFromSun}</span>
            </div>
            <div class="spec-card">
              <span class="spec-label">Surface Temp</span>
              <span class="spec-value">${data.specs.surfaceTemp}</span>
            </div>
            <div class="spec-card">
              <span class="spec-label">Gravity</span>
              <span class="spec-value">${data.specs.gravity}</span>
            </div>
            <div class="spec-card">
              <span class="spec-label">Day Length</span>
              <span class="spec-value">${data.specs.dayLength}</span>
            </div>
            <div class="spec-card">
              <span class="spec-label">Year Length</span>
              <span class="spec-value">${data.specs.yearLength}</span>
            </div>
            <div class="spec-card">
              <span class="spec-label">Mass</span>
              <span class="spec-value">${data.specs.mass}</span>
            </div>
            <div class="spec-card">
              <span class="spec-label">Classification</span>
              <span class="spec-value">${data.type}</span>
            </div>
          </div>
        `;

      case 'overview':
        return `
          <div class="overview-content">
            <div class="section-block">
              <h3>Description</h3>
              <p>${data.description}</p>
            </div>

            <div class="section-block">
              <h3>Atmosphere Composition</h3>
              <p>${data.atmosphere}</p>
            </div>

            <div class="section-block">
              <h3>Internal Structure</h3>
              <p>${data.structure}</p>
            </div>
          </div>
        `;

      case 'moons':
        if (!data.moonsList || data.moonsList.length === 0) {
          return `
            <div class="empty-state">
              <div class="empty-icon">🌕</div>
              <p>${data.name} has no known natural moons.</p>
            </div>
          `;
        }
        return `
          <div class="moons-list">
            ${data.moonsList.map(m => `
              <div class="moon-card">
                <div class="moon-icon">🌕</div>
                <div class="moon-details">
                  <h4>${m.name}</h4>
                  <span>Diameter: ${m.diameter} | Distance from ${data.name}: ${m.distance}</span>
                </div>
              </div>
            `).join('')}
          </div>
        `;

      case 'facts':
        return `
          <div class="facts-list">
            ${data.funFacts.map(fact => `
              <div class="fact-card">
                <div class="fact-sparkle">✦</div>
                <p>${fact}</p>
              </div>
            `).join('')}
          </div>
        `;

      case 'compare':
        const earthData = SOLAR_SYSTEM_DATA['earth'];
        const ratio = (data.visualRadius / earthData.visualRadius).toFixed(2);
        return `
          <div class="scale-comparison">
            <h3>Visual Size Comparison with Earth</h3>
            <p>Comparing physical radius ratio against Earth (1.0x baseline):</p>

            <div class="comparison-stage">
              <div class="body-box">
                <div class="body-circle earth-circle"></div>
                <span>Earth (12,742 km)</span>
              </div>

              <div class="vs-text">VS</div>

              <div class="body-box">
                <div class="body-circle target-circle" style="background: ${data.color}; transform: scale(${Math.min(ratio, 2.4)});"></div>
                <span>${data.name} (${ratio}x size)</span>
              </div>
            </div>

            <div class="comparison-note">
              ${ratio > 1 ? `${data.name} is roughly ${ratio} times larger than Earth in size!` : `${data.name} is about ${(1 / ratio).toFixed(1)} times smaller than Earth.`}
            </div>
          </div>
        `;

      default:
        return '';
    }
  }

  bindEvents() {
    // Close modal
    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.hide());

    // Follow Orbit Toggle
    const followBtn = document.getElementById('btn-follow');
    if (followBtn) {
      followBtn.addEventListener('click', () => {
        const isFollowing = this.scene.toggleFollowMode();
        followBtn.classList.toggle('active', isFollowing);
        document.getElementById('follow-text').textContent = isFollowing ? 'Following Orbit...' : 'Follow Orbit';
      });
    }

    // Focus View
    const focusBtn = document.getElementById('btn-focus');
    if (focusBtn) {
      focusBtn.addEventListener('click', () => {
        this.scene.focusCameraOnPlanet(this.currentPlanetData.id);
      });
    }

    // Prev / Next Planet Navigation
    const prevBtn = document.getElementById('btn-prev-planet');
    const nextBtn = document.getElementById('btn-next-planet');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const idx = PLANETS_ORDER.indexOf(this.currentPlanetData.id);
        const prevId = PLANETS_ORDER[(idx - 1 + PLANETS_ORDER.length) % PLANETS_ORDER.length];
        this.scene.selectPlanet(prevId);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const idx = PLANETS_ORDER.indexOf(this.currentPlanetData.id);
        const nextId = PLANETS_ORDER[(idx + 1) % PLANETS_ORDER.length];
        this.scene.selectPlanet(nextId);
      });
    }

    // Tab buttons
    document.querySelectorAll('.tab-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        this.activeTab = tab.getAttribute('data-tab');
        this.render();
      });
    });
  }
}
