// /src/app/(dashboard)/admin/copy-refinement/page.tsx

import { CopyRefinementTool } from "@/components/admin/copy-refinement-tool";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Copy Refinement Tool",
  description: "Utiliza la IA para mejorar los textos de marketing de Liabell.",
};

/**
 * Página que aloja la herramienta de refinamiento de copy con IA.
 */
export default function CopyRefinementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Herramienta de Refinamiento de Copy con IA</h1>
        <p className="text-muted-foreground">
          Genera variaciones de textos para la landing page, incorporando palabras clave SEO y lenguaje persuasivo.
        </p>
      </div>
      <CopyRefinementTool />
    </div>
  );
}
