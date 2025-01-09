"use client";
import { useCallback } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      className="!fixed fixed inset-0 -z-10 h-screen w-screen"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false, // Changed to false so we can control positioning
          zIndex: -1,
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: ["#cba6f7", "#f5c2e7", "#89b4fa", "#89dceb"],
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.8,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 2000,
            },
            value: 100,
            limit: 250,
          },
          opacity: {
            value: 0.15,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
          links: {
            enable: true,
            distance: 150,
            color: "#cba6f7",
            opacity: 0.1,
            width: 1,
          },
        },
        detectRetina: true,
        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: {
                number: {
                  value: 50,
                },
              },
            },
          },
        ],
      }}
    />
  );
}
