// /src/components/icons.tsx

import Image from "next/image";
import type { SVGProps } from "react";

/**
 * Componente para el logo de Liabell.
 * Muestra el isologo desde la carpeta public.
 * @param props Propiedades estándar de SVG, aunque se usan para el div contenedor.
 */
export function Logo(props: SVGProps<SVGSVGElement>) {
  const { className, ...rest } = props;
  return (
    <div className={className} {...rest}>
      <Image
        src="/images/isologo.png"
        alt="Logo de Liabell"
        width={64}
        height={64}
        className="h-full w-full"
        priority
      />
    </div>
  );
}
