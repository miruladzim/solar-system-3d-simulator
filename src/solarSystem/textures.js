const THREE = window.THREE;

export function createProceduralTextures() {
  return {
    sun: createSunTexture(),
    mercury: createMercuryTexture(),
    venus: createVenusTexture(),
    earth: createEarthTexture(),
    earthNight: createEarthNightTexture(),
    earthSpecular: createEarthSpecularTexture(),
    clouds: createCloudsTexture(),
    moon: createMoonTexture(),
    mars: createMarsTexture(),
    jupiter: createJupiterTexture(),
    saturn: createSaturnTexture(),
    saturnRings: createSaturnRingsTexture(),
    uranus: createUranusTexture(),
    uranusRings: createUranusRingsTexture(),
    neptune: createNeptuneTexture(),
    pluto: createPlutoTexture()
  };
}

function createCanvas(width = 2048, height = 1024) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  return { canvas, ctx };
}

function createSunTexture() {
  const { canvas, ctx } = createCanvas(2048, 1024);

  // Deep plasma background
  const grad = ctx.createLinearGradient(0, 0, 0, 1024);
  grad.addColorStop(0, '#ffdd33');
  grad.addColorStop(0.2, '#ff9900');
  grad.addColorStop(0.5, '#ff5500');
  grad.addColorStop(0.8, '#ffaa00');
  grad.addColorStop(1, '#ffbb11');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 2048, 1024);

  // Convective cells & solar flares
  for (let i = 0; i < 1200; i++) {
    const x = Math.random() * 2048;
    const y = Math.random() * 1024;
    const r = Math.random() * 40 + 10;
    const alpha = Math.random() * 0.35;
    ctx.fillStyle = `rgba(255, 245, 180, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Dark Sunspot groups
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 2048;
    const y = 200 + Math.random() * 624;
    const r = Math.random() * 18 + 5;
    
    // Penumbra
    ctx.fillStyle = 'rgba(180, 50, 0, 0.6)';
    ctx.beginPath();
    ctx.arc(x, y, r * 1.6, 0, Math.PI * 2);
    ctx.fill();

    // Umbra (dark core)
    ctx.fillStyle = 'rgba(40, 5, 0, 0.9)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function createMercuryTexture() {
  const { canvas, ctx } = createCanvas(1024, 512);
  ctx.fillStyle = '#7a7675';
  ctx.fillRect(0, 0, 1024, 512);

  // Granular noise
  for (let i = 0; i < 20000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 512;
    const shade = Math.floor(90 + Math.random() * 70);
    ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
    ctx.fillRect(x, y, 2, 2);
  }

  // Craters & impact ray systems
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 512;
    const r = Math.random() * 22 + 4;

    ctx.strokeStyle = 'rgba(30, 30, 30, 0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(210, 210, 210, 0.4)';
    ctx.beginPath();
    ctx.arc(x - r * 0.35, y - r * 0.35, r * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Ejecta rays
    if (r > 12) {
      for (let a = 0; a < Math.PI * 2; a += 0.8) {
        ctx.strokeStyle = 'rgba(220, 220, 220, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(a) * r * 4, y + Math.sin(a) * r * 4);
        ctx.stroke();
      }
    }
  }

  return new THREE.CanvasTexture(canvas);
}

function createVenusTexture() {
  const { canvas, ctx } = createCanvas(1024, 512);
  
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#f0d3a7');
  grad.addColorStop(0.3, '#dca75e');
  grad.addColorStop(0.6, '#e8be7d');
  grad.addColorStop(1, '#c9964a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Swirling sulfuric cloud patterns
  for (let y = 0; y < 512; y += 6) {
    const shift = Math.sin(y / 25) * 80 + Math.cos(y / 12) * 40;
    ctx.fillStyle = `rgba(255, 240, 200, ${0.18 + Math.random() * 0.12})`;
    ctx.fillRect((shift + 1024) % 1024, y, 450, 8);
    ctx.fillStyle = `rgba(160, 100, 30, ${0.15 + Math.random() * 0.1})`;
    ctx.fillRect((shift + 400) % 1024, y, 350, 6);
  }

  return new THREE.CanvasTexture(canvas);
}

function createEarthTexture() {
  const { canvas, ctx } = createCanvas(2048, 1024);

  // Oceans with deep shelf gradients
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  oceanGrad.addColorStop(0, '#103868');
  oceanGrad.addColorStop(0.5, '#195594');
  oceanGrad.addColorStop(1, '#0c2e56');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, 2048, 1024);

  // Shallow coastal waters glow
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 2048;
    const y = Math.random() * 1024;
    const r = Math.random() * 100 + 30;
    ctx.fillStyle = 'rgba(20, 120, 180, 0.25)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Realistic Detailed Continents
  // North America
  drawDetailedContinent(ctx, 480, 280, 260, 180, '#2e6f40', '#8c7d4e');
  // South America
  drawDetailedContinent(ctx, 640, 640, 170, 260, '#245932', '#3b784a');
  // Europe & Asia
  drawDetailedContinent(ctx, 1250, 300, 480, 240, '#387847', '#736b41');
  // Africa
  drawDetailedContinent(ctx, 1120, 560, 240, 280, '#8c7a3e', '#2e6f40'); // Sahara desert + rainforest
  // Australia
  drawDetailedContinent(ctx, 1680, 720, 150, 110, '#a66a38', '#547d3d');

  // Polar Ice Caps
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 2048, 60);
  ctx.fillRect(0, 964, 2048, 60);

  return new THREE.CanvasTexture(canvas);
}

function drawDetailedContinent(ctx, cx, cy, rx, ry, landColor, desertColor) {
  ctx.fillStyle = landColor;
  ctx.beginPath();
  for (let a = 0; a < Math.PI * 2; a += 0.1) {
    const noise = Math.sin(a * 5) * 0.25 + Math.cos(a * 9) * 0.15 + Math.sin(a * 13) * 0.1;
    const x = cx + Math.cos(a) * rx * (1 + noise);
    const y = cy + Math.sin(a) * ry * (1 + noise);
    if (a === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();

  // Desert patches
  ctx.fillStyle = desertColor;
  ctx.beginPath();
  ctx.ellipse(cx + rx * 0.1, cy - ry * 0.1, rx * 0.4, ry * 0.3, 0.2, 0, Math.PI * 2);
  ctx.fill();
}

function createEarthNightTexture() {
  const { canvas, ctx } = createCanvas(2048, 1024);
  ctx.fillStyle = '#020308';
  ctx.fillRect(0, 0, 2048, 1024);

  // City Lights Networks (Golden glowing urban centers)
  const cityClusters = [
    { x: 500, y: 300, r: 120 }, // USA East Coast
    { x: 350, y: 340, r: 90 },  // USA West Coast
    { x: 1100, y: 260, r: 140 }, // Europe
    { x: 1450, y: 340, r: 120 }, // India
    { x: 1600, y: 320, r: 160 }, // East China & Japan
    { x: 1180, y: 620, r: 70 },  // South Africa
    { x: 670, y: 680, r: 80 }   // SE South America
  ];

  cityClusters.forEach(c => {
    for (let i = 0; i < 250; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.pow(Math.random(), 1.5) * c.r;
      const x = c.x + Math.cos(angle) * dist;
      const y = c.y + Math.sin(angle) * dist;
      
      const alpha = Math.random() * 0.8 + 0.2;
      ctx.fillStyle = `rgba(255, 180, 60, ${alpha})`;
      ctx.fillRect(x, y, 2, 2);
    }
  });

  return new THREE.CanvasTexture(canvas);
}

function createEarthSpecularTexture() {
  const { canvas, ctx } = createCanvas(1024, 512);
  // White oceans (shiny specular reflection), black continents
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1024, 512);

  // Mask landmasses as non-reflective dark
  ctx.fillStyle = '#111111';
  drawDetailedContinent(ctx, 240, 140, 130, 90, '#111111', '#111111');
  drawDetailedContinent(ctx, 320, 320, 85, 130, '#111111', '#111111');
  drawDetailedContinent(ctx, 625, 150, 240, 120, '#111111', '#111111');
  drawDetailedContinent(ctx, 560, 280, 120, 140, '#111111', '#111111');
  drawDetailedContinent(ctx, 840, 360, 75, 55, '#111111', '#111111');

  return new THREE.CanvasTexture(canvas);
}

function createCloudsTexture() {
  const { canvas, ctx } = createCanvas(2048, 1024);
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, 2048, 1024);

  // Swirling hurricane & weather clouds
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * 2048;
    const y = Math.random() * 1024;
    const rx = Math.random() * 160 + 30;
    const ry = Math.random() * 45 + 15;
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.45 + 0.15})`;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, Math.random() * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

function createMoonTexture() {
  const { canvas, ctx } = createCanvas(512, 256);
  ctx.fillStyle = '#8c8a88';
  ctx.fillRect(0, 0, 512, 256);

  // Lunar Maria (Dark basaltic plains)
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const rx = Math.random() * 40 + 10;
    const ry = Math.random() * 30 + 10;
    ctx.fillStyle = 'rgba(50, 48, 46, 0.5)';
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, Math.random(), 0, Math.PI * 2);
    ctx.fill();
  }

  // Bright impact craters
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const r = Math.random() * 12 + 2;
    ctx.strokeStyle = 'rgba(30, 30, 30, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(230, 230, 230, 0.4)';
    ctx.beginPath();
    ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

