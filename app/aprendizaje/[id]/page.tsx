import { Suspense } from "react";
import { getDomainById, getLessonsByDomain, getLessonProgress } from "@/lib/actions";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MarkAsCompleteButton from "@/components/MarkAsCompleteButton";

async function DominioDetalleContent({ id }: { id: string }) {
  const domainId = parseInt(id);
  const dominio = await getDomainById(domainId);
  const lecciones = await getLessonsByDomain(domainId);

  if (!dominio) notFound();

  const leccionesConProgreso = await Promise.all(
    lecciones.map(async (leccion) => {
      const progress = await getLessonProgress(leccion.id);
      return { ...leccion, status: progress?.status || 'pending' };
    })
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{dominio.name}</h1>
      {leccionesConProgreso.length === 0 ? (
        <p>No hay lecciones disponibles para este dominio.</p>
      ) : (
        leccionesConProgreso.map((leccion) => (
          <Card key={leccion.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>{leccion.title}</CardTitle>
              <MarkAsCompleteButton lessonId={leccion.id} initialStatus={leccion.status} />
            </CardHeader>
            <CardContent>
              <p>{leccion.content}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

async function DominioDetalleLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DominioDetalleContent id={id} />;
}

export default function DominioDetalle({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div>Cargando contenido...</div>}>
      <DominioDetalleLoader params={params} />
    </Suspense>
  );
}
