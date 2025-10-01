// /src/components/icons.tsx

import type { SVGProps } from "react";

/**
 * Componente para el logo de Laibell.
 * Es un SVG en línea para un rendimiento óptimo y capacidad de estilización.
 * @param props Propiedades estándar de SVG.
 */
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <g fill="currentColor">
        <path d="M 64,32 L 64,224 L 112,224 L 112,144 L 192,144 L 192,224 L 240,224 L 240,32 L 192,32 L 192,112 L 112,112 L 112,32 L 64,32 Z M 16,32 L 16,80 L 48,80 L 48,32 L 16,32 Z" />
      </g>
    </svg>
  );
}
