// /src/components/icons.tsx

import type { SVGProps } from "react";

/**
 * Componente para el logo de Liabell.
 * Es un SVG en línea para un rendimiento óptimo y capacidad de estilización.
 * @param props Propiedades estándar de SVG.
 */
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="1em"
      height="1em"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "rgb(255, 45, 119)", stopOpacity: 1 }} /> 
          <stop offset="100%" style={{ stopColor: "rgb(0, 229, 255)", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        fill="url(#logo-gradient)"
        d="M50 5C45.03 5 41 9.03 41 14v2.48C29.61 19.43 21 29.56 21 41.5V65h58V41.5c0-11.94-8.61-22.07-20-25.02V14c0-4.97-4.03-9-9-9zm0 85c-4.14 0-7.5-3.36-7.5-7.5h15c0 4.14-3.36 7.5-7.5 7.5z"
      />
      <g fill="black">
        <path d="M47.1 65l-4.5-3.2-3.3 2.7 1.2-4.9-4.2-3.1 5-.1 1.7-4.8 2.3 4.5 5 .5-3.8 3.3 1.5 4.9-4.9-2.5zm15.7-1.1l-4.5-3.2-3.3 2.7 1.2-4.9-4.2-3.1 5-.1 1.7-4.8 2.3 4.5 5 .5-3.8 3.3 1.5 4.9-4.9-2.5zM38 72.3l-4.5-3.2-3.3 2.7 1.2-4.9-4.2-3.1 5-.1 1.7-4.8 2.3 4.5 5 .5-3.8 3.3 1.5 4.9-4.9-2.5zm20.6 1.4l-4.5-3.2-3.3 2.7 1.2-4.9-4.2-3.1 5-.1 1.7-4.8 2.3 4.5 5 .5-3.8 3.3 1.5 4.9-4.9-2.5zM56 79l-4.5-3.2-3.3 2.7 1.2-4.9-4.2-3.1 5-.1 1.7-4.8 2.3 4.5 5 .5-3.8 3.3 1.5 4.9-4.9-2.5z" />
        <circle cx="48" cy="65" r="3"/>
        <circle cx="59" cy="63" r="3"/>
        <circle cx="40" cy="72" r="3"/>
        <circle cx="61" cy="74" r="3"/>
        <circle cx="53" cy="78" r="3"/>
        <circle cx="67" cy="68" r="3"/>
        <circle cx="34" cy="65" r="3"/>
        <circle cx="72" cy="58" r="3"/>
        <path stroke="black" strokeWidth="1.5" fill="none" d="M48 65l11-2m-11 2L40 72m8-7l-8-7m19 8l-2-10m2 10l8-5m-19 15l-3-13m14 1s-5-14-5-14m-1 15l-1-10m12 3l-1-10" />
      </g>
    </svg>
  );
}
