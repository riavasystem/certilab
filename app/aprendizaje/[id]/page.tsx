import { Suspense } from "react";
import { getDomainById, getLessonsByDomain } from "@/lib/actions";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DominioDetalle({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div>Cargando contenido...</div>}>
      <DominioDetalleLoader params={params} />
    </Suspense>
  );
}

async function DominioDetalleLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DominioDetalleContent id={id} />;
}

async function DominioDetalleContent({ id }: { id: string }) {
