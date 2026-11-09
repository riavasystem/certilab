import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Target, Timer } from "lucide-react";
import { getExamAttempts } from "@/lib/actions";

export default async function Examen() {
  const attempts = await getExamAttempts();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Centro de Exámenes</h2>
        <p className="text-muted-foreground text-lg">Práctica con preguntas reales y simulacros de examen.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Timer className="h-6 w-6" />
              <Badge variant="secondary">Oficial</Badge>
            </div>
            <CardTitle className="text-2xl">Simulacro Completo</CardTitle>
            <CardDescription>
              Replica las condiciones reales del examen AWS AI Practitioner.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4 text-sm text-muted-foreground">
            <ul className="space-y-2 list-disc list-inside">
              <li>65 preguntas (selección única y múltiple).</li>
              <li>90 minutos de duración.</li>
              <li>Distribución proporcional por dominio.</li>
              <li>Resultados detallados al finalizar.</li>
            </ul>
            <Button className="w-full mt-4" size="lg">Iniciar Simulacro</Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-2 text-orange-500 mb-2">
              <Target className="h-6 w-6" />
              <Badge variant="outline">Personalizado</Badge>
            </div>
            <CardTitle className="text-2xl">Práctica por Dominio</CardTitle>
            <CardDescription>
              Enfócate en áreas específicas donde necesites mejorar.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4 text-sm text-muted-foreground">
            <ul className="space-y-2 list-disc list-inside">
              <li>Elige uno o más dominios.</li>
              <li>Selecciona la cantidad de preguntas.</li>
              <li>Modo Aprendizaje: explicación inmediata.</li>
              <li>Sin límite de tiempo.</li>
            </ul>
            <Button variant="outline" className="w-full mt-4" size="lg">Configurar Práctica</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-green-500" />
            Historial de Intentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {attempts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aún no has realizado ningún examen. ¡Empieza hoy mismo!
            </div>
          ) : (
            <div className="space-y-2">
              {attempts.map((attempt) => (
                <div key={attempt.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <span>Intento #{attempt.id} - {attempt.mode}</span>
                  <Badge>{attempt.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
