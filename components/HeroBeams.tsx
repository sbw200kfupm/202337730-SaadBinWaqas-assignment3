"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";

const beamsEnabled = process.env.NEXT_PUBLIC_ENABLE_BEAMS !== "false";
const beamsDelayMs = 3200;

type BeamsComponentProps = {
  beamWidth?: number;
  beamHeight?: number;
  beamNumber?: number;
  lightColor?: string;
  speed?: number;
  scale?: number;
  rotation?: number;
};

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

const canRunBeams = () => {
  if (typeof window === "undefined") {
    return false;
  }

  if (!beamsEnabled) {
    return false;
  }

  const largeScreen = window.matchMedia("(min-width: 960px)").matches;
  const allowsMotion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  return largeScreen && allowsMotion && finePointer;
};

export function HeroBeams() {
  const [BeamsComponent, setBeamsComponent] = useState<ComponentType<BeamsComponentProps> | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!canRunBeams()) {
      return undefined;
    }

    const idleWindow = window as IdleWindow;
    let cancelled = false;
    let delayId = 0;

    const loadBeams = () => {
      delayId = window.setTimeout(() => {
        import("@/components/Beams")
          .then((module) => {
            if (!cancelled) {
              setBeamsComponent(() => module.default);
            }
          })
          .catch((error) => {
            console.error("Hero background could not be loaded.", error);
          });
      }, beamsDelayMs);
    };

    const idleId = idleWindow.requestIdleCallback
      ? idleWindow.requestIdleCallback(loadBeams, { timeout: 2500 })
      : window.setTimeout(loadBeams, 1800);

    const syncVisibility = () => setIsVisible(!document.hidden);
    document.addEventListener("visibilitychange", syncVisibility);

    return () => {
      cancelled = true;
      window.clearTimeout(delayId);

      if (idleWindow.cancelIdleCallback && typeof idleId === "number") {
        idleWindow.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }

      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  if (!BeamsComponent || !isVisible) {
    return null;
  }

  return (
    <div className="hero-beams" aria-hidden="true">
      <BeamsComponent
        beamWidth={2.6}
        beamHeight={22}
        beamNumber={4}
        lightColor="#ffffff"
        speed={0.55}
        scale={0.06}
        rotation={30}
      />
    </div>
  );
}
