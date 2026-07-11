import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CosmicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Performance & Settings ---
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isTabActive = !document.hidden;

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030405');
    scene.fog = new THREE.FogExp2('#08131c', 0.0015);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    containerRef.current.appendChild(renderer.domElement);

    // --- Mouse Parallax ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      if (prefersReducedMotion) return;
      mouseX = (event.clientX - windowHalfX) * 0.05;
      mouseY = (event.clientY - windowHalfY) * 0.05;
    };
    document.addEventListener('mousemove', onDocumentMouseMove);

    // --- Groups for Animation ---
    const starGroup = new THREE.Group();
    const dustGroup = new THREE.Group();
    const nebulaGroup = new THREE.Group();
    const waveGroup = new THREE.Group();
    scene.add(starGroup);
    scene.add(dustGroup);
    scene.add(nebulaGroup);
    scene.add(waveGroup);

    // --- 1. Live Stars ---
    const createStars = () => {
      const starGeometry = new THREE.BufferGeometry();
      const starCount = 3000;
      const starPositions = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);
      const starSizes = new Float32Array(starCount);

      const color1 = new THREE.Color('#ffffff');
      const color2 = new THREE.Color('#59d8ff'); // Cyan hint

      for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 2000;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

        const mixedColor = color1.clone().lerp(color2, Math.random() * 0.3);
        starColors[i * 3] = mixedColor.r;
        starColors[i * 3 + 1] = mixedColor.g;
        starColors[i * 3 + 2] = mixedColor.b;

        starSizes[i] = Math.random() * 1.5;
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
      starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

      // Custom shader material to use individual sizes
      const starMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          attribute float size;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            // Circular particle
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = 1.0 - (dist * 2.0); // Soft edge
            gl_FragColor = vec4(vColor, alpha * 0.8);
          }
        `,
        transparent: true,
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      const stars = new THREE.Points(starGeometry, starMaterial);
      starGroup.add(stars);
      return starMaterial;
    };
    const starMat = createStars();

    // --- 2. Galaxy Dust ---
    const createDust = () => {
      const dustGeometry = new THREE.BufferGeometry();
      const dustCount = 800;
      const dustPositions = new Float32Array(dustCount * 3);

      for (let i = 0; i < dustCount; i++) {
        dustPositions[i * 3] = (Math.random() - 0.5) * 1500;
        dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 1500;
        dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
      }

      dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

      // Canvas generated particle texture
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d')!;
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.2, 'rgba(89,216,255,0.8)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
      
      const dustTexture = new THREE.CanvasTexture(canvas);

      const dustMaterial = new THREE.PointsMaterial({
        size: 15,
        map: dustTexture,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: new THREE.Color('#59d8ff')
      });

      const dust = new THREE.Points(dustGeometry, dustMaterial);
      dustGroup.add(dust);
    };
    createDust();

    // --- 3. Moving Nebula / Volumetric Fog ---
    const createNebula = () => {
      // Create soft cloud planes using overlapping canvases
      const createCloudTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d')!;
        const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        gradient.addColorStop(0, 'rgba(8, 19, 28, 0.6)'); // Dark blue core
        gradient.addColorStop(0.4, 'rgba(8, 19, 28, 0.3)');
        gradient.addColorStop(0.8, 'rgba(89, 216, 255, 0.05)'); // Cyan edge
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
        return new THREE.CanvasTexture(canvas);
      };

      const cloudTex = createCloudTexture();
      const cloudGeo = new THREE.PlaneGeometry(800, 800);
      const cloudMat = new THREE.MeshBasicMaterial({
        map: cloudTex,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      for (let i = 0; i < 15; i++) {
        const cloud = new THREE.Mesh(cloudGeo, cloudMat);
        cloud.position.set(
          (Math.random() - 0.5) * 1000,
          (Math.random() - 0.5) * 600,
          -Math.random() * 800
        );
        cloud.rotation.z = Math.random() * Math.PI * 2;
        cloud.userData = {
          rotationSpeed: (Math.random() - 0.5) * 0.001,
          driftSpeedX: (Math.random() - 0.5) * 0.1,
          driftSpeedY: (Math.random() - 0.5) * 0.1
        };
        nebulaGroup.add(cloud);
      }
    };
    createNebula();

    // --- 4. Energy Waves (Giant Rings) ---
    const createEnergyWaves = () => {
      const waveGeo = new THREE.TorusGeometry(600, 2, 16, 100);
      const waveMat = new THREE.MeshBasicMaterial({
        color: '#59d8ff',
        transparent: true,
        opacity: 0.03,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });

      for (let i = 0; i < 3; i++) {
        const wave = new THREE.Mesh(waveGeo, waveMat);
        wave.position.set(0, 0, -500 + i * 150);
        wave.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.5;
        wave.rotation.y = (Math.random() - 0.5) * 0.5;
        wave.userData = {
          rotationSpeed: (Math.random() - 0.5) * 0.0005,
          scaleSpeed: 0.0005 * (i + 1)
        };
        waveGroup.add(wave);
      }
    };
    createEnergyWaves();

    // --- Animation Loop ---
    let frameId: number;
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (!isTabActive) return; // Pause when inactive

      const delta = prefersReducedMotion ? 0.001 : 0.005;
      time += delta;

      // Parallax easing
      targetX = mouseX * 0.5;
      targetY = mouseY * 0.5;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Star drift
      starMat.uniforms.time.value = time;
      starGroup.rotation.y = time * 0.02;
      starGroup.rotation.x = time * 0.01;

      // Dust drift
      dustGroup.rotation.y = time * 0.05;
      dustGroup.rotation.z = time * 0.03;

      // Nebula evolution
      nebulaGroup.children.forEach((cloud) => {
        cloud.rotation.z += cloud.userData.rotationSpeed * (prefersReducedMotion ? 0.2 : 1);
        cloud.position.x += cloud.userData.driftSpeedX * (prefersReducedMotion ? 0.2 : 1);
        cloud.position.y += cloud.userData.driftSpeedY * (prefersReducedMotion ? 0.2 : 1);
        
        // Wrap around
        if (cloud.position.x > 800) cloud.position.x = -800;
        if (cloud.position.x < -800) cloud.position.x = 800;
        if (cloud.position.y > 600) cloud.position.y = -600;
        if (cloud.position.y < -600) cloud.position.y = 600;
      });

      // Energy waves pulsing
      waveGroup.children.forEach((wave) => {
        wave.rotation.z += wave.userData.rotationSpeed;
        const s = 1 + Math.sin(time * 0.5 + wave.position.z) * 0.05;
        wave.scale.set(s, s, s);
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose Geometries/Materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(m => m.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -10,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#030405' // Base fallback
      }}
      aria-hidden="true"
    />
  );
}
