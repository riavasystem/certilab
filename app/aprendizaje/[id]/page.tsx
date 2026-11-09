import { getDomainById, getLessonsByDomain } from "@/lib/actions";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DominioDetalle({ params }: { params: { id: string } }) {
  const domainId = parseInt(params.id);
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
