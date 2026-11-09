import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";

const DOMINIOS = [
  { id: 1, name: "Fundamentos de IA y ML", weight: 20, progress: 40 },
  { id: 2, name: "Fundamentos de IA generativa", weight: 24, progress: 10 },
  { id: 3, name: "Aplicaciones de modelos fundacionales", weight: 28, progress: 0 },
  { id: 4, name: "Directrices de IA responsable", weight: 14, progress: 0 },
  { id: 5, name: "Seguridad, cumplimiento y gobernanza de IA", weight: 14, progress: 0 },
];

export default function Aprendizaje() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Módulos de Aprendizaje</h2>
        <p className="text-muted-foreground text-lg">Selecciona un dominio para comenzar o continuar tus estudios.</p>
      </div>

      <div className="grid gap-6">
        {DOMINIOS.map((dominio) => (
          <Card key={dominio.id} className="hover:border-primary/50 cursor-pointer transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Dominio {dominio.id}: {dominio.name}
                </CardTitle>
                <Badge variant="outline">Peso: {dominio.weight}%</Badge>
              </div>
              <CardDescription>Objetivos oficiales del examen AWS AIF-C01</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso del dominio</span>
                  <span>{dominio.progress}%</span>
                </div>
                <Progress value={dominio.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
