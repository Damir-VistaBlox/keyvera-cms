export function ConvergenceNode() {
  const origins = [
    { x1: 80, y1: 120 },  /* top-left */
    { x1: 320, y1: 60 },  /* top-center-left */
    { x1: 640, y1: 30 },  /* top-center */
    { x1: 960, y1: 60 },  /* top-center-right */
    { x1: 1200, y1: 140 }, /* top-right */
    { x1: 160, y1: 680 }, /* bottom-left */
    { x1: 1120, y1: 660 }, /* bottom-right */
    { x1: 640, y1: 750 }, /* bottom-center */
  ]

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
      viewBox="0 0 1280 800"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* ── Extra glow behind the node once lines have converged ── */}
        <radialGradient id="node-glow-h" cx="50%" cy="55%" r="10%">
          <stop offset="0%" stopColor="#0090fd" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#3d47fa" stopOpacity="0.25">
            <animate attributeName="stop-opacity" values="0.25;0.35;0.25" dur="8s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#6e0cf8" stopOpacity="0" />
        </radialGradient>

        {/* ── Line stroke — fades from transparent to visible to transparent ── */}
        <linearGradient id="line-fade-h" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0090fd" stopOpacity="0" />
          <stop offset="40%" stopColor="#0090fd" stopOpacity="0.5" />
          <stop offset="85%" stopColor="#3d47fa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6e0cf8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Glow behind the central node — pulse animation */}
      <circle cx="640" cy="440" r="80" fill="url(#node-glow-h)" />

      {/* Convergence lines — drawn from provider origins toward center */}
      {origins.map((origin, i) => (
        <g key={i} className="convergence-line" style={{ animationDelay: `${i * 0.12}s` } as React.CSSProperties}>
          <line
            x1={origin.x1} y1={origin.y1}
            x2={640} y2={440}
            stroke="url(#line-fade-h)"
            strokeWidth="1"
          />
        </g>
      ))}

      {/* Central convergence node — size + opacity pulse */}
      <g className="node-pulse">
        <circle cx="640" cy="440" r="6" fill="#0090fd" opacity="0.8" />
      </g>
      <circle cx="640" cy="440" r="12" fill="none" stroke="#0090fd" strokeWidth="0.5" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.15;0.4" dur="8s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

export function ConvergenceNodeInline() {
  const origins = [
    { x1: 100, y1: 200 }, { x1: 400, y1: 80 }, { x1: 880, y1: 100 },
    { x1: 1180, y1: 250 }, { x1: 60, y1: 600 }, { x1: 200, y1: 720 },
    { x1: 1080, y1: 700 }, { x1: 600, y1: 770 },
  ]

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
      viewBox="0 0 1280 800"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cline-fade-h" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0090fd" stopOpacity="0" />
          <stop offset="45%" stopColor="#0090fd" stopOpacity="0.4" />
          <stop offset="90%" stopColor="#3d47fa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6e0cf8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {origins.map((origin, i) => (
        <g key={i} className="convergence-line" style={{ animationDelay: `${i * 0.1}s` } as React.CSSProperties}>
          <line
            x1={origin.x1} y1={origin.y1}
            x2={640} y2={400}
            stroke="url(#cline-fade-h)"
            strokeWidth="0.8"
          />
        </g>
      ))}

      <circle cx="640" cy="400" r="4" fill="#0090fd" opacity="0.6" className="node-pulse" />
      <circle cx="640" cy="400" r="8" fill="none" stroke="#0090fd" strokeWidth="0.5" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="8s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}
