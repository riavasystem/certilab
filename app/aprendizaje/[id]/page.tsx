import { Suspense } from "react";
import { getDomainById, getLessonsByDomain } from "@/lib/actions";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function DominioDetalleContent({ id }: { id: string }) {
  const domainId = parseInt(id);
  const dominio = await getDomainById(domainId);
  const lecciones = await getLessonsByDomain(domainId);

  if (!dominio) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{dominio.name}</h1>
      {lecciones.length === 0 ? (
        <p>No hay lecciones disponibles para este dominio.</p>
      ) : (
        lecciones.map((leccion) => (
          <Card key={leccion.id}>
            <CardHeader>
              <CardTitle>{leccion.title}</CardTitle>
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

export default async function DominioDetalle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div>Cargando contenido...</div>}>
      <DominioDetalleContent id={id} />
    </Suspense>
  );
}
