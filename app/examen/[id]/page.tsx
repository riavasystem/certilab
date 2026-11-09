import { Suspense } from "react";
import { getExamAttempt } from "@/lib/actions";
import { notFound } from "next/navigation";

async function ExamenActivoContent({ id }: { id: string }) {
  const attempt = await getExamAttempt(parseInt(id));

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

async function ExamenActivoLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ExamenActivoContent id={id} />;
}

export default function ExamenActivo({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div>Cargando examen...</div>}>
      <ExamenActivoLoader params={params} />
    </Suspense>
  );
}
