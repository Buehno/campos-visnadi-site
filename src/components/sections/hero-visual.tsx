import type { CSSProperties } from "react";

const planes = [
  { x: 24, y: 330, label: "Contrato", lines: [132, 168, 96], i: 0 },
  { x: 160, y: 196, label: "Licença de software", lines: [156, 120, 172], i: 1, highlight: true },
  { x: 282, y: 62, label: "Política interna", lines: [112, 150, 88], i: 2 },
];

/**
 * Composição abstrata do hero: planos translúcidos (instrumentos jurídicos)
 * organizados ao longo da diagonal do corte do "V" oficial — direção e ordem.
 * Puramente decorativa. Camadas com data-depth recebem parallax sutil.
 */
export function HeroVisual() {
  return (
    <svg
      viewBox="0 0 520 560"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hv-accent" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#c0247e" />
          <stop offset="1" stopColor="#e07b2e" />
        </linearGradient>
        <linearGradient id="hv-plane" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c0f3c" stopOpacity="0.92" />
          <stop offset="1" stopColor="#1a0a24" stopOpacity="0.86" />
        </linearGradient>
        <radialGradient id="hv-glow" cx="0.72" cy="0.18" r="0.7">
          <stop offset="0" stopColor="#c0247e" stopOpacity="0.3" />
          <stop offset="0.6" stopColor="#c0247e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Campo circular: eco do círculo do símbolo, sem redesenhar a marca. */}
      <g data-depth="0.35">
        <circle cx="300" cy="260" r="250" fill="url(#hv-glow)" />
        <circle cx="300" cy="260" r="250" fill="none" stroke="#f8f6f3" strokeOpacity="0.12" strokeDasharray="2 10" />
        <circle cx="300" cy="260" r="176" fill="none" stroke="#f8f6f3" strokeOpacity="0.07" />
      </g>

      {/* Eixo de direção no ângulo do corte do "V" oficial — atrás dos planos. */}
      <g data-depth="0.8">
        <path
          className="enter-draw"
          style={{ "--len": 680, "--i": 0 } as CSSProperties}
          d="M96 560 L 430 -40"
          stroke="url(#hv-accent)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      {/* Conexões entre instrumentos. */}
      <g data-depth="1" stroke="#f8f6f3" strokeOpacity="0.3" strokeWidth="1" fill="none">
        <path className="enter-draw" style={{ "--len": 200, "--i": 2 } as CSSProperties} d="M244 400 H 300 L 330 336" />
        <path className="enter-draw" style={{ "--len": 200, "--i": 3 } as CSSProperties} d="M380 266 H 420 L 440 202" />
      </g>

      {planes.map((p) => (
        <g
          key={p.label}
          data-depth={1.1 + p.i * 0.35}
          className="enter-plane"
          style={{ "--i": p.i } as CSSProperties}
        >
          <g transform={`translate(${p.x} ${p.y})`}>
            <rect
              width="220"
              height="140"
              rx="16"
              fill="url(#hv-plane)"
              stroke="#f8f6f3"
              strokeOpacity={p.highlight ? 0.42 : 0.2}
            />
            {p.highlight && <rect x="20" y="0" width="84" height="3" rx="1.5" fill="url(#hv-accent)" />}
            <text
              x="20"
              y="34"
              fill="#f8f6f3"
              fillOpacity="0.76"
              fontSize="11"
              fontWeight="600"
              letterSpacing="1.6"
              style={{ textTransform: "uppercase", fontFamily: "var(--font-body)" }}
            >
              {p.label}
            </text>
            {p.lines.map((w, li) => (
              <rect
                key={li}
                x="20"
                y={60 + li * 18}
                width={w}
                height="6"
                rx="3"
                fill="#f8f6f3"
                fillOpacity={li === 0 ? 0.26 : 0.13}
              />
            ))}
            <circle cx="196" cy="116" r="8" fill="none" stroke="#f8f6f3" strokeOpacity="0.4" />
            {p.highlight && (
              <path d="M191.5 116 l3 3 l6-6.5" fill="none" stroke="#e27bb5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </g>
        </g>
      ))}

      {/* Nó de destino: a decisão. */}
      <g data-depth="1.9">
        <circle cx="452" cy="148" r="7" fill="#e07b2e" className="enter-plane" style={{ "--i": 4 } as CSSProperties} />
        <circle cx="452" cy="148" r="16" fill="none" stroke="#e07b2e" strokeOpacity="0.45" className="enter-plane" style={{ "--i": 5 } as CSSProperties} />
      </g>
    </svg>
  );
}
