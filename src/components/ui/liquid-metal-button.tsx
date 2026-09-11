"use client";

/**
 * Liquid Metal — borda metálica animada via shader WebGL.
 * Base: componente "liquid-metal-button" fornecido pelo cliente
 * (shader @paper-design/shaders). Adaptações documentadas em
 * docs/component-sources.md:
 *  - dimensões fluidas (a borda envolve qualquer botão/link, sem px fixos);
 *  - API atual da lib (dispose, u_image vazio, sizing uniforms);
 *  - shader carregado depois da hidratação (não compete com o LCP);
 *  - fallback em CSS enquanto o WebGL não existe ou falha;
 *  - animação parada em prefers-reduced-motion;
 *  - rótulo com contraste AA e foco visível; sem ripple nem 3D.
 */

import type React from "react";
import { forwardRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ShaderMountLike = {
  setSpeed: (speed?: number) => void;
  dispose: () => void;
};

const IDLE_SPEED = 0.45;
const HOVER_SPEED = 1;

function useLiquidMetal(tint: [number, number, number, number]) {
  const shaderRef = useRef<HTMLSpanElement>(null);
  const mount = useRef<ShaderMountLike | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    const el = shaderRef.current;
    if (!el) return;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;

    const start = () =>
      import("@paper-design/shaders")
        .then(({ ShaderMount, liquidMetalFragmentShader, defaultObjectSizing, ShaderFitOptions, emptyPixel }) => {
          if (cancelled || !shaderRef.current) return;
          const img = new Image();
          img.src = emptyPixel;
          mount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_image: img,
              u_imageAspectRatio: 1,
              u_isImage: false,
              u_colorBack: [0, 0, 0, 0],
              u_colorTint: tint,
              u_repetition: 4,
              u_softness: 0.5,
              u_shiftRed: 0.3,
              u_shiftBlue: 0.3,
              u_distortion: 0.1,
              u_contour: 0,
              u_angle: 45,
              u_shape: 0,
              u_fit: ShaderFitOptions.cover,
              u_scale: 1,
              u_rotation: defaultObjectSizing.rotation,
              u_originX: defaultObjectSizing.originX,
              u_originY: defaultObjectSizing.originY,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
              u_worldWidth: defaultObjectSizing.worldWidth,
              u_worldHeight: defaultObjectSizing.worldHeight,
            },
            { alpha: true, premultipliedAlpha: false },
            reduced.current ? 0 : IDLE_SPEED,
            1200,
            1,
          ) as unknown as ShaderMountLike;
          el.dataset.ready = "true";
        })
        .catch(() => {
          // Sem WebGL: o fallback em CSS permanece.
        });

    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(start) : window.setTimeout(start, 200);

    return () => {
      cancelled = true;
      if (!w.requestIdleCallback) window.clearTimeout(id);
      mount.current?.dispose();
      mount.current = null;
    };
    // tint é estático por instância
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const speed = (s: number) => {
    if (!reduced.current) mount.current?.setSpeed(s);
  };

  return {
    shaderRef,
    handlers: {
      onPointerEnter: () => speed(HOVER_SPEED),
      onPointerLeave: () => speed(IDLE_SPEED),
      onFocus: () => speed(HOVER_SPEED),
      onBlur: () => speed(IDLE_SPEED),
    },
  };
}

type FrameProps = {
  children: React.ReactNode;
  className?: string;
  /** Tonalidade RGBA (0–1) aplicada ao metal. Padrão: neutro. */
  tint?: [number, number, number, number];
};

type LiquidMetalLinkProps = FrameProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

/** Link com borda liquid metal. Use em poucos CTAs — é um destaque, não padrão. */
export const LiquidMetalLink = forwardRef<HTMLAnchorElement, LiquidMetalLinkProps>(
  function LiquidMetalLink({ children, className, tint = [1, 1, 1, 1], ...props }, ref) {
    const { shaderRef, handlers } = useLiquidMetal(tint);
    return (
      <span className="lm-frame" {...handlers}>
        <span ref={shaderRef} className="lm-shader" aria-hidden="true" />
        <a ref={ref} className={cn("lm-inner btn", className)} {...props}>
          {children}
        </a>
      </span>
    );
  },
);

type LiquidMetalButtonProps = FrameProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Compatibilidade com a API original. */
    label?: string;
    viewMode?: "text" | "icon";
  };

/** Botão com borda liquid metal (mantém a API original: label/onClick/viewMode). */
export const LiquidMetalButton = forwardRef<HTMLButtonElement, LiquidMetalButtonProps>(
  function LiquidMetalButton(
    { children, className, tint = [1, 1, 1, 1], label = "Get Started", viewMode = "text", type = "button", ...props },
    ref,
  ) {
    const { shaderRef, handlers } = useLiquidMetal(tint);
    return (
      <span className="lm-frame" {...handlers}>
        <span ref={shaderRef} className="lm-shader" aria-hidden="true" />
        <button
          ref={ref}
          type={type}
          aria-label={viewMode === "icon" ? label : undefined}
          className={cn("lm-inner btn", viewMode === "icon" && "aspect-square px-0", className)}
          {...props}
        >
          {children ?? (viewMode === "text" ? label : null)}
        </button>
      </span>
    );
  },
);
