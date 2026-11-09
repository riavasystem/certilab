import { Suspense } from "react";
import { getExamAttempt } from "@/lib/actions";
import { notFound } from "next/navigation";

async function ExamenActivoContent({ params }: { params: { id: string } }) {
  const attempt = await getExamAttempt(parseInt(params.id));

  if (!attempt) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Examen en curso (Intento #{attempt.id})</h1>
      <p>Modo: {attempt.mode}</p>
      <div className="p-10 border rounded-xl text-center">
        Aquí cargaremos las preguntas de la base de datos dinámicamente.
      </div>
    </div>
  );
}

export default function ExamenActivo({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Cargando examen...</div>}>
      <ExamenActivoContent params={params} />
    </Suspense>
  );
}
