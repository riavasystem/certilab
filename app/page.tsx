import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Play, BookOpen, Trophy, Clipboard } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Bienvenido, Estudiante</h2>
        <p className="text-muted-foreground">Aquí tienes un resumen de tu progreso para el AWS Certified AI Practitioner.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Progreso General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15%</div>
            <Progress value={15} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Preguntas Respondidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 / 300</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Último Puntaje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">78%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Días de Racha</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Continuar Estudiando</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1">Dominio 2: Fundamentos de IA Generativa</p>
              <p className="text-sm text-muted-foreground mb-4">Lección: Modelos de Difusión vs Transformers</p>
              <Link href="/aprendizaje">
                <Button className="w-full">
                  <Play className="mr-2 h-4 w-4" /> Reanudar Lección
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Próximo Paso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Clipboard className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Simulacro de Examen</p>
                <p className="text-xs text-muted-foreground">Recomendado para medir tu avance actual.</p>
              </div>
              <Link href="/examen">
                <Button variant="outline">Ir a Examen</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
