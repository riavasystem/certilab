import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { getDomains } from "@/lib/actions";
import Link from "next/link";

async function AprendizajeContent() {
  const dominios = await getDomains();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Módulos de Aprendizaje V2</h2>
        <p className="text-muted-foreground text-lg">Selecciona un dominio para comenzar o continuar tus estudios.</p>
      </div>

      <div className="grid gap-6">
        {dominios.map((dominio) => (
          <Card key={dominio.id} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  {dominio.name}
                </CardTitle>
                <Badge variant="outline">Peso: {dominio.weight}%</Badge>
              </div>
              <CardDescription>Objetivos oficiales del examen AWS AIF-C01</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso del dominio</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <Button asChild className="w-full">
                  <Link href={`/aprendizaje/${dominio.id}`}>Comenzar</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Aprendizaje() {
  return (
    <Suspense fallback={<div>Cargando dominios...</div>}>
      <AprendizajeContent />
    </Suspense>
  );
}
