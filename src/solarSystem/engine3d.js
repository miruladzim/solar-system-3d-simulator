// Self-Contained High-Performance WebGL 3D Engine for Solar System Exploration
// Zero External Dependencies | Zero CDN Block Vulnerability | 100% Reliable

// ==========================================
// 1. 3D MATH ENGINE (Vector3 & Matrix4)
// ==========================================
export class Vec3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  clone() {
    return new Vec3(this.x, this.y, this.z);
  }

  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }

  scale(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize() {
    const len = this.length();
    if (len > 0) {
      this.x /= len;
      this.y /= len;
      this.z /= len;
    }
    return this;
  }

  static dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  static cross(a, b) {
    return new Vec3(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x
    );
  }

  static lerp(a, b, t) {
    return new Vec3(
      a.x + (b.x - a.x) * t,
      a.y + (b.y - a.y) * t,
      a.z + (b.z - a.z) * t
    );
  }
}

export class Mat4 {
  constructor() {
    this.elements = new Float32Array(16);
    this.identity();
  }

  identity() {
    const e = this.elements;
    e[0] = 1; e[4] = 0; e[8] = 0;  e[12] = 0;
    e[1] = 0; e[5] = 1; e[9] = 0;  e[13] = 0;
    e[2] = 0; e[6] = 0; e[10] = 1; e[14] = 0;
    e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
    return this;
  }

  static perspective(fovRad, aspect, near, far) {
    const m = new Mat4();
    const f = 1.0 / Math.tan(fovRad / 2);
    const rangeInv = 1.0 / (near - far);
    const e = m.elements;

    e[0] = f / aspect;
    e[5] = f;
    e[10] = (near + far) * rangeInv;
    e[11] = -1;
    e[14] = (2 * near * far) * rangeInv;
    e[15] = 0;
    return m;
  }

  static lookAt(eye, center, up) {
    const m = new Mat4();
    const z = eye.clone().sub(center).normalize();
    const x = Vec3.cross(up, z).normalize();
    const y = Vec3.cross(z, x).normalize();
    const e = m.elements;

    e[0] = x.x; e[4] = x.y; e[8] = x.z;  e[12] = -Vec3.dot(x, eye);
    e[1] = y.x; e[5] = y.y; e[9] = y.z;  e[13] = -Vec3.dot(y, eye);
    e[2] = z.x; e[6] = z.y; e[10] = z.z; e[14] = -Vec3.dot(z, eye);
    e[3] = 0;   e[7] = 0;   e[11] = 0;   e[15] = 1;
    return m;
  }

  static multiply(a, b) {
    const out = new Mat4();
    const ae = a.elements;
    const be = b.elements;
    const oe = out.elements;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        oe[j * 4 + i] =
          ae[i] * be[j * 4] +
          ae[4 + i] * be[j * 4 + 1] +
          ae[8 + i] * be[j * 4 + 2] +
          ae[12 + i] * be[j * 4 + 3];
      }
    }
    return out;
  }
}

// ==========================================
// 2. GEOMETRY GENERATORS
// ==========================================
export function createSphereGeometry(radius = 1, stacks = 48, slices = 48) {
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i <= stacks; i++) {
    const phi = (i * Math.PI) / stacks;
    const sinPhi = Math.sin(phi);
    const cosPhi = Math.cos(phi);

    for (let j = 0; j <= slices; j++) {
      const theta = (j * 2 * Math.PI) / slices;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      const x = cosTheta * sinPhi;
      const y = cosPhi;
      const z = sinTheta * sinPhi;
      const u = 1 - j / slices;
      const v = i / stacks;

      positions.push(x * radius, y * radius, z * radius);
      normals.push(x, y, z);
      uvs.push(u, v);
    }
  }

  for (let i = 0; i < stacks; i++) {
    for (let j = 0; j < slices; j++) {
      const first = i * (slices + 1) + j;
      const second = first + slices + 1;

      indices.push(first, second, first + 1);
      indices.push(second, second + 1, first + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    uvs: new Float32Array(uvs),
    indices: new Uint16Array(indices)
  };
}

export function createRingGeometry(innerRadius, outerRadius, segments = 64) {
  const positions = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i <= segments; i++) {
    const theta = (i * 2 * Math.PI) / segments;
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);

    // Inner vertex
    positions.push(cos * innerRadius, 0, sin * innerRadius);
    uvs.push(0, i / segments);

    // Outer vertex
    positions.push(cos * outerRadius, 0, sin * outerRadius);
    uvs.push(1, i / segments);
  }

  for (let i = 0; i < segments; i++) {
    const first = i * 2;
    indices.push(first, first + 1, first + 2);
    indices.push(first + 1, first + 3, first + 2);
  }

  return {
    positions: new Float32Array(positions),
    uvs: new Float32Array(uvs),
    indices: new Uint16Array(indices)
  };
}
