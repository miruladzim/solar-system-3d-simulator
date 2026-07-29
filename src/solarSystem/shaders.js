const THREE = window.THREE;

// 1. Earth Volumetric Atmosphere Glow Shader
export const AtmosphereGlowShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = vec3(modelViewMatrix * vec4(position, 1.0));
      gl_Position = projectionMatrix * vec4(vPosition, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform vec3 color;
    void main() {
      vec3 viewVector = normalize(-vPosition);
      float intensity = pow(0.65 - dot(vNormal, viewVector), 2.5);
      gl_FragColor = vec4(color, intensity * 0.85);
    }
  `
};

// 2. Animated Sun Plasma Shader
export const SunPlasmaShader = {
  uniforms: {
    time: { value: 0 },
    sunTexture: { value: null }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform sampler2D sunTexture;
    varying vec2 vUv;
    varying vec3 vNormal;

    // Simplex noise approximation
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 st = vUv;
      float noise1 = snoise(st * 6.0 + vec2(time * 0.1, time * 0.05));
      float noise2 = snoise(st * 12.0 - vec2(time * 0.15, time * 0.2));
      
      vec4 texColor = texture2D(sunTexture, st + vec2(noise1 * 0.03, noise2 * 0.03));
      
      vec3 coreColor = vec3(1.0, 0.9, 0.4);
      vec3 flareColor = vec3(1.0, 0.35, 0.0);
      
      vec3 finalColor = mix(texColor.rgb * coreColor, flareColor, noise1 * 0.5 + 0.5);
      finalColor += vec3(pow(noise2 * 0.5 + 0.5, 3.0) * 0.4);

      gl_FragColor = vec4(finalColor * 1.3, 1.0);
    }
  `
};
