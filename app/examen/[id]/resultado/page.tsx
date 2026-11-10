import { Suspense } from "react";
import { getExamResults } from "@/lib/actions";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

async function ResultadoContent({ id }: { id: string }) {
  const result = await getExamResults(parseInt(id));
  if (!result.attempt) notFound();

  const { attempt, detailedResults } = result;
  const correctCount = detailedResults.filter(r => r.isCorrect).length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Resultados del Examen #{attempt.id}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Resumen</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">Puntaje: {attempt.score}%</p>
          <p>Preguntas correctas: {correctCount} / {detailedResults.length}</p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold">Revisión</h2>
      {detailedResults.map((r, index) => (
        <Card key={r.id} className={r.isCorrect ? "border-green-500" : "border-red-500"}>
          <CardHeader>
            <CardTitle className="text-lg">
              Pregunta {index + 1}
              <Badge className="ml-2" variant={r.isCorrect ? "default" : "destructive"}>
                {r.isCorrect ? "Correcta" : "Incorrecta"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium mb-2">{r.questionText}</p>
            <p className="text-sm text-muted-foreground">Tu respuesta: {String(r.userAnswer)}</p>
            {!r.isCorrect && (
              <p className="text-sm text-green-600 mt-1">Respuesta correcta: {String(r.correctAnswer)}</p>
            )}
            <p className="text-sm mt-2 italic">{r.explanation}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default async function Resultado({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div>Cargando resultados...</div>}>
      <ResultadoContent id={id} />
    </Suspense>
  );
}