function createMarsTexture() {
  const { canvas, ctx } = createCanvas(1024, 512);

  ctx.fillStyle = '#cc4e2a';
  ctx.fillRect(0, 0, 1024, 512);

  // Dark volcanic lava regions
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 1024;
    const y = 80 + Math.random() * 352;
    const rx = Math.random() * 80 + 20;
    const ry = Math.random() * 45 + 15;
    ctx.fillStyle = 'rgba(90, 28, 12, 0.4)';
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, Math.random(), 0, Math.PI * 2);
    ctx.fill();
  }

  // Valles Marineris Canyon streak
  ctx.fillStyle = 'rgba(60, 15, 5, 0.6)';
  ctx.beginPath();
  ctx.ellipse(450, 280, 180, 25, -0.15, 0, Math.PI * 2);
  ctx.fill();

  // Polar ice caps
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(512, 18, 180, 25, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(512, 494, 210, 30, 0, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

function createJupiterTexture() {
  const { canvas, ctx } = createCanvas(2048, 1024);

  const bands = [
    '#b87a48', '#ebd1b0', '#96522c', '#f5e3cc',
    '#b26638', '#faeedd', '#7c381a', '#e3ba8d',
    '#aa5c31', '#f0ded0', '#904523', '#d9b384'
  ];

  const bandHeight = 1024 / bands.length;
  for (let i = 0; i < bands.length; i++) {
    ctx.fillStyle = bands[i];
    ctx.fillRect(0, i * bandHeight, 2048, bandHeight + 4);

    // Swirling turbulence within bands
    for (let j = 0; j < 80; j++) {
      const x = Math.random() * 2048;
      const y = i * bandHeight + Math.random() * bandHeight;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
      ctx.fillRect(x, y, Math.random() * 160 + 40, Math.random() * 8 + 2);
    }
  }

  // Great Red Spot
  const grsX = 1300;
  const grsY = 660;
  const grsGrad = ctx.createRadialGradient(grsX, grsY, 10, grsX, grsY, 90);
  grsGrad.addColorStop(0, '#d9361e');
  grsGrad.addColorStop(0.6, '#b83b27');
  grsGrad.addColorStop(1, 'rgba(224, 135, 90, 0)');
  ctx.fillStyle = grsGrad;
  ctx.beginPath();
  ctx.ellipse(grsX, grsY, 110, 64, -0.1, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

function createSaturnTexture() {
  const { canvas, ctx } = createCanvas(1024, 512);

  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#e5d1a5');
  grad.addColorStop(0.25, '#ceb685');
  grad.addColorStop(0.5, '#ebdcb8');
  grad.addColorStop(0.75, '#c4a973');
  grad.addColorStop(1, '#b89c66');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  return new THREE.CanvasTexture(canvas);
}

function createSaturnRingsTexture() {
  const { canvas, ctx } = createCanvas(2048, 64);
  ctx.clearRect(0, 0, 2048, 64);

  const grad = ctx.createLinearGradient(0, 0, 2048, 0);
  grad.addColorStop(0.0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.12, 'rgba(190, 165, 130, 0.4)'); // C ring
  grad.addColorStop(0.28, 'rgba(240, 215, 170, 0.95)'); // B ring inner
  grad.addColorStop(0.58, 'rgba(225, 200, 155, 0.98)'); // B ring outer
  grad.addColorStop(0.62, 'rgba(0, 0, 0, 0.05)'); // Cassini Division gap
  grad.addColorStop(0.67, 'rgba(205, 180, 140, 0.88)'); // A ring inner
  grad.addColorStop(0.88, 'rgba(185, 160, 120, 0.75)'); // A ring outer
  grad.addColorStop(0.91, 'rgba(0,0,0,0)'); // Encke Gap
  grad.addColorStop(0.95, 'rgba(170, 145, 110, 0.45)'); // F Ring
  grad.addColorStop(1.0, 'rgba(0,0,0,0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 2048, 64);

  // Add hundreds of fine ringlets
  for (let x = 200; x < 1900; x += 3) {
    if (Math.random() > 0.35) {
      ctx.fillStyle = `rgba(30, 25, 20, ${Math.random() * 0.35})`;
      ctx.fillRect(x, 0, 2, 64);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function createUranusTexture() {
  const { canvas, ctx } = createCanvas(1024, 512);
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#b8f0f7');
  grad.addColorStop(0.5, '#75dce6');
  grad.addColorStop(1, '#5bcbd6');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);
  return new THREE.CanvasTexture(canvas);
}

function createUranusRingsTexture() {
  const { canvas, ctx } = createCanvas(1024, 32);
  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0.0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.65, 'rgba(170, 240, 250, 0.3)');
  grad.addColorStop(0.88, 'rgba(190, 245, 255, 0.7)');
  grad.addColorStop(1.0, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 32);
  return new THREE.CanvasTexture(canvas);
}

function createNeptuneTexture() {
  const { canvas, ctx } = createCanvas(1024, 512);
  
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#355df0');
  grad.addColorStop(0.4, '#2448d1');
  grad.addColorStop(0.8, '#2c52e3');
  grad.addColorStop(1, '#1a39ab');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // Methane cloud wisps
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 512;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fillRect(x, y, Math.random() * 120 + 30, 4);
  }

  // Great Dark Spot
  ctx.fillStyle = 'rgba(8, 16, 70, 0.6)';
  ctx.beginPath();
  ctx.ellipse(640, 320, 70, 36, 0, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

function createPlutoTexture() {
  const { canvas, ctx } = createCanvas(512, 256);
  ctx.fillStyle = '#b39985';
  ctx.fillRect(0, 0, 512, 256);

  // Tombaugh Regio Heart Glacier
  ctx.fillStyle = '#f5ebe1';
  ctx.beginPath();
  ctx.ellipse(280, 140, 65, 50, 0.2, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}
