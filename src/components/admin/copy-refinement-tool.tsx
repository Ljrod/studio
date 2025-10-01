"use client";

// /srcsrc/components/admin/copy-refinement-tool.tsx

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { refineCopy, type RefineCopyOutput } from "@/ai/flows/ai-powered-copy-refinement";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Esquema de validación para el formulario de la herramienta de IA.
const formSchema = z.object({
  originalCopy: z.string().min(10, "El texto original debe tener al menos 10 caracteres."),
  seoKeywords: z.string().min(3, "Debes añadir al menos una palabra clave."),
});

type FormValues = z.infer<typeof formSchema>;

/**
 * Componente principal de la herramienta de refinamiento de copy con IA.
 * Permite a un administrador introducir texto y palabras clave para obtener
 * una versión mejorada por IA.
 */
export function CopyRefinementTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RefineCopyOutput | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);

    try {
      const aiResult = await refineCopy({
        ...data,
        brandName: "Laibell",
      });
      setResult(aiResult);
    } catch (error) {
      console.error("Error al llamar al flujo de Genkit:", error);
      toast({
        title: "Error de IA",
        description: "No se pudo conectar con el servicio de IA. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Columna del formulario */}
      <Card>
        <CardHeader>
          <CardTitle>Generador de Copy</CardTitle>
          <CardDescription>Introduce el texto a mejorar y las palabras clave objetivo.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="originalCopy">Texto Original</Label>d
              <Textarea
                id="originalCopy"
                placeholder="Ej: Creamos páginas web para negocios."
                rows={6}
                {...register("originalCopy")}
              />
              {errors.originalCopy && <p className="text-sm text-destructive">{errors.originalCopy.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoKeywords">Palabras Clave SEO (separadas por comas)</Label>
              <Input
                id="seoKeywords"
                placeholder="Ej: diseño web, marketing digital, crecimiento"
                {...register("seoKeywords")}
              />
              {errors.seoKeywords && <p className="text-sm text-destructive">{errors.seoKeywords.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Refinar Copy
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Columna del resultado */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle>Resultado de IA</CardTitle>
          <CardDescription>Aquí aparecerá la sugerencia generada por la inteligencia artificial.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {result ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Copy Refinado</h3>
                <p className="text-foreground/90 whitespace-pre-wrap">{result.refinedCopy}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Explicación</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.explanation}</p>
              </div>
            </div>
          ) : (
            !isLoading && <p className="text-center text-muted-foreground py-16">El resultado se mostrará aquí.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
