"use client";

import { useEffect, useState, useRef } from "react";

export default function Scene3D() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    let animationId: number;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Animation variables
    let time = 0;
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      angle: number;
      speed: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.2,
      });
    }

    // Animation loop
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.1)");
      gradient.addColorStop(1, "rgba(99, 102, 241, 0.05)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated particles
      particles.forEach((particle) => {
        particle.angle += particle.speed * 0.01;
        particle.x += Math.cos(particle.angle) * 0.5;
        particle.y += Math.sin(particle.angle) * 0.5;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow
        const glowGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 3
        );
        glowGradient.addColorStop(0, "rgba(139, 92, 246, 0.8)");
        glowGradient.addColorStop(1, "rgba(139, 92, 246, 0)");
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", updateSize);
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900/20 to-indigo-900/20 animate-pulse" />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "transparent" }}
    />
  );
}
